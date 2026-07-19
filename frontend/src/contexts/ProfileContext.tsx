"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "@/hooks/useAuth";
import {
  ProfileData,
  defaultProfile,
  profileStorage,
} from "@/lib/profile";

type ProfileContextValue = {
  profile: ProfileData;
  isHydrated: boolean;
  updateProfile: (data: ProfileData) => void;
  updateFoto: (foto: string | null) => void;
  updateField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) => void;
  resetProfile: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isHydrated, setIsHydrated] = useState(false);
  const lastUserIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(defaultProfile);
      setIsHydrated(true);
      lastUserIdRef.current = undefined;
      return;
    }

    const stored = profileStorage.get(user.id);
    const merged: ProfileData = {
      ...defaultProfile,
      ...(stored ?? {}),
      nama_lengkap: stored?.nama_lengkap || user.nama_lengkap || "",
      email: stored?.email || user.email || "",
    };
    setProfile(merged);
    setIsHydrated(true);
    lastUserIdRef.current = user.id;
  }, [user, isAuthLoading]);

  const updateProfile = useCallback(
    (data: ProfileData) => {
      profileStorage.set(data, user?.id);
      setProfile(data);
    },
    [user]
  );

  const updateFoto = useCallback(
    (foto: string | null) => {
      setProfile((prev) => {
        const next = { ...prev, foto };
        profileStorage.set(next, user?.id);
        return next;
      });
    },
    [user]
  );

  const updateField = useCallback(
    <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
      setProfile((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetProfile = useCallback(() => {
    if (user) profileStorage.clear(user.id);
    setProfile({
      ...defaultProfile,
      nama_lengkap: user?.nama_lengkap || "",
      email: user?.email || "",
    });
  }, [user]);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      isHydrated,
      updateProfile,
      updateFoto,
      updateField,
      resetProfile,
    }),
    [profile, isHydrated, updateProfile, updateFoto, updateField, resetProfile]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
}
