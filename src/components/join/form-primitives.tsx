"use client";

import { motion } from "framer-motion";

export function inputStyle(focused: boolean, color: string): React.CSSProperties {
  return {
    width: "100%",
    boxSizing: "border-box" as const,
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    padding: "0 18px",
    height: "56px",
    borderRadius: "13px",
    border: focused ? `1.5px solid ${color}` : "1px solid #E5E7EB",
    outline: "none",
    background: "#FFFFFF",
    color: "#111111",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    boxShadow: focused ? `0 0 0 3px ${color}18` : "none",
  };
}

export function Label({ children, required = true }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ display: "block", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", color: "#374151", marginBottom: "8px" }}>
      {children}
      {required && <span aria-hidden style={{ color: "#EF4444", marginLeft: "3px" }}>*</span>}
    </label>
  );
}

export function FieldErr({ msg }: { msg: string }) {
  return (
    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#EF4444", marginTop: "6px", fontWeight: 500 }}>
      {msg}
    </motion.p>
  );
}
