"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0a0b0d",
          color: "#f5f5f5",
          border: "1px solid #2a2a2a",
          borderRadius: "14px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
        },
        success: {
          iconTheme: {
            primary: "#8cff2e",
            secondary: "#0a0b0d",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff5f5f",
            secondary: "#0a0b0d",
          },
        },
      }}
    />
  );
}
