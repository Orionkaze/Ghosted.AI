"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
  icon?: string;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal/50 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-teal text-bg-primary hover:bg-teal-dim shadow-[0_0_20px_rgba(0,229,192,0.2)] hover:shadow-[0_0_30px_rgba(0,229,192,0.4)]",
    secondary: "bg-transparent border border-teal text-teal hover:bg-teal/10",
    danger: "bg-transparent border border-red text-red hover:bg-red/10",
    icon: "bg-surface border border-border text-text-primary hover:bg-surface/50 hover:text-teal",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {icon && <i className={cn(icon, children ? "ml-2" : "")} />}
    </motion.button>
  );
}
