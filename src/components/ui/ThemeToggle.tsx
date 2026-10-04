"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export type Theme = "dark" | "light";

export const THEME_KEY = "cie-theme";

/* Runs in <head> before paint so the saved theme never flashes. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

const readTheme = (): Theme =>
  typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

export default function ThemeToggle({ size = 38 }: { size?: number }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      style={{
        width: size, height: size, flexShrink: 0,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "999px",
        background: "rgba(var(--primary-rgb), 0.12)",
        border: "1px solid rgba(var(--primary-rgb), 0.28)",
        color: "var(--orange)",
        cursor: "pointer",
        transition: "background 0.2s ease, transform 0.2s ease",
      }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
