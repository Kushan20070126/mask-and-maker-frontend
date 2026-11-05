import { Face, Svg } from "./parts";

/* ------------------------------------------------------------------
   The eight stations of the craft, one vignette each (240 × 160).
   Stage 1 is the tree, stage 8 is the eyes opened — the same order
   the Folklore Hub and every certificate timeline follow.
   ------------------------------------------------------------------ */

const Ground = () => <path className="a-ground" d="M0 138 H240 V160 H0 Z" />;

function Tree() {
  return (
    <>
      <circle className="a-gold-f" cx="196" cy="34" r="11" opacity=".55" />
      <Ground />
      <path className="a-soft" d="M20 138 q10 -8 20 0 M184 138 q10 -8 20 0 M60 146 q8 -5 16 0" />
      <path className="a-bark" d="M106 138 C111 112 109 84 111 56 L129 56 C131 84 129 112 134 138 Z" />
      <path className="a-soft" d="M116 130 C118 108 117 90 118 66 M124 130 C123 108 125 92 124 70" />
      <path className="a-bark" d="M111 78 C96 70 90 62 84 52 M129 74 C144 66 152 60 158 48" />
      <circle className="a-leaf" cx="120" cy="38" r="27" />
      <circle className="a-leaf" cx="92" cy="50" r="20" />
      <circle className="a-leaf" cx="150" cy="50" r="20" />
      <circle className="a-leaf" cx="120" cy="60" r="16" />
      <path className="a-verm" d="M115 98 h10 v16 h-10 z" />
      <path className="a-line" d="M112 106 h16" />
    </>
  );
}

function Resting() {
  const ring = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      <circle className="a-wood" cx={cx} cy={cy} r="17" />
      <circle className="a-soft" cx={cx} cy={cy} r="11" />
      <circle className="a-soft" cx={cx} cy={cy} r="5" />
    </g>
  );
  return (
    <>
      <path className="a-ground2" d="M0 0 H240 V138 H0 Z" />
      <path className="a-bark" d="M30 64 L120 22 L210 64 Z" />
      <path className="a-soft" d="M50 60 L120 30 L190 60 M70 62 L120 38 L170 62" />
      <path className="a-line" d="M52 64 V132 M188 64 V132" />
      <Ground />
      <path className="a-bark" d="M62 122 H178 V128 H62 Z" />
      {ring(88, 104)}
      {ring(122, 104)}
      {ring(156, 104)}
      {ring(105, 80)}
      {ring(139, 80)}
      <path className="a-soft" d="M196 116 q6 -8 0 -16 q-6 -8 0 -16" />
      <path className="a-soft" d="M206 116 q6 -8 0 -16 q-6 -8 0 -16" />
    </>
  );
}

function Blocking() {
  return (
    <>
      <Ground />
      <path className="a-bark" d="M46 120 H194 V132 H46 Z" />
      <path className="a-wood" d="M82 118 C76 90 80 56 96 40 Q120 28 144 40 C160 56 164 90 158 118 Z" />
      <path className="a-soft" d="M96 52 Q120 44 144 52 M92 70 Q120 62 148 70 M96 92 Q120 100 144 92" />
      <ellipse className="a-soft" cx="120" cy="80" rx="20" ry="26" />
      {/* the adze */}
      <path className="a-line" d="M176 112 L206 46" />
      <path className="a-wood-d" d="M196 52 L216 62 L208 76 Q196 70 190 58 Z" />
      {/* chips */}
      <path className="a-wood-d" d="M64 128 l8 -4 l3 6 z M168 130 l7 -3 l2 6 z M52 118 l6 -5 l3 6 z" />
      <path className="a-soft" d="M70 62 l-8 -6 M64 78 l-10 -2" />
    </>
  );
}

function Carving() {
  return (
    <>
      <Ground />
      <path className="a-bark" d="M40 120 H200 V134 H40 Z" />
      <path className="a-line" d="M54 134 V150 M186 134 V150" />
      <Face x={118} y={80} s={1.35} crown="flame" />
      {/* mallet and gouge */}
      <path className="a-line" d="M176 100 L148 82" />
      <path className="a-wood-d" d="M146 80 l8 4 l-3 8 l-9 -4 z" />
      <path className="a-line" d="M60 108 L86 76" />
      <path className="a-wood" d="M44 118 l-6 -8 l14 -12 l8 10 z" />
      <path className="a-wood-d" d="M170 108 l16 -10 l8 12 l-16 10 z" />
      <path className="a-soft" d="M182 100 l22 -22" />
      <path className="a-wood-d" d="M92 130 l6 -4 l2 6 z M140 132 l7 -3 l1 6 z" />
    </>
  );
}

