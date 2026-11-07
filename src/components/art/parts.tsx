import { useId, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* Shared SVG pieces for the ornament band and the coast map (.a-* styles in index.css). */

export function Svg({
  viewBox,
  className,
  label,
  children,
}: {
  viewBox: string;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={cn("block h-auto w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** A repeating flame-and-lotus ornament band; replaces the CSS divider where a section deserves it. */
export function FlameBand({ className, tall = false }: { className?: string; tall?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={cn("block w-full", tall ? "h-8" : "h-5", className)} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width="64" height="32" patternUnits="userSpaceOnUse">
          <path className="a-soft" d="M32 28 C 24 22 24 14 32 4 C 40 14 40 22 32 28 Z" />
          <path className="a-soft" d="M32 28 C 18 26 14 18 18 10 C 22 18 26 22 32 28 Z M32 28 C 46 26 50 18 46 10 C 42 18 38 22 32 28 Z" />
          <circle className="a-gold-f" cx="0" cy="16" r="1.4" opacity=".5" />
          <circle className="a-gold-f" cx="64" cy="16" r="1.4" opacity=".5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
