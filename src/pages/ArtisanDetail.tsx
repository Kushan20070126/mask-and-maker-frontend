import { ArrowLeft, BadgeCheck, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "@/lib/mock/api";
import { usePageMeta } from "@/lib/meta";
import type { Artisan, Mask } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { useApp } from "@/store/app";
import { cn } from "@/utils/cn";
import { MaskCard } from "@/components/MaskCard";
import { ArtisanAvatar } from "@/pages/Artisans";
import { Button, EmptyState, Skeleton } from "@/components/ui/kit";
import { ImageFrame } from "@/components/ui/MaskImage";
import { BenchScene, FlameBand, MagnifierArt, ToolArt, toolKind } from "@/components/art";

const patronAmounts = [1500, 4500, 12000];

export default function ArtisanDetail() {
  const { slug = "" } = useParams();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [catalog, setCatalog] = useState<Mask[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useApp((s) => s.toast);
  const currency = useApp((s) => s.currency);

  usePageMeta(artisan ? artisan.name : "Artisan");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api.getArtisan(slug).then(async (a) => {
      if (!alive) return;
      setArtisan(a ?? null);
      if (a) {
        const c = await api.masksByArtisan(a.slug);
        if (alive) setCatalog(c);
      }
      if (alive) setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="h-96" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <EmptyState art={<MagnifierArt />} title="No maker by that name" body="The registry lists eight workshops. One of them is bound to have carved what you're looking for.">
          <Link to="/artisans" className="inline-flex h-10 items-center rounded-lg bg-gold px-4 text-sm font-medium text-[#16120A] transition-transform duration-100 hover:bg-gold-strong active:scale-[0.98]">
            Meet the makers
          </Link>
        </EmptyState>
      </div>
    );
  }

  const paragraphs = artisan.story.match(/[^.]+\.[^.]+\.|[^.]+$/g) ?? [artisan.story];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link to="/artisans" className="inline-flex items-center gap-1.5 text-[13px] text-ink3 transition-colors hover:text-ink">
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        All makers
      </Link>

      {/* editorial hero */}
      <div className="mt-6 grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-[40px] leading-[1.02] font-light tracking-[-0.02em] text-ink sm:text-[52px]">
            {artisan.name}
          </h1>
          <p className="mt-2 font-sinhala text-lg text-ink2">{artisan.sinhalaName}</p>
          <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink2">
            {artisan.role} · {artisan.village}
            {artisan.verified && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Heritage-verified
              </span>
            )}
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink">{artisan.bio}</p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["Carving since", String(artisan.since)],
              ["Pieces fulfilled", String(artisan.ordersFulfilled)],
              ["Rating", `${artisan.rating} / 5`],
              ["Generations", String(artisan.generations.length)],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[12.5px]  text-ink4">{k}</p>
                <p className="mt-1 font-mono text-xl text-ink tnum">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative">
            <ImageFrame
              src={artisan.photo}
              alt={`${artisan.name} in the workshop`}
              ratio="aspect-[4/4.6]"
              fallback={
                <div className="relative h-full w-full bg-s1">
                  <BenchScene className="h-full w-full object-cover" label={`${artisan.name}'s carving bench`} />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-s1 p-4">
                    <ArtisanAvatar artisan={artisan} size="size-12" />
                    <p className="text-[13px] leading-snug text-ink2">Portrait sitting not yet booked; this is the bench as it stands.</p>
                  </div>
                </div>
              }
            />
            <span className="absolute top-3 right-3 rounded-md bg-scrim px-2 py-1 text-[12px] text-ink2">
              {artisan.region} · {artisan.born}
            </span>
          </div>
        </div>
      </div>

      {/* story + craft details */}
      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-[26px] text-ink">The workshop</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className={cn("mt-4 text-[15px] leading-[1.75]", i === 0 ? "text-ink" : "text-ink2")}>
              {p.trim()}
            </p>
          ))}
          <h3 className="mt-10 font-display text-xl text-ink">How to spot their hand</h3>
          <ul className="mt-3 space-y-2.5">
            {artisan.styleNotes.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-ink2">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold/70" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <aside className="lg:col-span-5">
          <div className="rounded-lg bg-s2 p-6">
            <h2 className="font-display text-xl text-ink">On the bench</h2>
            <ul className="mt-4 space-y-3">
              {artisan.tools.map((t) => (
                <li key={t} className="flex items-center gap-3.5 rounded-lg bg-s1 p-2.5 pr-4">
                  <span className="w-11 shrink-0 overflow-hidden rounded-md bg-s2">
                    <ToolArt kind={toolKind(t)} />
                  </span>
                  <span className="text-[14px] leading-snug text-ink2">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <FlameBand className="mt-16 opacity-70" />

      {/* lineage */}
      <section className="mt-12" aria-label="Lineage">
        <h2 className="font-display text-[24px] text-ink">The line</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {artisan.generations.map((g, i) => (
            <li key={g.name} className="relative border-l border-line pl-5">
              <span className={cn("absolute top-1 -left-[5px] size-2.5 rounded-full border", i === artisan.generations.length - 2 ? "border-gold bg-gold" : "border-gold/40 bg-s2")} aria-hidden="true" />
              <p className="font-mono text-[11px] text-ink3 tnum">{g.years}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{g.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-ink3">{g.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* catalog */}
      {catalog.length > 0 && (
        <section className="mt-16" aria-label="Catalog">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[24px] text-ink">From this bench</h2>
            <p className="font-mono text-xs text-ink3 tnum">{catalog.length} {catalog.length === 1 ? "piece" : "pieces"} live</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {catalog.map((m) => (
              <MaskCard key={m.slug} mask={m} />
            ))}
          </div>
        </section>
      )}

      {/* patronage */}
      <section className="mt-16" aria-label="Support this artisan">
        <div className="rounded-lg bg-s2 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 text-[12.5px] font-medium  text-gold">
                <Heart className="size-3.5" aria-hidden="true" />
                Patronage, done plainly
              </p>
              <h2 className="mt-2 font-display text-[26px] leading-tight text-ink">Keep this bench lit</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink2">
                A patronage pays for timber seasons, pigment grinding days and apprentice hours — the slow parts of the craft that
                sales alone can't fund. 96% of your pledge reaches the workshop; the registry keeps the books open.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <div className="flex flex-wrap gap-3">
                {patronAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    onClick={() => toast("Pledged — thank you", { description: `${formatMoney(amt, currency)} to ${artisan.name}'s workshop. The registry desk confirms by letter.`, kind: "success" })}
                  >
                    {formatMoney(amt, currency)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-ink3">One-time pledges while the workshop fund is prototyped. No subscriptions here yet.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
