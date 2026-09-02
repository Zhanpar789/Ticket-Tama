export const CATEGORIES = [
  "Semua Event",
  "Konser",
  "Workshop",
  "Olahraga",
  "Seni & Teater",
  "Lainnya",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const DEFAULT_CATEGORY: CategoryFilter = "Semua Event";
