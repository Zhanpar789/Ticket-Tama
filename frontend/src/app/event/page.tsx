"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DatePicker from "@/components/DatePicker";
import { EVENTS, Event, EventCategory } from "@/lib/events";

const CATEGORIES: ("Semua Event" | EventCategory)[] = [
  "Semua Event",
  "Konser",
  "Workshop",
  "Olahraga",
  "Seni & Teater",
  "Lainnya",
];

const PRICE_RANGES = [
  { id: "all", label: "Semua Harga" },
  { id: "free", label: "Gratis" },
  { id: "0-100k", label: "Di bawah Rp 100.000" },
  { id: "100k-250k", label: "Rp 100.000 - Rp 250.000" },
  { id: "250k-500k", label: "Rp 250.000 - Rp 500.000" },
  { id: "500k+", label: "Di atas Rp 500.000" },
];

const SORTS = [
  { id: "relevansi", label: "Relevansi" },
  { id: "date-asc", label: "Tanggal terdekat" },
  { id: "date-desc", label: "Tanggal terjauh" },
  { id: "price-asc", label: "Harga terendah" },
  { id: "price-desc", label: "Harga tertinggi" },
];

const PAGE_SIZE = 8;

function IconSearch() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMoney() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <polyline
        points="6 9 12 15 18 9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCardCalendar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M19 4H5a2 2 0 00-2 2v14l3-2h13a2 2 0 002-2V6a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCardPin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EventGridCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/event/${event.id}`}
      className="block w-full rounded-lg overflow-hidden bg-white border border-black/10 shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <div className="relative w-full aspect-[16/10] bg-[#D9D9D9] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${event.image})` }}
          aria-hidden="true"
        />
        <div className="absolute top-3 left-3 bg-white rounded-xl px-2 py-1 z-10">
          <span className="font-body font-normal text-[12px] leading-[15px] text-body">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="font-heading font-bold text-[16px] leading-[20px] text-black mb-2 line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 mb-1 text-muted">
          <IconCardCalendar />
          <span className="font-body text-[14px] leading-[17px]">{event.date}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-muted">
          <IconCardPin />
          <span className="font-body text-[14px] leading-[17px]">{event.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-body text-[16px] leading-[19px] text-body font-bold">
            {event.priceLabel}
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full text-dark group-hover:bg-primary group-hover:text-white transition-colors">
            <IconArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <label className="font-body font-normal text-[14px] leading-[18px] text-body">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          {icon}
        </span>
        <select
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
          className="w-full h-[48px] pl-11 pr-10 bg-white border border-border rounded-xl font-body text-[14px] leading-[100%] text-body outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          <IconChevronDown />
        </span>
      </div>
    </div>
  );
}

function EventPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = (() => {
    const c = searchParams.get("category");
    if (c === "konser") return "Konser";
    if (c === "workshop") return "Workshop";
    if (c === "olahraga") return "Olahraga";
    if (c === "seni-teater") return "Seni & Teater";
    if (c === "lainnya") return "Lainnya";
    return "Semua Event";
  })();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState("all");
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [sort, setSort] = useState("relevansi");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(PAGE_SIZE);
  }, [search, category, priceRange, dateFilter, sort]);

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    const slug =
      cat === "Konser"
        ? "konser"
        : cat === "Workshop"
          ? "workshop"
          : cat === "Olahraga"
            ? "olahraga"
            : cat === "Seni & Teater"
              ? "seni-teater"
              : cat === "Lainnya"
                ? "lainnya"
                : null;
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    router.replace(`/event?${params.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const now = new Date();
    const todayISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const nextMonth = thisMonth === 11 ? 0 : thisMonth + 1;
    const nextMonthYear = thisMonth === 11 ? thisYear + 1 : thisYear;

    let list = EVENTS.filter((ev) => {
      if (category !== "Semua Event" && ev.category !== category) return false;
      if (q) {
        const haystack = `${ev.title} ${ev.location} ${ev.lineup.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (priceRange === "free") {
        if (ev.price !== 0) return false;
      } else if (priceRange === "0-100k") {
        if (ev.price >= 100000) return false;
      } else if (priceRange === "100k-250k") {
        if (ev.price < 100000 || ev.price > 250000) return false;
      } else if (priceRange === "250k-500k") {
        if (ev.price < 250000 || ev.price > 500000) return false;
      } else if (priceRange === "500k+") {
        if (ev.price < 500000) return false;
      }
      if (dateFilter) {
        if (dateFilter === "today") {
          if (ev.dateISO !== todayISO) return false;
        } else if (dateFilter === "this-month") {
          const [y, m] = ev.dateISO.split("-").map(Number);
          if (y !== thisYear || m - 1 !== thisMonth) return false;
        } else if (dateFilter === "next-month") {
          const [y, m] = ev.dateISO.split("-").map(Number);
          if (y !== nextMonthYear || m - 1 !== nextMonth) return false;
        } else {
          if (ev.dateISO !== dateFilter) return false;
        }
      }
      return true;
    });

    if (sort === "date-asc") {
      list = [...list].sort(
        (a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime()
      );
    } else if (sort === "date-desc") {
      list = [...list].sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
      );
    } else if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [search, category, priceRange, dateFilter, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white">
        <section className="max-w-[1100px] mx-auto px-6 md:px-[90px] pt-8 md:pt-10 pb-8">
          <h1 className="font-heading font-bold text-[28px] md:text-[36px] leading-[110%] text-black">
            Temukan Pengalaman Berikutnya
          </h1>
          <p className="font-body text-[14px] md:text-[16px] leading-[24px] text-muted mt-3">
            Temukan dan pesan event terbaik yang berlangsung di sekitarmu.
          </p>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-[90px]">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              <IconSearch />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan nama event, artis, atau lokasi"
              className="w-full h-[52px] pl-12 pr-4 bg-white border border-border rounded-xl font-body text-[14px] md:text-[15px] text-body placeholder:text-muted outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="event-date"
                className="font-body font-normal text-[14px] leading-[18px] text-body"
              >
                Tanggal
              </label>
              <DatePicker
                id="event-date"
                value={dateFilter}
                onChange={setDateFilter}
                placeholder="Pilih tanggal"
              />
            </div>

            <SelectField
              label="Rentang Harga"
              value={priceRange}
              options={PRICE_RANGES}
              onChange={setPriceRange}
              icon={<IconMoney />}
            />

            <SelectField
              label="Urutkan Berdasarkan"
              value={sort}
              options={SORTS}
              onChange={setSort}
              icon={<IconChevronDown />}
            />
          </div>

          <div className="flex flex-row items-center gap-2 md:gap-3 flex-wrap mt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`h-[40px] px-4 md:px-5 rounded-xl border font-body text-[14px] md:text-[15px] leading-[100%] transition-colors whitespace-nowrap ${
                  category === cat
                    ? "bg-primary border-primary text-white shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)]"
                    : "bg-white border-border text-body hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-[90px] mt-10 md:mt-12 pb-12 md:pb-16">
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <h2 className="font-heading font-bold text-[20px] md:text-[24px] leading-[30px] text-black">
              Event Mendatang
            </h2>
            <span className="font-body text-[13px] md:text-[14px] text-muted">
              Menampilkan {filtered.length} event
            </span>
          </div>

          {visible.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-body text-[15px] text-muted">
                Tidak ada event yang cocok dengan filter Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visible.map((event) => (
                <EventGridCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="h-[44px] px-6 rounded-lg border border-primary bg-white font-body font-bold text-[14px] leading-[18px] text-primary hover:bg-primary/5 transition-colors"
              >
                Muat Event Lainya
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function EventPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="flex-1 w-full bg-white" />
          <Footer />
        </>
      }
    >
      <EventPageInner />
    </Suspense>
  );
}
