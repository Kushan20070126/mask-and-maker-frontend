/**
 * Google sign-in through Google Identity Services (the OAuth 2.0 token client).
 * The popup returns an access token; the profile comes from Google's userinfo
 * endpoint. Nothing is sent anywhere except to Google.
 */
import type { AuthUser } from "@/store/auth";

export const googleClientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "").trim();

interface TokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface TokenClient {
  requestAccessToken: (overrides?: { prompt?: string }) => void;
}

interface GoogleGlobal {
  accounts: {
    oauth2: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        callback: (r: TokenResponse) => void;
        error_callback?: (e: { type: string }) => void;
      }) => TokenClient;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleGlobal;
  }
}

const SCRIPT = "https://accounts.google.com/gsi/client";
let loading: Promise<void> | null = null;

/** Load the Google script once. Call early so the popup can open inside the click. */
export function loadGoogle(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null;
      s.remove();
      reject(new Error("Couldn't reach Google. Check your connection and try again."));
    };
    document.head.appendChild(s);
  });
  return loading;
}

/** Closing the Google window is a choice, not a failure: the page resets without an error. */
export const CANCELLED = "SignInCancelled";

const failure = (type: string) => {
  const err = new Error(messageFor(type));
  if (type === "popup_closed" || type === "access_denied") err.name = CANCELLED;
  return err;
};

const messageFor = (type: string) =>
  type === "popup_closed"
    ? "The Google window was closed before sign-in finished."
    : type === "popup_failed_to_open"
      ? "Your browser blocked the Google window. Allow pop-ups for this site and try again."
      : "Google sign-in didn't complete. Please try again.";

export async function signInWithGoogle(): Promise<AuthUser> {
  await loadGoogle();
  const google = window.google;
  if (!google) throw new Error("Google sign-in isn't available right now.");

  const accessToken = await new Promise<string>((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: googleClientId,
      scope: "openid email profile",
      callback: (r) => (r.access_token ? resolve(r.access_token) : reject(failure(r.error ?? ""))),
      error_callback: (e) => reject(failure(e.type)),
    });
    client.requestAccessToken({ prompt: "select_account" });
  });

  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Google signed you in but didn't share your profile. Please try again.");
  const p = (await res.json()) as { sub?: string; name?: string; email?: string; picture?: string };
  if (!p.sub || !p.email) throw new Error("Google didn't return an email address for this account.");
  return { id: p.sub, name: p.name || p.email.split("@")[0]!, email: p.email, picture: p.picture, provider: "google" };
}
