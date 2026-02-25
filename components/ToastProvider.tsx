"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3200,
        style: {
          background: "#111111",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.14)",
        },
        success: {
          iconTheme: {
            primary: "#8cff2e",
            secondary: "#111111",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#111111",
          },
        },
      }}
    />
  );
}
