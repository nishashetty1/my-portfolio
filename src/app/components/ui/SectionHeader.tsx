"use client";

import { ReactNode } from "react";
import { motion } from "@/app/lib/client-utils";
import { cn } from "@/app/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string | ReactNode;
  gradientFrom?: "blue" | "purple" | "rose" | "amber" | "emerald";
  gradientTo?: "blue" | "purple" | "rose" | "amber" | "emerald";
  className?: string;
  isVisible?: boolean;
}

export default function SectionHeader({
  title,
  description,
  gradientFrom = "blue",
  gradientTo = "purple",
  className,
  isVisible = true,
}: SectionHeaderProps) {
  const getFromGradientClass = () => {
    switch (gradientFrom) {
      case "blue":
        return "from-accent-blue/20";
      case "purple":
        return "from-accent-purple/20";
      case "rose":
        return "from-accent-rose/20";
      case "amber":
        return "from-accent-amber/20";
      case "emerald":
        return "from-accent-emerald/20";
      default:
        return "from-accent-blue/20";
    }
  };

  const getToGradientClass = () => {
    switch (gradientTo) {
      case "blue":
        return "to-accent-blue/20";
      case "purple":
        return "to-accent-purple/20";
      case "rose":
        return "to-accent-rose/20";
      case "amber":
        return "to-accent-amber/20";
      case "emerald":
        return "to-accent-emerald/20";
      default:
        return "to-accent-purple/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn("mb-12 relative", className)}
    >
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {description && (
          <div className="text-text-secondary max-w-2xl">{description}</div>
        )}
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r blur-3xl",
          getFromGradientClass(),
          getToGradientClass()
        )}
      />
    </motion.div>
  );
}
