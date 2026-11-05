import { Face, Svg } from "./parts";

/* ------------------------------------------------------------------
   Objects: the tag on the back of a mask, the certificate, the tools,
   and the empty-state set (crate, shelf, wall, ledger, magnifier).
   ------------------------------------------------------------------ */

/** Deterministic QR-like grid so it never changes between renders. */
function qrCells(seed: number, n = 9) {
  const cells: [number, number][] = [];
  let a = seed;
  const rnd = () => {
    a = (Math.imul(a ^ (a >>> 15), 2246822519) + 0x9e3779b9) | 0;
    return ((a ^ (a >>> 13)) >>> 0) / 4294967296;
  };
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const finder = (x < 3 && y < 3) || (x > n - 4 && y < 3) || (x < 3 && y > n - 4);
      if (!finder && rnd() > 0.5) cells.push([x, y]);
    }
  return cells;
}

/** The reverse of a mask: routed NFC pocket, printed QR, the maker's stamp — and a phone reading it. */
export function TagArt({ className, label }: { className?: string; label?: string }) {
  const cells = qrCells(17);
  return (
    <Svg viewBox="0 0 260 210" className={className} label={label}>
      <rect width="260" height="210" className="a-ground2" />
      {/* the mask's back */}
      <ellipse cx="110" cy="106" rx="68" ry="88" className="a-wood" />
      <ellipse cx="110" cy="106" rx="56" ry="76" className="a-soft" />
      <path className="a-soft" d="M70 70 Q110 54 150 70 M64 110 Q110 124 156 110" />
      {/* the stamp */}
      <circle cx="110" cy="50" r="15" className="a-wood-d" />
      <circle cx="110" cy="50" r="10" className="a-soft" />
      <path className="a-line" d="M110 57 C104 52 104 47 110 41 C116 47 116 52 110 57 Z" />
      {/* NFC pocket */}
      <rect x="86" y="84" width="48" height="36" rx="5" className="a-ground" />
      <rect x="86" y="84" width="48" height="36" rx="5" className="a-soft" />
      <path className="a-line" d="M102 96 q8 6 0 12 M108 92 q14 10 0 20 M114 88 q20 14 0 28" />
      <rect x="98" y="97" width="9" height="9" rx="1.5" className="a-gold-f" opacity=".85" />
      {/* printed QR */}
      <rect x="94" y="130" width="32" height="32" rx="2" className="a-paper" />
      {cells.map(([x, y]) => (
        <rect key={`${x}${y}`} x={97 + x * 2.9} y={133 + y * 2.9} width="2.4" height="2.4" className="a-ink" opacity=".8" />
      ))}
      {[[97, 133], [120, 133], [97, 156]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" className="a-ink" opacity=".9" />
      ))}
      {/* the phone */}
      <g transform="rotate(14 210 130)">
        <rect x="178" y="70" width="64" height="120" rx="10" className="a-wood-d" />
        <rect x="184" y="80" width="52" height="96" rx="4" className="a-ground" />
        <path className="a-line" d="M199 76 h22" />
        <circle cx="210" cy="112" r="14" className="a-soft" />
        <path className="a-line" d="M203 112 l5 5 l9 -10" />
        <rect x="192" y="138" width="36" height="5" rx="2.5" className="a-gold-f" opacity=".6" />
        <rect x="192" y="150" width="26" height="5" rx="2.5" className="a-gold-f" opacity=".35" />
      </g>
      {/* the read */}
      <path className="a-soft" d="M148 100 q10 -8 20 0 M144 96 q16 -14 32 0 M140 92 q22 -20 44 0" transform="rotate(-6 160 96)" />
    </Svg>
  );
}

