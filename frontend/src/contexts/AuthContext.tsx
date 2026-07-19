"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ApiClientError } from "@/lib/api";
import {
  AuthUser,
  fetchMe,
  loginRequest,
  logoutRequest,
  registerRequest,
  tokenStorage,
} from "@/lib/auth";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
  token: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (
    nama_lengkap: string,
    email: string,
    password: string
  ) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const initialState: AuthState = {
  user: null,
  status: "loading",
  token: null,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    let cancelled = false;
    const token = tokenStorage.get();
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ user: null, status: "unauthenticated", token: null });
      return;
    }

    fetchMe(token)
      .then((user) => {
        if (cancelled) return;
        setState({ user, status: "authenticated", token });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiClientError && err.status === 401) {
          tokenStorage.clear();
        }
        setState({ user: null, status: "unauthenticated", token: null });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginRequest({ email, password });
    tokenStorage.set(res.access_token);
    setState({
      user: res.user,
      status: "authenticated",
      token: res.access_token,
    });
    return res.user;
  }, []);

  const register = useCallback(
    async (nama_lengkap: string, email: string, password: string) => {
      const res = await registerRequest({ nama_lengkap, email, password });
      tokenStorage.set(res.access_token);
      setState({
        user: res.user,
        status: "authenticated",
        token: res.access_token,
      });
      return res.user;
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // ignore network errors on logout
    } finally {
      tokenStorage.clear();
      setState({ user: null, status: "unauthenticated", token: null });
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      status: state.status,
      isAuthenticated: state.status === "authenticated",
      isLoading: state.status === "loading",
      login,
      register,
      logout,
    }),
    [state.user, state.status, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
