"use client";

import { ReactNode } from "react";
import { motion } from "@/app/lib/client-utils";
import { cn } from "@/app/lib/utils";
import { LucideIcon } from "lucide-react";

type BadgeColor = "blue" | "purple" | "rose" | "amber" | "emerald" | "default";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: LucideIcon;
  className?: string;
  interactive?: boolean;
}

export default function Badge({
  children,
  color = "default",
  size = "md",
  icon: Icon,
  className,
  interactive = false,
}: BadgeProps) {

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const colorClasses = {
    blue: "bg-accent-blue/10 text-accent-blue",
    purple: "bg-accent-purple/10 text-accent-purple",
    rose: "bg-accent-rose/10 text-accent-rose",
    amber: "bg-accent-amber/10 text-accent-amber",
    emerald: "bg-accent-emerald/10 text-accent-emerald",
    default: "bg-background-tertiary/50 text-text-secondary",
  };

  const baseClasses = cn(
    "rounded-full inline-flex items-center gap-1.5",
    sizeClasses[size],
    colorClasses[color],
    className
  );

  const content = (
    <>
      {Icon && <Icon size={size === "sm" ? 12 : size === "md" ? 16 : 20} />}
      {children}
    </>
  );

  if (interactive) {
    return (
      <motion.span
        className={baseClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.span>
    );
  }

  return <span className={baseClasses}>{content}</span>;
}
