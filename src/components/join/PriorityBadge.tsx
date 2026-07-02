"use client";

import { motion } from "framer-motion";

/**
 * Priority badge shown on selected department cards and in the preferences list.
 * `priority` is 1-based (1 = most preferred). Colors adopt the department color.
 */
export default function PriorityBadge({
  priority,
  color,
  compact = false,
}: {
  priority: number;
  color: string;
  compact?: boolean;
}) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: compact ? "11px" : "12px",
        lineHeight: 1,
        padding: compact ? "4px 9px" : "5px 11px",
        borderRadius: "999px",
        color,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        whiteSpace: "nowrap",
      }}
    >
      Priority {priority}
    </motion.span>
  );
}
