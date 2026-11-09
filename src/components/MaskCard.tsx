import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import type { Mask, Tradition } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { useApp } from "@/store/app";
import { cn } from "@/utils/cn";
import { MaskArtwork } from "./ui/MaskImage";
import { SpotlightCard } from "./ui/surfaces";
import { Tag } from "./ui/kit";

const traditionTone: Record<Tradition, "vermilion" | "forest" | "gold"> = {
  raksha: "vermilion",
  sanni: "forest",
  kolam: "gold",
};

export function TraditionTag({ tradition, className }: { tradition: Tradition; className?: string }) {
  return (
    <Tag tone={traditionTone[tradition]} className={className}>
      {tradition}
    </Tag>
  );
}

export function MaskCard({ mask, linkState }: { mask: Mask; linkState?: { collectionSearch: string; collectionScrollKey: string } }) {
  const currency = useApp((s) => s.currency);
  const wishlisted = useApp((s) => s.wishlist.includes(mask.slug));
  const toggleWishlist = useApp((s) => s.toggleWishlist);
  const addToCart = useApp((s) => s.addToCart);
  const toast = useApp((s) => s.toast);

  const onWishlist = () => {
    toggleWishlist(mask.slug);
    toast(wishlisted ? "Removed from wishlist" : "Kept in your wishlist", { kind: wishlisted ? "default" : "success", description: mask.name });
  };

  const onAdd = () => {
    if (addToCart(mask.slug)) {
      toast("Added to your crate", { description: `${mask.name} · ${formatMoney(mask.priceLKR, currency)}`, kind: "success" });
    } else {
      toast("Already in your crate", { description: mask.stock === 1 ? `${mask.name} is one of one.` : `Every available ${mask.name} is crated.` });
    }
  };

  return (
    <SpotlightCard className="h-full">
      <div className="relative">
        <Link to={`/masks/${mask.slug}`} state={linkState} aria-label={`View ${mask.name}`}>
          <MaskArtwork mask={mask} ratio="aspect-[4/5]" className="rounded-b-none" />
        </Link>
        <button
          onClick={onWishlist}
          aria-label={wishlisted ? `Remove ${mask.name} from wishlist` : `Add ${mask.name} to wishlist`}
          aria-pressed={wishlisted}
          className={cn(
            "absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-lg border transition-all duration-100 active:scale-95",
            wishlisted ? "border-gold/50 bg-scrim text-gold" : "border-line bg-scrim text-ink3 hover:text-ink"
          )}
        >
          <Heart className={cn("size-4", wishlisted && "fill-current")} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/masks/${mask.slug}`} state={linkState} className="block">
              <h3 className="truncate font-display text-[17px] leading-snug text-ink transition-colors hover:text-gold-strong">{mask.name}</h3>
            </Link>
            <p className="mt-0.5 truncate text-xs text-ink3">
              <span className="font-sinhala">{mask.sinhala}</span>
              <span className="mx-1.5 text-ink3">·</span>
              {mask.region}
            </p>
          </div>
          <TraditionTag tradition={mask.tradition} className="mt-1" />
        </div>
        <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-line pt-3.5">
          <span className="font-mono text-[15px] text-ink tnum">{formatMoney(mask.priceLKR, currency)}</span>
          <button
            onClick={onAdd}
            className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-s3 px-4 text-[13px] font-medium text-ink transition-colors duration-100 hover:bg-gold hover:text-on-gold active:scale-[0.98]"
          >
            <ShoppingBag className="size-3.5" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}
