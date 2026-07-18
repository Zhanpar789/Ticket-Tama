"use client";

import { useCallback, useEffect, useState } from "react";

import {
  AuthUser,
  fetchMe,
  loginRequest,
  logoutRequest,
  registerRequest,
  tokenStorage,
} from "@/lib/auth";
import { ApiClientError } from "@/lib/api";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
  token: string | null;
};

function getInitialState(): AuthState {
  const token = typeof window === "undefined" ? null : tokenStorage.get();
  return {
    user: null,
    status: token ? "loading" : "unauthenticated",
    token,
  };
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(getInitialState);

  const token = state.token;
  useEffect(() => {
    if (!token) return;

    let cancelled = false;
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
  }, [token]);

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

  return {
    user: state.user,
    status: state.status,
    isAuthenticated: state.status === "authenticated",
    isLoading: state.status === "loading",
    login,
    register,
    logout,
  };
}