/** A certificate of provenance: border, title bars, mask crest, seal on a ribbon. */
export function CertificateArt({ className, label }: { className?: string; label?: string }) {
  return (
    <Svg viewBox="0 0 240 160" className={className} label={label}>
      <rect width="240" height="160" className="a-ground2" />
      <rect x="22" y="14" width="196" height="132" rx="6" className="a-paper" />
      <rect x="30" y="22" width="180" height="116" rx="3" className="a-soft" />
      <Face x={60} y={62} s={0.9} crown="flame" mouth="smile" />
      <rect x="92" y="42" width="92" height="7" rx="3.5" className="a-gold-f" opacity=".7" />
      <rect x="92" y="58" width="74" height="4" rx="2" className="a-gold-f" opacity=".35" />
      <rect x="92" y="68" width="84" height="4" rx="2" className="a-gold-f" opacity=".35" />
      <rect x="92" y="78" width="58" height="4" rx="2" className="a-gold-f" opacity=".35" />
      <rect x="44" y="104" width="64" height="3" rx="1.5" className="a-gold-f" opacity=".3" />
      <path className="a-line" d="M46 124 q8 -12 16 0 t16 0 t16 0" />
      <path className="a-verm" d="M170 120 l-8 22 l10 -5 l6 8 l4 -24 z" />
      <circle cx="176" cy="112" r="17" className="a-wood-d" />
      <circle cx="176" cy="112" r="11" className="a-soft" />
      <path className="a-line" d="M170 112 l4 4 l8 -9" />
    </Svg>
  );
}

/* ----------------------------------------------------------------- tools */

export type ToolKind = "adze" | "gouge" | "chisel" | "brush" | "slab" | "lens" | "rasp" | "pot" | "rack" | "book";

export function toolKind(name: string): ToolKind {
  const n = name.toLowerCase();
  if (/adze|keteraya/.test(n)) return "adze";
  if (/gouge/.test(n)) return "gouge";
  if (/chisel|scalpel/.test(n)) return "chisel";
  if (/brush/.test(n)) return "brush";
  if (/slab|muller|grind/.test(n)) return "slab";
  if (/lens/.test(n)) return "lens";
  if (/rasp|abrasive|rubbing|burnish|leaf/.test(n)) return "rasp";
  if (/rack/.test(n)) return "rack";
  if (/book|recipe/.test(n)) return "book";
  return "pot";
}

/** A 48 × 48 drawing of a bench tool, in the same line language as the scenes. */
export function ToolArt({ kind, className }: { kind: ToolKind; className?: string }) {
  return (
    <Svg viewBox="0 0 48 48" className={className}>
      {kind === "adze" && (
        <>
          <path className="a-line" d="M10 40 L34 10" />
          <path className="a-wood-d" d="M30 8 L42 14 L38 22 Q32 20 28 14 Z" />
        </>
      )}
      {kind === "gouge" && (
        <>
          <path className="a-wood" d="M8 34 l4 4 l10 -10 l-4 -4 z" />
          <path className="a-line" d="M20 26 L38 8" />
          <path className="a-line" d="M36 6 q6 0 6 6" />
        </>
      )}
      {kind === "chisel" && (
        <>
          <path className="a-wood" d="M8 36 l4 4 l9 -9 l-4 -4 z" />
          <path className="a-wood-d" d="M19 28 L38 9 L42 13 L23 32 Z" />
        </>
      )}
      {kind === "brush" && (
        <>
          <path className="a-line" d="M8 40 L30 18" />
          <path className="a-wood-d" d="M30 18 l8 -10 l4 4 l-10 8 z" />
          <path className="a-verm" d="M38 8 l4 4 l-3 3 z" />
        </>
      )}
      {kind === "slab" && (
        <>
          <path className="a-wood-d" d="M6 32 L14 22 H42 L36 32 Z" />
          <path className="a-wood" d="M16 20 q0 -8 8 -8 q8 0 8 8 z" />
          <path className="a-soft" d="M10 38 H38" />
        </>
      )}
      {kind === "lens" && (
        <>
          <circle className="a-wood-d" cx="20" cy="20" r="11" />
          <circle className="a-soft" cx="20" cy="20" r="7" />
          <path className="a-line" d="M28 28 L40 40" />
        </>
      )}
      {kind === "rasp" && (
        <>
          <path className="a-wood-d" d="M8 34 L34 8 L40 14 L14 40 Z" />
          <path className="a-soft" d="M14 30 l4 4 M19 25 l4 4 M24 20 l4 4 M29 15 l4 4" />
        </>
      )}
      {kind === "pot" && (
        <>
          <path className="a-wood" d="M10 20 H38 Q38 40 24 40 Q10 40 10 20 Z" />
          <path className="a-verm" d="M12 22 H36 Q35 28 24 28 Q13 28 12 22 Z" opacity=".85" />
          <path className="a-line" d="M30 18 L40 6" />
        </>
      )}
      {kind === "rack" && (
        <>
          <path className="a-line" d="M10 42 V12 M38 42 V12 M10 12 H38 M10 24 H38 M10 36 H38" />
          <path className="a-soft" d="M18 8 q-4 -4 0 -8 M30 8 q-4 -4 0 -8" />
        </>
      )}
      {kind === "book" && (
        <>
          <path className="a-paper" d="M6 14 H23 V40 H6 Z M25 14 H42 V40 H25 Z" />
          <path className="a-soft" d="M10 20 H19 M10 25 H19 M10 30 H19 M29 20 H38 M29 25 H38" />
        </>
      )}
    </Svg>
  );
}

