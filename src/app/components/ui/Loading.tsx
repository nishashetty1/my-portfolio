import { cn } from "@/app/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export default function Skeleton({
  className,
  width = "100%",
  height = "1rem",
  rounded = "md",
}: SkeletonProps) {
  const roundedClass = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-background-tertiary/50",
        roundedClass[rounded],
        className
      )}
      style={{ width, height }}
    />
  );
}
