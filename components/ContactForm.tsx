"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

/* ─── Validation schema ─── */
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  className?: string;
}

type ContactApiError = {
  error?: string;
  errors?: Record<string, string[]>;
};

function getApiErrorMessage(payload: ContactApiError | null): string {
  if (!payload) return "Something went wrong";
  if (payload.error) return payload.error;

  if (payload.errors) {
    const text = Object.values(payload.errors).flat().join(", ");
    if (text) return text;
  }

  return "Something went wrong";
}

export default function ContactForm({ className }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const loadingId = toast.loading("Sending message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let payload: ContactApiError | null = null;
      try {
        payload = (await res.json()) as ContactApiError;
      } catch {
        payload = null;
      }

      if (!res.ok) {
        throw new Error(getApiErrorMessage(payload));
      }

      toast.success("Message sent successfully!", { id: loadingId });
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong", {
        id: loadingId,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`flex flex-col gap-4.5 ${className ?? ""}`}
    >
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full bg-[#131212] border border-[#1d1d1d] rounded-2xl px-5 py-4 text-white placeholder:text-white/45 outline-none focus:ring-2 focus:ring-btn-primary transition-shadow text-base"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full bg-[#131212] border border-[#1d1d1d] rounded-2xl px-5 py-4 text-white placeholder:text-white/45 outline-none focus:ring-2 focus:ring-btn-primary transition-shadow text-base"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Leave me a message"
          rows={5}
          {...register("message")}
          className="w-full bg-[#131212] border border-[#1d1d1d] rounded-2xl px-5 py-4 text-white placeholder:text-white/45 outline-none focus:ring-2 focus:ring-btn-primary transition-shadow text-base resize-y min-h-36"
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary hover:bg-btn-primary-hover text-black font-semibold py-4 rounded-full transition-colors text-base mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
