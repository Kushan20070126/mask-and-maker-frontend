import { BadgeCheck, Heart, Loader2, PackageOpen, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Modal } from "@/components/ui/kit";
import { Pic } from "@/components/ui/MaskImage";
import { googleClientId, loadGoogle, signInWithGoogle } from "@/lib/google";
import { usePageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { useApp } from "@/store/app";
import { initialsOf, useAuth, type AuthUser } from "@/store/auth";
import { EXPO } from "@/lib/utils";

/** Only same-site paths are honoured, so a crafted ?next= can't send someone elsewhere. */
export const safeNext = (next: string | null) => (next && /^\/(?!\/|login)/.test(next) ? next : "/account");

const perks = [
  { icon: BadgeCheck, title: "Your certificates, kept", body: "Every piece you buy arrives with a verifiable certificate and a digital twin." },
  { icon: PackageOpen, title: "Orders in one place", body: "Follow each mask from the carver's bench to your door." },
  { icon: Heart, title: "A wishlist that follows you", body: "Save pieces on your phone, find them again on your laptop." },
];

const sampleAccounts: AuthUser[] = [
  { id: "preview-ruwin", name: "Ruwin Jayasuriya", email: "ruwin.jayasuriya@example.com", provider: "preview" },
  { id: "preview-nimali", name: "Nimali Perera", email: "nimali.perera@example.com", provider: "preview" },
];

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function Login() {
  usePageMeta("Sign in", "Sign in to Mask & Maker with your Google account to keep your orders, certificates and wishlist.");
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const user = useAuth((s) => s.user);
  const signIn = useAuth((s) => s.signIn);
  const toast = useApp((s) => s.toast);
  const reduce = useReducedMotion();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [chooser, setChooser] = useState(false);
  const preview = !googleClientId;

  // load Google's script ahead of the click so its popup opens inside the click
  useEffect(() => {
    if (!preview) loadGoogle().catch(() => {});
  }, [preview]);

  if (user) return <Navigate to={next} replace />;

  const finish = (u: AuthUser) => {
    signIn(u);
    toast(`Welcome, ${u.name.split(" ")[0]}`, { description: "You're signed in. Your crate and wishlist are kept.", kind: "success" });
  };

  const onGoogle = async () => {
    setError("");
    if (preview) {
      setChooser(true);
      return;
    }
    setBusy(true);
    try {
      finish(await signInWithGoogle());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google sign-in didn't complete. Please try again.");
      setBusy(false);
    }
  };

  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: reduce ? 0 : 0.08 * i, ease: EXPO },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <div className="edge grid overflow-hidden rounded-[28px] bg-s1 lg:min-h-[640px] lg:grid-cols-[1.05fr_1fr]">
        {/* the photograph */}
        <section className="relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden p-7 sm:p-10 lg:justify-between" aria-label="About signing in">
          <Pic
            src={photos.masksWall2.src}
            alt=""
            eager
            sizes="(min-width: 1024px) 560px, 100vw"
            style={{ objectPosition: photos.masksWall2.position ?? "50% 50%" }}
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/25" aria-hidden="true" />

          <p className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[#ddb983] uppercase lg:flex">
            <span className="h-px w-8 bg-[#ddb983]/70" aria-hidden="true" />
            The Ambalangoda registry
          </p>

          <div>
            <h1 className="max-w-md font-display text-[32px] leading-[1.08] tracking-[-0.015em] text-white sm:text-[42px]">
              Every mask arrives with its story.
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/80">
              Sign in to keep what you collect — the certificate, the maker, the date it left the workshop.
            </p>
            <ul className="mt-7 hidden gap-4 lg:grid">
              {perks.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-[#ddb983] backdrop-blur-sm">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-white">{title}</span>
                    <span className="block text-[13.5px] leading-snug text-white/70">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-7 hidden text-[12.5px] text-white/55 lg:block">
              {photos.masksWall2.caption} ·{" "}
              <Link to="/legal/credits" className="underline underline-offset-2 hover:text-white/80">
                picture credit
              </Link>
            </p>
          </div>
        </section>

        {/* the sign-in card */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12" aria-labelledby="signin-title">
          <div className="w-full max-w-sm">
            <motion.span {...rise(0)} className="relative grid size-14 place-items-center rounded-full border border-gold/40 bg-s2 text-gold">
              <span className="absolute inset-[4px] rounded-full border border-gold/20" aria-hidden="true" />
              <ShieldCheck className="size-6" aria-hidden="true" />
            </motion.span>

            <motion.h2 {...rise(1)} id="signin-title" className="mt-6 font-display text-[30px] leading-tight text-ink">
              Welcome to the registry
            </motion.h2>
            <motion.p {...rise(2)} className="mt-2 text-[15px] leading-relaxed text-ink2">
              Continue with Google. There's no password to make or remember — we only read your name, email address and photo.
            </motion.p>

            <motion.div {...rise(3)} className="mt-8">
              <button
                onClick={onGoogle}
                disabled={busy}
                aria-busy={busy}
                className="group/g relative flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#747775] bg-white px-6 text-[15.5px] font-medium text-[#1f1f1f] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-[box-shadow,background-color,transform] duration-200 hover:bg-[#f8f9fa] hover:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)] focus-visible:outline-offset-4 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
              >
                {busy ? <Loader2 className="size-5 animate-spin text-[#4285F4]" aria-hidden="true" /> : <GoogleG className="size-5" />}
                {busy ? "Waiting for Google…" : "Continue with Google"}
              </button>

              <p role="alert" className="min-h-0 text-sm text-danger empty:hidden mt-3">
                {error}
              </p>
            </motion.div>

            {preview && (
              <motion.div {...rise(4)} className="mt-5 rounded-lg border border-gold/30 bg-gold/[0.06] px-4 py-3">
                <p className="font-mono text-[11px] tracking-wide text-gold">PREVIEW MODE</p>
                <p className="mt-1 text-[13.5px] leading-snug text-ink2">
                  No Google client ID is set, so this button offers sample accounts. Add <code className="font-mono text-[12.5px] text-ink">VITE_GOOGLE_CLIENT_ID</code> to switch on real Google sign-in.
                </p>
              </motion.div>
            )}

            <motion.div {...rise(5)} className="mt-8 border-t border-line pt-6">
              <p className="text-[13.5px] text-ink3">
                Just looking? You don't need an account to{" "}
                <Link to="/masks" className="text-ink2 underline underline-offset-2 hover:text-gold">
                  browse the collection
                </Link>{" "}
                or check out as a guest.
              </p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ink3">
                By continuing you agree to our{" "}
                <Link to="/legal/terms" className="underline underline-offset-2 hover:text-ink2">
                  Terms of trade
                </Link>{" "}
                and{" "}
                <Link to="/legal/privacy" className="underline underline-offset-2 hover:text-ink2">
                  Privacy notice
                </Link>
                . More ways to sign in will come later.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Modal open={chooser} onClose={() => setChooser(false)} title="Choose an account" maxWidth="max-w-md">
        <p className="text-sm text-ink3">Preview mode · sample accounts only. Nothing leaves your browser.</p>
        <ul className="mt-4 space-y-2">
          {sampleAccounts.map((a) => (
            <li key={a.id}>
              <button
                onClick={() => {
                  setChooser(false);
                  finish(a);
                }}
                className="flex min-h-16 w-full items-center gap-3.5 rounded-lg border border-line bg-s2 px-4 py-3 text-left transition-colors hover:border-gold/50 hover:bg-s3"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-s3 font-display text-sm text-gold">{initialsOf(a.name)}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-medium text-ink">{a.name}</span>
                  <span className="block truncate text-[13px] text-ink3">{a.email}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
