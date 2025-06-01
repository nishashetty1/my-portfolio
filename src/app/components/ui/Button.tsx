"use client";

import { ReactNode } from "react";
import { motion } from "@/app/lib/client-utils";
import { cn } from "@/app/lib/utils";
import { LucideIcon } from "lucide-react";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "blue" | "purple" | "rose" | "amber" | "emerald" | "default";

interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  href?: string;
  target?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  variant = "filled",
  color = "default",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  href,
  target,
  onClick,
  disabled = false,
  fullWidth = false,
  ariaLabel,
}: ButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-1 text-xs",
    md: "px-6 py-1.5 text-sm sm:text-base",
    lg: "px-8 py-2 text-base sm:text-lg",
  };

  // Colors for different variants
  const colorClasses = {
    filled: {
      blue: "bg-accent-blue hover:bg-accent-blue/90 text-white hover:shadow-accent-blue/25",
      purple:
        "bg-accent-purple hover:bg-accent-purple/90 text-white hover:shadow-accent-purple/25",
      rose: "bg-accent-rose hover:bg-accent-rose/90 text-white hover:shadow-accent-rose/25",
      amber:
        "bg-accent-amber hover:bg-accent-amber/90 text-white hover:shadow-accent-amber/25",
      emerald:
        "bg-accent-emerald hover:bg-accent-emerald/90 text-white hover:shadow-accent-emerald/25",
      default:
        "bg-background-tertiary hover:bg-background-tertiary/90 text-white",
    },
    outline: {
      blue: "border border-accent-blue text-accent-blue hover:bg-accent-blue/10",
      purple:
        "border border-accent-purple text-accent-purple hover:bg-accent-purple/10",
      rose: "border border-accent-rose text-accent-rose hover:bg-accent-rose/10",
      amber:
        "border border-accent-amber text-accent-amber hover:bg-accent-amber/10",
      emerald:
        "border border-accent-emerald text-accent-emerald hover:bg-accent-emerald/10",
      default:
        "border border-border text-text-secondary hover:bg-background-tertiary hover:text-white",
    },
    ghost: {
      blue: "text-accent-blue hover:bg-accent-blue/10",
      purple: "text-accent-purple hover:bg-accent-purple/10",
      rose: "text-accent-rose hover:bg-accent-rose/10",
      amber: "text-accent-amber hover:bg-accent-amber/10",
      emerald: "text-accent-emerald hover:bg-accent-emerald/10",
      default: "text-text-secondary hover:bg-background-tertiary",
    },
  };

  // Base classes
  const baseClasses = cn(
    "rounded-full flex items-center gap-2 transition-all duration-300 shadow-sm font-medium",
    sizeClasses[size],
    colorClasses[variant][color],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    fullWidth && "w-full justify-center",
    className
  );

  // Handle icon rendering
  const renderContent = () => (
    <>
      {Icon && iconPosition === "left" && (
        <Icon size={size === "lg" ? 20 : 16} />
      )}
      {children && <span>{children}</span>}
      {Icon && iconPosition === "right" && (
        <Icon size={size === "lg" ? 20 : 16} />
      )}
    </>
  );

  // Return button or link based on href prop
  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        whileHover={!disabled ? { scale: 1.02 } : undefined}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
        className={baseClasses}
        onClick={onClick}
        aria-label={
          ariaLabel || (typeof children === "string" ? children : undefined)
        }
      >
        {renderContent()}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={
        ariaLabel || (typeof children === "string" ? children : undefined)
      }
    >
      {renderContent()}
    </motion.button>
  );
}
