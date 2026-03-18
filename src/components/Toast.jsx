import { useState, useEffect } from "react";

export function useToast() {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message) => {
    setToast({ message, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(
        () => setToast((t) => ({ ...t, visible: false })),
        2500
      );
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  return { toast, showToast };
}

export default function Toast({ message, visible }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: "#1a1a1a",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        zIndex: 999,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.3s ease",
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}