import { useId, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------
   Shared pieces of the illustration language.
   One idiom everywhere: gold line work, flat wood and pigment fields,
   all colour read from the theme tokens so dark and gallery-light both
   hold. The classes live in index.css (.a-*).
   ------------------------------------------------------------------ */

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

export type CrownKind = "none" | "flame" | "naga";
export type MouthKind = "fang" | "smile" | "wry";

/** A small carved face, centred on (x, y). Local half-size is 20 × 26. */
export function Face({
  x = 0,
  y = 0,
  s = 1,
  fill = "a-wood",
  crown = "none",
  mouth = "fang",
  lit = false,
}: {
  x?: number;
  y?: number;
  s?: number;
  fill?: string;
  crown?: CrownKind;
  mouth?: MouthKind;
  /** painted eyes — the last stage of the craft */
  lit?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {crown === "flame" &&
        [-18, -9, 0, 9, 18].map((dx, i) => {
          const h = i % 2 ? 36 : 46;
          return <path key={dx} className="a-wood-d" d={`M ${dx - 5} -18 Q ${dx - 3} ${-h + 10} ${dx} ${-h} Q ${dx + 3} ${-h + 10} ${dx + 5} -18 Z`} />;
        })}
      {crown === "naga" &&
        [-26, -13, 0, 13, 26].map((dx, i) => {
          const h = 30 + (2 - Math.abs(i - 2)) * 6;
          return <path key={dx} className="a-leaf" d={`M ${dx - 7} -14 Q ${dx - 9} ${-h} ${dx} ${-h - 6} Q ${dx + 9} ${-h} ${dx + 7} -14 Z`} />;
        })}
      <ellipse className={fill} rx={20} ry={26} />
      <path className="a-line" d="M-15 -9 L-4 -13 M15 -9 L4 -13" />
      <circle className="a-line" cx={-8} cy={-3} r={4.4} />
      <circle className="a-line" cx={8} cy={-3} r={4.4} />
      <circle className={lit ? "a-verm" : "a-gold-f"} cx={-8} cy={-3} r={lit ? 2.2 : 1.4} />
      <circle className={lit ? "a-verm" : "a-gold-f"} cx={8} cy={-3} r={lit ? 2.2 : 1.4} />
      <path className="a-soft" d="M0 2 q3 7 0 12" />
      {mouth === "fang" && (
        <>
          <path className="a-line" d="M-10 15 Q0 20 10 15" />
          <path className="a-soft" d="M-6 16 l2 5 l2 -4 M2 17 l2 4 l2 -5" />
        </>
      )}
      {mouth === "smile" && <path className="a-line" d="M-9 15 Q0 22 9 15" />}
      {mouth === "wry" && <path className="a-line" d="M-8 17 Q0 15 9 13" />}
    </g>
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

/** Lotus rosette: sixteen pointed petals, twelve round ones, a seed disc. */
export function Rosette({ className }: { className?: string }) {
  const outer = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const mid = Array.from({ length: 12 }, (_, i) => i * 30 + 15);
  return (
    <Svg viewBox="-100 -100 200 200" className={className}>
      <g>
        {outer.map((a) => (
          <path key={a} className="a-soft" transform={`rotate(${a})`} d="M0 -34 C 10 -58 8 -78 0 -96 C -8 -78 -10 -58 0 -34 Z" />
        ))}
        {mid.map((a) => (
          <path key={a} className="a-line" transform={`rotate(${a})`} d="M0 -22 C 12 -34 12 -50 0 -58 C -12 -50 -12 -34 0 -22 Z" />
        ))}
        <circle className="a-soft" r="30" />
        <circle className="a-wood" r="16" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} className="a-gold-f" cx={Math.cos((a * Math.PI) / 180) * 8} cy={Math.sin((a * Math.PI) / 180) * 8} r="1.6" />
        ))}
      </g>
    </Svg>
  );
}
