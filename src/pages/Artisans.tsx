import { BadgeCheck, MapPin, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/mock/api";
import { usePageMeta } from "@/lib/meta";
import type { Artisan } from "@/lib/types";
import { AnimatedTabs } from "@/components/ui/surfaces";
import { Skeleton } from "@/components/ui/kit";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { CoastMap } from "@/components/art";

export function ArtisanAvatar({ artisan, size = "size-14" }: { artisan: Artisan; size?: string }) {
  return (
    <div className={`relative ${size} shrink-0 overflow-hidden rounded-full border border-line`}>
      {artisan.photo ? (
        <img src={artisan.photo} alt={`Portrait of ${artisan.name}`} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="grid h-full w-full place-items-center bg-s3 font-display text-[15px] tracking-wide text-gold">
          {artisan.initials}
        </span>
      )}
    </div>
  );
}

export default function Artisans() {
  usePageMeta("The makers", "Eight carving lineages of Sri Lanka's southern coast — Ambalangoda, Balapitiya, Wathugedara, Meetiyagoda, Elpitiya, Mirissa.");
  const [list, setList] = useState<Artisan[] | null>(null);
  const [region, setRegion] = useState("all");

  useEffect(() => {
    api.listArtisans().then(setList);
  }, []);

  const regions = useMemo(
    () => [{ id: "all", label: "All villages" }, ...(list ? Array.from(new Set(list.map((a) => a.region))).map((r) => ({ id: r, label: r })) : [])],
    [list]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    (list ?? []).forEach((a) => (c[a.region] = (c[a.region] ?? 0) + 1));
    return c;
  }, [list]);

  const shown = useMemo(() => (list ?? []).filter((a) => region === "all" || a.region === region), [list, region]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h1 className="max-w-2xl font-display text-[34px] leading-tight tracking-[-0.01em] text-ink sm:text-[44px]">
            Eight lineages the middlemen used to sign for
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink2">
            Dealers once bought these faces by the basket and sold them as anonymous antiques. Here, every mask carries its maker’s
            name, village and price — and sixty-one percent of that price goes home.
          </p>
          <div className="mt-8">
            <AnimatedTabs id="region" tabs={regions} value={region} onChange={setRegion} className="flex-wrap overflow-visible" />
          </div>
          <p className="mt-3 text-[13px] text-ink3">Choose a village here, or tap its pin on the map.</p>
        </div>
        <div className="mx-auto w-full max-w-xs rounded-lg bg-s2 p-4 sm:max-w-sm lg:col-span-5 lg:max-w-none">
          <CoastMap active={region === "all" ? undefined : region} counts={counts} onSelect={setRegion} />
        </div>
      </div>

      {!list ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((a) => (
            <StaggerItem key={a.slug}>
              <Link
                to={`/artisans/${a.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line bg-s2 p-5 transition-colors duration-180 hover:border-gold/30 hover:bg-s3"
              >
                <div className="flex items-start justify-between">
                  <ArtisanAvatar artisan={a} size="size-16" />
                  {a.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gold">
                      <BadgeCheck className="size-3.5" aria-hidden="true" />
                      Verified
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-lg leading-snug text-ink group-hover:text-gold-strong">{a.name}</h2>
                <p className="mt-0.5 font-sinhala text-sm text-ink3">{a.sinhalaName}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-ink2">{a.role}</p>
                <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-ink3">
                  <MapPin className="size-3.5 text-ink3" aria-hidden="true" />
                  {a.village}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-ink3">
                  <span className="flex items-center gap-1">
                    <Star className="size-3 fill-gold text-gold" aria-hidden="true" />
                    <span className="font-mono text-ink2 tnum">{a.rating}</span>
                  </span>
                  <span className="font-mono tnum">{a.ordersFulfilled} pieces</span>
                  <span className="font-mono tnum">since {a.since}</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
