import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "neutral" | "redFlag" | "success" | "warning";
  icon?: string;
}

export function Badge({
  className,
  variant = "neutral",
  icon,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    neutral: "bg-surface text-text-secondary border border-border",
    redFlag: "bg-red/10 text-red border border-red/20 shadow-[0_0_15px_rgba(255,69,96,0.15)]",
    success: "bg-green/10 text-green border border-green/20",
    warning: "bg-yellow/10 text-yellow border border-yellow/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon && <i className={cn(icon, "mr-1.5")} />}
      {children}
    </div>
  );
}
