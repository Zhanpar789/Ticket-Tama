export type AuthUser = {
  id: number;
  nama_lengkap: string;
  email: string;
};

const ACCESS_TOKEN_KEY = "tt_access_token";

export const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  set(token: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export type RegisterPayload = {
  nama_lengkap: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthSuccess = {
  user: AuthUser;
  access_token: string;
};

import { apiRequest } from "./api";

export async function registerRequest(
  payload: RegisterPayload
): Promise<AuthSuccess> {
  return apiRequest<AuthSuccess>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function loginRequest(
  payload: LoginPayload
): Promise<AuthSuccess> {
  return apiRequest<AuthSuccess>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export async function logoutRequest(): Promise<void> {
  await apiRequest<{ message: string }>("/auth/logout", {
    method: "POST",
  });
}

export async function fetchMe(accessToken: string): Promise<AuthUser> {
  const data = await apiRequest<{ user: AuthUser }>("/auth/me", {
    method: "GET",
    accessToken,
  });
  return data.user;
}