/* ----------------------------------------------------------- empty states */

const Floor = () => <path className="a-ground" d="M0 124 H200 V140 H0 Z" />;

/** Empty crate, lid ajar — the cart. */
export function CrateArt({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 200 140" className={className}>
      <Floor />
      <path className="a-paper" opacity=".0" d="M0 0" />
      <path className="a-ground2" d="M52 56 L148 56 L164 44 L68 44 Z" />
      <path className="a-soft" d="M72 50 h20 M104 50 h26" />
      <Face x={100} y={50} s={0.5} crown="none" fill="a-soft" />
      <path className="a-wood" d="M52 56 H148 V122 H52 Z" />
      <path className="a-soft" d="M52 78 H148 M52 100 H148" />
      <path className="a-wood-d" d="M52 56 L68 44 V110 L52 122 Z" opacity="0" />
      <path className="a-wood-d" d="M148 56 L164 44 V110 L148 122 Z" />
      <path className="a-soft" d="M72 68 v44 M128 68 v44" opacity="0" />
      <path className="a-wood" d="M62 34 L150 14 L158 30 L70 50 Z" />
      <path className="a-soft" d="M72 36 L150 18" />
      <path className="a-wood-d" d="M60 70 l6 4 M60 90 l6 4" />
      <path className="a-verm" d="M92 66 h16 v10 h-16 z" opacity=".85" />
      <path className="a-line" d="M96 71 h8" />
      <path className="a-soft" d="M174 112 q6 -8 0 -16 M184 112 q6 -8 0 -16" />
    </Svg>
  );
}

/** A bare shelf with brackets and one pale outline where a mask hung. */
export function ShelfArt({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 200 140" className={className}>
      <rect width="200" height="140" className="a-ground2" />
      <path className="a-bark" d="M24 98 H176 V108 H24 Z" />
      <path className="a-line" d="M44 108 L44 128 M156 108 L156 128 M44 128 L64 108 M156 128 L136 108" />
      <path className="a-soft" d="M24 48 H176" opacity=".5" />
      <ellipse className="a-soft" cx="100" cy="64" rx="22" ry="28" />
      <path className="a-soft" d="M88 56 l8 -3 M112 56 l-8 -3 M92 78 q8 5 16 0" />
      <path className="a-gold-f" d="M100 28 l-3 5 h6 z" opacity=".7" />
      <path className="a-line" d="M100 20 V28" />
      <circle className="a-gold-f" cx="40" cy="80" r="1.4" opacity=".5" />
      <circle className="a-gold-f" cx="160" cy="72" r="1.2" opacity=".5" />
      <circle className="a-gold-f" cx="150" cy="88" r="1" opacity=".4" />
    </Svg>
  );
}

/** A wall with a hook and a small vermilion heart tag — the wishlist. */
export function WallArt({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 200 140" className={className}>
      <rect width="200" height="140" className="a-ground2" />
      <path className="a-ground" d="M0 112 H200 V140 H0 Z" />
      <path className="a-bark" d="M0 112 H200 V118 H0 Z" />
      <ellipse className="a-soft" cx="100" cy="62" rx="30" ry="38" />
      <path className="a-soft" d="M84 52 l10 -4 M116 52 l-10 -4 M90 76 q10 7 20 0" />
      <circle className="a-gold-f" cx="100" cy="22" r="3" />
      <path className="a-line" d="M100 25 V40" />
      <path className="a-verm" d="M100 62 C 92 54 82 60 88 68 C 92 74 100 78 100 82 C 100 78 108 74 112 68 C 118 60 108 54 100 62 Z" transform="translate(0 -2)" />
      <path className="a-soft" d="M52 96 h14 M134 96 h14" />
    </Svg>
  );
}

