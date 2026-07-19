const PROFILE_STORAGE_PREFIX = "tt_profile_";
const PROFILE_STORAGE_ANON = "tt_profile_anon";

function profileKey(userId: number | undefined): string {
  return typeof userId === "number" && userId > 0
    ? `${PROFILE_STORAGE_PREFIX}${userId}`
    : PROFILE_STORAGE_ANON;
}

export type ProfileData = {
  foto: string | null;
  nama_lengkap: string;
  email: string;
  nomor_telepon: string;
  country_code_telepon: string;
  nomor_whatsapp: string;
  country_code_whatsapp: string;
  whatsapp_sama_dengan_telepon: boolean;
  alamat_lengkap: string;
};

export const defaultProfile: ProfileData = {
  foto: null,
  nama_lengkap: "",
  email: "",
  nomor_telepon: "",
  country_code_telepon: "ID",
  nomor_whatsapp: "",
  country_code_whatsapp: "ID",
  whatsapp_sama_dengan_telepon: true,
  alamat_lengkap: "",
};

function isProfileData(value: unknown): value is ProfileData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    "foto" in v &&
    "nama_lengkap" in v &&
    "email" in v &&
    "nomor_telepon" in v &&
    "nomor_whatsapp" in v &&
    "whatsapp_sama_dengan_telepon" in v &&
    "alamat_lengkap" in v
  );
}

export const profileStorage = {
  get(userId?: number): ProfileData | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(profileKey(userId));
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      if (!isProfileData(parsed)) return null;
      return parsed;
    } catch {
      return null;
    }
  },
  set(data: ProfileData, userId?: number): boolean {
    if (typeof window === "undefined") return false;
    try {
      window.localStorage.setItem(profileKey(userId), JSON.stringify(data));
      return true;
    } catch {
      // quota exceeded atau foto terlalu besar
      return false;
    }
  },
  clear(userId?: number) {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(profileKey(userId));
  },
};

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Gagal membaca file"));
      }
    };
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}
