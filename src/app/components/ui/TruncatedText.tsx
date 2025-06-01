"use client";

import { useState } from "react";
import { cn } from "@/app/lib/utils";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
  textClassName?: string;
  actionClassName?: string;
  showMoreText?: string;
  showLessText?: string;
}

export default function TruncatedText({
  text,
  maxLength,
  textClassName,
  actionClassName,
  showMoreText = "Read more",
  showLessText = "Show less",
}: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className={textClassName}>{text}</p>;
  }

  return (
    <div>
      <p className={textClassName}>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "text-xs font-medium mt-1 hover:underline text-text-secondary hover:text-white transition-colors",
          actionClassName
        )}
      >
        {isExpanded ? showLessText : showMoreText}
      </button>
    </div>
  );
}