/** An open registry ledger with a ribbon and a seal — orders, certificates. */
export function LedgerArt({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 200 140" className={className}>
      <Floor />
      <path className="a-paper" d="M28 40 L100 52 L172 40 V110 L100 122 L28 110 Z" />
      <path className="a-line" d="M100 52 V122" />
      <path className="a-soft" d="M40 56 l48 8 M40 68 l48 8 M40 80 l48 8 M40 92 l36 6 M112 64 l48 -8 M112 76 l48 -8 M112 88 l36 -6" />
      <path className="a-verm" d="M96 52 h8 v30 l-4 -5 l-4 5 z" />
      <circle cx="146" cy="96" r="12" className="a-wood-d" />
      <circle cx="146" cy="96" r="7" className="a-soft" />
      <path className="a-line" d="M142 96 l3 3 l6 -7" />
    </Svg>
  );
}

/** A mask outline under a brass magnifier — nothing found. */
export function MagnifierArt({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 200 140" className={className}>
      <rect width="200" height="140" className="a-ground2" />
      <Face x={86} y={68} s={1.3} fill="a-soft" crown="flame" />
      <circle cx="108" cy="70" r="34" className="a-wood-d" opacity=".35" />
      <circle cx="108" cy="70" r="34" className="a-line" />
      <path className="a-line" d="M134 96 L164 124" />
      <path className="a-wood" d="M160 118 l8 -8 l8 8 l-8 8 z" />
      <path className="a-soft" d="M92 58 q6 -10 18 -10" />
    </Svg>
  );
}

/** Three faces on a gallery wall, each with its plaque — discovering the collection. */
export function GalleryArt({ className, label }: { className?: string; label?: string }) {
  return (
    <Svg viewBox="0 0 240 160" className={className} label={label}>
      <rect width="240" height="160" className="a-ground2" />
      <path className="a-ground" d="M0 132 H240 V160 H0 Z" />
      <rect x="22" y="22" width="56" height="84" rx="3" className="a-soft" />
      <rect x="92" y="14" width="56" height="92" rx="3" className="a-soft" />
      <rect x="162" y="22" width="56" height="84" rx="3" className="a-soft" />
      <Face x={50} y={68} s={0.95} crown="flame" />
      <Face x={120} y={64} s={1} crown="naga" fill="a-forest-face" />
      <Face x={190} y={68} s={0.95} mouth="smile" fill="a-verm-face" />
      <rect x="32" y="114" width="36" height="4" rx="2" className="a-gold-f" opacity=".6" />
      <rect x="102" y="114" width="36" height="4" rx="2" className="a-gold-f" opacity=".6" />
      <rect x="172" y="114" width="36" height="4" rx="2" className="a-gold-f" opacity=".6" />
      <rect x="38" y="122" width="24" height="3" rx="1.5" className="a-gold-f" opacity=".3" />
      <rect x="108" y="122" width="24" height="3" rx="1.5" className="a-gold-f" opacity=".3" />
      <rect x="178" y="122" width="24" height="3" rx="1.5" className="a-gold-f" opacity=".3" />
    </Svg>
  );
}

/** A mask on a living-room wall, seen through a phone at life size — the AR preview. */
export function ArWallArt({ className, label }: { className?: string; label?: string }) {
  return (
    <Svg viewBox="0 0 240 160" className={className} label={label}>
      <rect width="240" height="160" className="a-ground2" />
      <path className="a-ground" d="M0 126 H240 V160 H0 Z" />
      <path className="a-bark" d="M20 108 H120 V126 H20 Z" />
      <path className="a-wood-d" d="M30 98 h14 v10 h-14 z M52 92 h10 v16 h-10 z" />
      <Face x={170} y={58} s={1.1} crown="flame" />
      <g transform="rotate(-8 100 90)">
        <rect x="64" y="38" width="76" height="116" rx="11" className="a-wood-d" />
        <rect x="70" y="48" width="64" height="96" rx="5" className="a-ground" />
        <Face x={102} y={92} s={0.9} crown="flame" />
        <path className="a-soft" d="M76 112 H128" />
        <path className="a-line" d="M88 43 h28" />
      </g>
      <path className="a-soft" d="M150 112 q10 -4 20 -2" />
    </Svg>
  );
}
