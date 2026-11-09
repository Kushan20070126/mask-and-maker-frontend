import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/auth";

/** Sends a signed-out visitor to the login page and brings them back afterwards. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const user = useAuth((s) => s.user);
  const { pathname, search } = useLocation();
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(pathname + search)}`} replace />;
  return <>{children}</>;
}
