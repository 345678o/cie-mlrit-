"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types/apply";
import { inputStyle, Label, FieldErr } from "@/components/join/form-primitives";

export default function DynamicQuestionField({
  question,
  value,
  onChange,
  error,
  color,
  focused,
  onFocus,
  onBlur,
}: {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  error?: string;
  color: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const stringValue = Array.isArray(value) ? "" : value ?? "";
  const arrayValue = Array.isArray(value) ? value : [];

  return (
    <div>
      <Label required={question.required}>{question.label}</Label>

      {question.code && (
        <div style={{
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "16px",
          border: "1px solid #262626",
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        }}>
          {/* Header bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 14px",
            background: "#161616",
            borderBottom: "1px solid #262626",
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
            </div>
            <span style={{
              fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "11px",
              letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#8B8B8B",
            }}>
              {question.codeLang ?? "python"}
            </span>
          </div>
          {/* Code body */}
          <pre style={{
            fontFamily: "var(--font-mono, ui-monospace, 'SF Mono', Menlo, monospace)",
            fontSize: "13.5px",
            lineHeight: 1.7,
            background: "#0A0A0A",
            color: "#E5E7EB",
            padding: "16px 18px",
            margin: 0,
            overflowX: "auto" as const,
            whiteSpace: "pre" as const,
          }}>
            {question.code}
          </pre>
        </div>
      )}

      {question.type === "text" && (
        <input
          type="text"
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          required={question.required}
          style={inputStyle(focused, color)}
        />
      )}

      {question.type === "textarea" && (
        <>
          <textarea
            value={stringValue}
            rows={6}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required={question.required}
            minLength={question.minLength}
            style={{ ...inputStyle(focused, color), height: "auto", minHeight: "160px", padding: "16px 18px", lineHeight: "1.65", resize: "vertical" as const }}
          />
          {question.minLength ? (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, color: stringValue.trim().length >= question.minLength ? color : "#9CA3AF" }}>
                {stringValue.trim().length} / {question.minLength}+
              </span>
            </div>
          ) : null}
        </>
      )}

      {question.type === "select" && (
        <select
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          required={question.required}
          style={{ ...inputStyle(focused, color), appearance: "auto" as React.CSSProperties["appearance"] }}
        >
          <option value="">Select…</option>
          {question.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {question.type === "radio" && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {question.options.map((opt) => (
            <motion.button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px",
                padding: "0 20px", height: "48px", borderRadius: "13px", cursor: "pointer",
                border: stringValue === opt ? `1.5px solid ${color}` : "1px solid #E5E7EB",
                background: stringValue === opt ? `${color}10` : "#FFFFFF",
                color: stringValue === opt ? color : "#374151",
                boxShadow: stringValue === opt ? `0 0 0 3px ${color}15` : "none",
              }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      )}

      {question.type === "checkbox" && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {question.options.map((opt) => {
            const checked = arrayValue.includes(opt);
            return (
              <motion.button
                key={opt}
                type="button"
                onClick={() => onChange(checked ? arrayValue.filter((o) => o !== opt) : [...arrayValue, opt])}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px",
                  padding: "0 20px", height: "48px", borderRadius: "13px", cursor: "pointer",
                  border: checked ? `1.5px solid ${color}` : "1px solid #E5E7EB",
                  background: checked ? `${color}10` : "#FFFFFF",
                  color: checked ? color : "#374151",
                  boxShadow: checked ? `0 0 0 3px ${color}15` : "none",
                }}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
      )}

      {error && <FieldErr msg={error} />}
    </div>
  );
}
