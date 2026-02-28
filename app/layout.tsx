import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ToastProvider from "@/components/providers/ToastProvider";

const manrope = localFont({
  src: "../public/fonts/Manrope/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Pham Tan Tai Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <SmoothScrollProvider>
          {children}
          <ToastProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
