"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  margin = "-80px",
  y = 30,
  duration = 0.7,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  margin?: `${number}px`;
  y?: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
