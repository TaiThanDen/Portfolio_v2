import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { sendContactEmail } from "@/lib/mail";

/* ─── Validation schema ─── */
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/* ─── POST /api/contact ─── */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    /* Validate */
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, message } = parsed.data;

    /* Insert into DB */
    const result = await query<{ id: string; created_at: string }>(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING id, created_at`,
      [name, email, message],
    );

    const row = result.rows[0];

    /* Send notification email (fire-and-forget, never blocks success) */
    sendContactEmail({
      name,
      email,
      message,
      createdAt: row.created_at,
    }).catch((err) => {
      console.error("[api/contact] Email sending failed:", err);
    });

    return NextResponse.json(
      { success: true, id: row.id },
      { status: 201 },
    );
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
