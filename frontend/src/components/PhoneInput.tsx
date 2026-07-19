"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  COUNTRIES,
  Country,
  DEFAULT_COUNTRY_CODE,
  POPULAR_COUNTRY_CODES,
  getCountryByCode,
} from "@/lib/countries";

function IconChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CountryFlag({ code }: { code: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagsapi.com/${code}/flat/32.png`}
      alt={code}
      className="w-[22px] h-[14px] rounded-sm object-cover block bg-border/30"
    />
  );
}

function CountryOption({
  country,
  onSelect,
}: {
  country: Country;
  onSelect: (c: Country) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(country)}
      className="w-full flex items-center justify-between gap-2 px-4 py-2 hover:bg-surface transition-colors text-left"
    >
      <div className="flex items-center gap-2 min-w-0">
        <CountryFlag code={country.code} />
        <span className="font-body text-[14px] leading-[18px] text-dark truncate">
          {country.name}
        </span>
      </div>
      <span className="font-body text-[14px] leading-[18px] text-dark font-medium">
        {country.dialCode}
      </span>
    </button>
  );
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryChange: (country: Country) => void;
  hasError?: boolean;
  id?: string;
  placeholder?: string;
};

export default function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
  hasError,
  id,
  placeholder = "Masukkan nomor",
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const country = getCountryByCode(countryCode) || getCountryByCode(DEFAULT_COUNTRY_CODE)!;

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  const popularCountries = useMemo(
    () =>
      POPULAR_COUNTRY_CODES.map((code) => getCountryByCode(code)).filter(
        (c): c is Country => Boolean(c)
      ),
    []
  );

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchInputRef.current) {
      // microtask supaya tidak bentrok dengan event buka dropdown
      const t = window.setTimeout(() => searchInputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const handleSelect = (c: Country) => {
    onCountryChange(c);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={`flex h-[44px] rounded-lg border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 transition-colors ${
          hasError ? "border-red-500" : "border-border"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-2 px-3 border-r border-border bg-white text-dark flex-shrink-0 hover:bg-surface transition-colors"
        >
          <CountryFlag code={country.code} />
          <span className="font-body text-[14px] leading-[18px] text-dark">
            {country.dialCode}
          </span>
          <span className="text-muted">
            <IconChevronDown />
          </span>
        </button>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
          placeholder={placeholder}
          className="flex-1 h-full px-3 font-body text-[14px] leading-[18px] text-dark placeholder:text-muted focus:outline-none bg-white"
        />
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute top-[calc(100%+6px)] left-0 right-0 z-30 bg-white rounded-lg border border-border shadow-[0px_8px_24px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          <div className="px-4 pt-4 pb-2">
            <p className="font-heading font-bold text-[16px] leading-[20px] text-dark mb-3">
              Cari kode negara
            </p>
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Masukkan nama negara"
              className="w-full h-[40px] px-3 rounded-lg border border-border bg-white font-body text-[14px] leading-[18px] text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {!search && popularCountries.length > 0 && (
            <div className="px-4 pt-2 pb-1">
              <p className="font-heading font-bold text-[13px] leading-[16px] text-muted">
                Negara Populer
              </p>
            </div>
          )}

          <div className="max-h-[280px] overflow-y-auto py-1">
            {!search
              ? popularCountries.map((c) => (
                  <CountryOption key={c.code} country={c} onSelect={handleSelect} />
                ))
              : filteredCountries.length === 0
                ? (
                  <p className="px-4 py-3 font-body text-[13px] leading-[18px] text-muted">
                    Negara tidak ditemukan
                  </p>
                )
                : filteredCountries.map((c) => (
                    <CountryOption key={c.code} country={c} onSelect={handleSelect} />
                  ))}
          </div>
        </div>
      )}
    </div>
  );
}
