"use client";

import { ReactNode } from "react";
import { motion } from "@/app/lib/client-utils";
import { cn } from "@/app/lib/utils";

type CardColor = "blue" | "purple" | "rose" | "amber" | "emerald" | "default";

interface CardProps {
  children: ReactNode;
  color?: CardColor;
  className?: string;
  interactive?: boolean;
  gradient?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  height?: string;
}

export default function Card({
  children,
  color = "default",
  className,
  interactive = true,
  gradient = false,
  padding = "md",
  height,
}: CardProps) {
  // Padding classes
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  // Border hover colors
  const borderHoverClasses = {
    blue: "hover:border-accent-blue",
    purple: "hover:border-accent-purple",
    rose: "hover:border-accent-rose",
    amber: "hover:border-accent-amber",
    emerald: "hover:border-accent-emerald",
    default: "hover:border-border",
  };

  // Gradient background for decorative effect
  const gradientClasses = {
    blue: "bg-accent-blue/20",
    purple: "bg-accent-purple/20",
    rose: "bg-accent-rose/20",
    amber: "bg-accent-amber/20",
    emerald: "bg-accent-emerald/20",
    default: "bg-background-tertiary/20",
  };

  // Base classes
  const baseClasses = cn(
    "rounded-xl bg-background-secondary border border-border transition-all duration-300 relative",
    paddingClasses[padding],
    interactive && borderHoverClasses[color],
    height && height,
    className
  );

  // Interactive card with animations
  if (interactive) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} className={baseClasses}>
        {children}

        {/* Optional gradient background decoration */}
        {gradient && (
          <div
            className={cn(
              "absolute -z-10 inset-0 blur-3xl opacity-10 rounded-full transition-opacity duration-300 group-hover:opacity-20",
              gradientClasses[color]
            )}
          />
        )}
      </motion.div>
    );
  }

  // Static card
  return (
    <div className={baseClasses}>
      {children}

      {/* Optional gradient background decoration */}
      {gradient && (
        <div
          className={cn(
            "absolute -z-10 inset-0 blur-3xl opacity-10 rounded-full",
            gradientClasses[color]
          )}
        />
      )}
    </div>
  );
}
