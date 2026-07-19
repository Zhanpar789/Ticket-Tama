"use client";

import { useCallback, useEffect, useState } from "react";

import {
  AuthUser,
  fetchMe,
  loginRequest,
  logoutRequest,
  registerRequest,
  tokenStorage,
  changePasswordRequest,
} from "@/lib/auth";
import { ApiClientError } from "@/lib/api";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
  token: string | null;
};

function getInitialState(): AuthState {
  return {
    user: null,
    status: "loading",
    token: null,
  };
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(getInitialState);

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ user: null, status: "unauthenticated", token: null });
      return;
    }

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

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!state.token) throw new Error("Tidak terautentikasi");
      await changePasswordRequest(
        { current_password: currentPassword, new_password: newPassword },
        state.token
      );
    },
    [state.token]
  );

  return {
    user: state.user,
    status: state.status,
    isAuthenticated: state.status === "authenticated",
    isLoading: state.status === "loading",
    login,
    register,
    logout,
    changePassword,
  };
}
