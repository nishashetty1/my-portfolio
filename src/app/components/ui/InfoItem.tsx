import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface InfoItemProps {
  icon: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  className?: string;
}

export default function InfoItem({
  icon: Icon,
  iconColor = "text-text-secondary",
  children,
  className,
}: InfoItemProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <Icon size={16} className={cn("mt-1 flex-shrink-0", iconColor)} />
      <div>{children}</div>
    </div>
  );
}