function Smoke() {
  return (
    <>
      <Ground />
      <path className="a-line" d="M52 138 V64 M188 138 V64 M52 64 H188" />
      <path className="a-line" d="M52 84 H188" />
      <Face x={92} y={52} s={0.7} />
      <Face x={148} y={52} s={0.7} crown="naga" mouth="wry" />
      <path className="a-bark" d="M98 138 q-10 -4 -8 -14 h60 q2 10 -8 14 z" />
      <path className="a-verm" d="M112 124 q-6 -8 2 -16 q2 6 6 8 q4 -6 2 -12 q10 8 6 20 z" opacity=".85" />
      <path className="a-soft" d="M104 100 q-12 -10 0 -20 q12 -10 0 -22 M128 100 q-12 -10 0 -20 q12 -10 0 -20 M152 100 q-12 -10 0 -20 q12 -10 0 -22" />
    </>
  );
}

function Priming() {
  return (
    <>
      <Ground />
      <Face x={92} y={74} s={1.45} fill="a-paper" crown="none" />
      <path className="a-wood-d" d="M92 48 Q112 54 112 74 Q112 96 92 100 Q72 96 72 74 Q72 54 92 48 Z" opacity=".5" />
      {/* the bowl of resin */}
      <path className="a-wood" d="M148 108 H208 Q206 134 178 136 Q150 134 148 108 Z" />
      <path className="a-verm" d="M150 110 H206 Q204 118 178 120 Q152 118 150 110 Z" opacity=".75" />
      <path className="a-line" d="M180 96 L200 62" />
      <path className="a-wood-d" d="M176 98 l8 -4 l4 10 l-10 4 z" />
      <path className="a-verm" d="M178 108 q-2 8 0 12" opacity=".8" />
    </>
  );
}

function Painting() {
  return (
    <>
      <Ground />
      <Face x={100} y={78} s={1.55} fill="a-verm-face" crown="naga" />
      {/* pigment bowls */}
      <g>
        <path className="a-wood" d="M156 126 q0 12 14 12 q14 0 14 -12 z" />
        <path className="a-verm" d="M158 126 h24 q-2 4 -12 4 q-10 0 -12 -4 z" />
        <path className="a-wood" d="M188 126 q0 12 14 12 q14 0 14 -12 z" />
        <path className="a-forest" d="M190 126 h24 q-2 4 -12 4 q-10 0 -12 -4 z" />
        <path className="a-wood" d="M172 108 q0 10 12 10 q12 0 12 -10 z" />
        <path className="a-gold-f" d="M174 108 h20 q-2 4 -10 4 q-8 0 -10 -4 z" />
      </g>
      <path className="a-line" d="M150 64 L128 98" />
      <path className="a-wood-d" d="M122 98 l6 -2 l4 8 l-8 4 z" />
      <path className="a-verm" d="M120 102 l4 8 l-6 -2 z" />
    </>
  );
}

function Waking() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <>
      <Ground />
      <g transform="translate(120 74)">
        {rays.map((a) => (
          <path key={a} className="a-soft" transform={`rotate(${a})`} d="M0 -50 V -62" />
        ))}
      </g>
      <Face x={120} y={74} s={1.5} fill="a-verm-face" crown="flame" lit />
      <path className="a-wood" d="M184 130 q4 -10 18 -10 q8 0 6 10 z" />
      <path className="a-verm" d="M194 118 q-6 -10 2 -20 q2 6 6 8 q4 -6 2 -12 q12 10 4 24 z" />
      <path className="a-soft" d="M200 92 q8 -8 0 -16" />
    </>
  );
}

const scenes = [Tree, Resting, Blocking, Carving, Smoke, Priming, Painting, Waking];

/** `stage` is zero-based: 0 = choosing the tree … 7 = waking the mask. */
export function CraftStageArt({ stage, className, label }: { stage: number; className?: string; label?: string }) {
  const Scene = scenes[Math.max(0, Math.min(scenes.length - 1, stage))];
  return (
    <Svg viewBox="0 0 240 160" className={className} label={label}>
      <rect width="240" height="160" className="a-ground2" />
      <Scene />
    </Svg>
  );
}
