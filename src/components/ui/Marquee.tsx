import { cn } from "@/utils/cn";

/**
 * A slow, endless ticker. The list is repeated twice and the track slides by
 * half its width, so the loop never shows a seam. Pauses on hover and focus,
 * and stands still for visitors who prefer reduced motion.
 */
export function Marquee({
  items,
  seconds = 55,
  className,
  label,
}: {
  items: string[];
  seconds?: number;
  className?: string;
  /** what the ticker says, for screen readers (the repeated copy is hidden from them) */
  label: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center">
          <span className="px-8 font-display text-[26px] leading-none font-light whitespace-nowrap text-ink2 sm:text-[32px]">{t}</span>
          <span className="size-2 rotate-45 bg-gold" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("group/marquee overflow-hidden", className)} role="group" aria-label={label}>
      <div
        className="marquee-track flex w-max items-center group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-seconds" as string]: `${seconds}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
