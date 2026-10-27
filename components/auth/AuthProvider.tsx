"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { apiFetch } from "@/lib/api-client";
import type { PublicUser } from "@/lib/auth/session";

/** `undefined` means "not resolved yet" - distinct from `null` (signed out). */
type AuthState = PublicUser | null | undefined;

type AuthContextValue = {
  user: AuthState;
  /** True until the first resolution completes. */
  loading: boolean;
  /** Re-read the session from the server. */
  refresh: () => Promise<void>;
  /** Apply a known user immediately (e.g. straight after login/signup). */
  setUser: (user: PublicUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Single source of truth for client-side auth state.
 *
 * Every consumer (navbar, checkout, application) reads the same value, so the
 * UI can never show "signed in" in one place and "signed out" in another. After
 * login or signup the caller pushes the user in directly, which makes the whole
 * page update immediately rather than waiting on a refetch.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AuthState>(undefined);
  // Guards against a slow in-flight refresh overwriting a newer known value.
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const result = await apiFetch<{ user: PublicUser | null }>("/api/auth/me");
      if (id === requestId.current) setUserState(result.user);
    } catch {
      // A transient failure must not present as "signed out" once we already
      // know who the user is - keep the last known value in that case.
      if (id === requestId.current) setUserState((current) => (current ? current : null));
    }
  }, []);

  const setUser = useCallback((next: PublicUser | null) => {
    // Invalidate any in-flight refresh so it cannot clobber this value.
    requestId.current += 1;
    setUserState(next);
  }, []);

  useEffect(() => {
    // setState lives in the promise callback, not the effect body - this is the
    // "subscribe to an external system" case, not a cascading render.
    let cancelled = false;
    const id = ++requestId.current;
    apiFetch<{ user: PublicUser | null }>("/api/auth/me")
      .then((result) => {
        if (!cancelled && id === requestId.current) setUserState(result.user);
      })
      .catch(() => {
        if (!cancelled && id === requestId.current) setUserState(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ user, loading: user === undefined, refresh, setUser }),
    [user, refresh, setUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within <AuthProvider>.");
  }
  return context;
}
