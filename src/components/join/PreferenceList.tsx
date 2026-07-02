"use client";

import { Reorder, AnimatePresence, motion, useDragControls } from "framer-motion";
import { GripVertical, ChevronUp, ChevronDown, X } from "lucide-react";
import PriorityBadge from "./PriorityBadge";

export type PrefItem = {
  key: string;
  name: string;
  color: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
};

/**
 * "Your Preferences" section. Selected departments are shown in priority order.
 * Reorder via drag-and-drop (framer-motion Reorder) with Up/Down button fallback.
 * Priority badges are derived from list order and update automatically on reorder.
 */
export default function PreferenceList({
  items,
  order,
  onReorder,
  onMove,
  onRemove,
}: {
  items: Record<string, PrefItem>;
  order: string[];
  onReorder: (next: string[]) => void;
  onMove: (key: string, dir: -1 | 1) => void;
  onRemove: (key: string) => void;
}) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 900,
            fontSize: "clamp(20px,3vw,26px)", color: "#FFFFFF",
            letterSpacing: "-0.03em", margin: 0,
          }}
        >
          Your Preferences
        </h2>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
          {order.length}/3 · drag to reorder
        </span>
      </div>

      <Reorder.Group
        axis="y"
        values={order}
        onReorder={onReorder}
        style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}
      >
        <AnimatePresence initial={false}>
          {order.map((key, i) => {
            const dept = items[key];
            if (!dept) return null;
            return (
              <PreferenceRow
                key={key}
                dept={dept}
                priority={i + 1}
                isFirst={i === 0}
                isLast={i === order.length - 1}
                onMove={onMove}
                onRemove={onRemove}
              />
            );
          })}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}

function PreferenceRow({
  dept,
  priority,
  isFirst,
  isLast,
  onMove,
  onRemove,
}: {
  dept: PrefItem;
  priority: number;
  isFirst: boolean;
  isLast: boolean;
  onMove: (key: string, dir: -1 | 1) => void;
  onRemove: (key: string) => void;
}) {
  const controls = useDragControls();
  const Icon = dept.icon;

  return (
    <Reorder.Item
      value={dept.key}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      whileDrag={{ scale: 1.02, boxShadow: "0 12px 32px rgba(0,0,0,0.22)" }}
      style={{
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#FFFFFF",
        borderRadius: "14px",
        border: `1.5px solid ${dept.color}`,
        boxShadow: `0 0 0 4px ${dept.color}18`,
        padding: "12px 14px",
      }}
    >
      {/* Drag handle */}
      <span
        onPointerDown={(e) => controls.start(e)}
        aria-label="Drag to reorder"
        style={{ cursor: "grab", color: "#9CA3AF", display: "flex", touchAction: "none", flexShrink: 0 }}
      >
        <GripVertical size={18} />
      </span>

      {/* Icon */}
      <span
        style={{
          width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
          background: `${dept.color}20`, border: `1px solid ${dept.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Icon size={17} color={dept.color} />
      </span>

      {/* Name */}
      <span
        style={{
          flex: 1, minWidth: 0,
          fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "15px",
          color: "#111111", letterSpacing: "-0.02em",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}
      >
        {dept.name}
      </span>

      <PriorityBadge priority={priority} color={dept.color} compact />

      {/* Up / Down fallback controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0 }}>
        <IconBtn label="Move up" disabled={isFirst} onClick={() => onMove(dept.key, -1)}>
          <ChevronUp size={14} />
        </IconBtn>
        <IconBtn label="Move down" disabled={isLast} onClick={() => onMove(dept.key, 1)}>
          <ChevronDown size={14} />
        </IconBtn>
      </div>

      {/* Remove */}
      <IconBtn label="Remove" onClick={() => onRemove(dept.key)}>
        <X size={15} />
      </IconBtn>
    </Reorder.Item>
  );
}

function IconBtn({
  children,
  label,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? {} : { scale: 0.88 }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "26px", height: "26px", borderRadius: "8px",
        border: "1px solid #E5E7EB", background: "#F9FAFB",
        color: disabled ? "#D1D5DB" : "#6B7280",
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0, padding: 0,
      }}
    >
      {children}
    </motion.button>
  );
}
