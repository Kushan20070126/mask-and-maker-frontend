import { Svg } from "./parts";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------
   The southern coast with the carving villages pinned on it. A working
   control on the Artisans page: tapping a pin filters the makers.
   ------------------------------------------------------------------ */

export const coastVillages = [
  { region: "Balapitiya", x: 98, y: 214, label: "Balapitiya", side: "right" as const },
  { region: "Ambalangoda", x: 106, y: 248, label: "Ambalangoda", side: "right" as const },
  { region: "Wathugedara", x: 150, y: 232, label: "Wathugedara", side: "right" as const },
  { region: "Meetiyagoda", x: 160, y: 274, label: "Meetiyagoda", side: "right" as const },
  { region: "Elpitiya", x: 204, y: 196, label: "Elpitiya", side: "right" as const },
  { region: "Mirissa", x: 252, y: 324, label: "Mirissa", side: "below" as const },
];

/**
 * A schematic of the south-west coast: Colombo at the top, the sea to the west
 * and south. Pins are real controls when `onSelect` is given.
 */
export function CoastMap({
  active,
  counts,
  onSelect,
  className,
}: {
  active?: string;
  counts?: Record<string, number>;
  onSelect?: (region: string) => void;
  className?: string;
}) {
  return (
    <Svg viewBox="0 0 330 380" className={className} label="Map of the south-west coast of Sri Lanka showing the carving villages">
      <path
        className="a-ground"
        d="M150 10 C136 40 118 60 112 96 C108 126 100 150 96 180 C92 204 90 222 98 240 C106 258 118 266 134 288 C150 306 176 312 206 318 C234 322 262 322 290 330 L330 336 V10 Z"
      />
      <path
        className="a-line"
        d="M150 10 C136 40 118 60 112 96 C108 126 100 150 96 180 C92 204 90 222 98 240 C106 258 118 266 134 288 C150 306 176 312 206 318 C234 322 262 322 290 330 L322 337"
      />
      {/* inland relief */}
      <path className="a-soft" d="M200 40 C190 90 210 130 196 180 C190 204 204 240 200 276" />
      <path className="a-soft" d="M236 30 C226 90 246 140 232 196 C226 230 240 262 236 300" />
      <path className="a-soft" d="M272 30 C262 90 282 150 268 210 C262 250 278 280 274 312" />
      {/* swell lines out at sea */}
      <path className="a-soft" d="M40 60 q10 -6 20 0 t20 0 M20 150 q10 -6 20 0 t20 0 M34 236 q10 -6 20 0 t20 0 M90 330 q10 -6 20 0 t20 0 M170 352 q10 -6 20 0 t20 0 M250 360 q10 -6 20 0 t20 0" />
      {/* orientation */}
      <circle className="a-gold-f" cx="150" cy="10" r="3" opacity=".5" />
      <text x="162" y="16" className="a-text" fontSize="11" opacity=".6">Colombo</text>
      <circle className="a-gold-f" cx="152" cy="294" r="3" opacity=".5" />
      <text x="162" y="298" className="a-text" fontSize="11" opacity=".6">Galle</text>

      {coastVillages.map((v) => {
        const on = active === v.region;
        const n = counts?.[v.region];
        const interactive = Boolean(onSelect);
        return (
          <g
            key={v.region}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-pressed={interactive ? on : undefined}
            aria-label={interactive ? `${v.label}${n ? `, ${n} ${n === 1 ? "maker" : "makers"}` : ""}` : undefined}
            onClick={interactive ? () => onSelect!(on ? "all" : v.region) : undefined}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect!(on ? "all" : v.region);
                    }
                  }
                : undefined
            }
            className={cn(interactive && "cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-[var(--gold)]")}
          >
            <circle cx={v.x} cy={v.y} r="16" fill="transparent" stroke="transparent" />
            <circle cx={v.x} cy={v.y} r={on ? 11 : 8} className={on ? "a-soft" : "a-soft"} />
            <circle cx={v.x} cy={v.y} r="4.5" className={on ? "a-verm" : "a-gold-f"} />
            <text
              x={v.side === "right" ? v.x + 14 : v.x}
              y={v.side === "right" ? v.y + 4 : v.y + 24}
              textAnchor={v.side === "right" ? "start" : "middle"}
              fontSize="12"
              className={on ? "a-ink" : "a-text"}
              fontWeight={on ? 600 : 400}
            >
              {v.label}
              {n ? <tspan className="a-text" opacity=".6">{`  ${n}`}</tspan> : null}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}
