"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "metric" | "insight";
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = "default",
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl overflow-hidden relative";

  const variants = {
    default: "bg-bg-secondary border border-border",
    glass: "bg-surface backdrop-blur-md border border-border shadow-lg",
    metric: "bg-surface backdrop-blur-md border border-border/50 flex flex-col p-6",
    insight: "bg-gradient-to-br from-bg-elevated/80 to-bg-secondary/80 backdrop-blur-xl border border-teal/20 shadow-[0_4px_30px_rgba(0,229,192,0.05)]",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, boxShadow: "0 8px 40px rgba(0,229,192,0.15)" } : {}}
      transition={{ duration: 0.2 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none" />
      {children}
    </motion.div>
  );
}
