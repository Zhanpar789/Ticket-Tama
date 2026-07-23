"use client";

import { useEffect, useRef, useState } from "react";

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const QUICK_FILTERS = [
  { id: "today", label: "Hari ini" },
  { id: "this-month", label: "Bulan ini" },
  { id: "next-month", label: "Bulan depan" },
] as const;

type QuickFilterId = (typeof QUICK_FILTERS)[number]["id"];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function fromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDateID(iso: string): string {
  const d = fromISO(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function isQuickFilter(value: string | null): value is QuickFilterId {
  return (
    value === "today" ||
    value === "this-month" ||
    value === "next-month"
  );
}

function isSpecificDate(value: string | null): value is string {
  return value !== null && !isQuickFilter(value);
}

function IconCalendar() {
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
        d="M19 4H5a2 2 0 00-2 2v14l3-2h13a2 2 0 002-2V6a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2v4M8 2v4M3 10h18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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

function IconChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polyline
        points="15 18 9 12 15 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polyline
        points="9 18 15 12 9 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  id?: string;
};

export default function DatePicker({
  value,
  onChange,
  placeholder = "Pilih tanggal",
  id,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const initialDate = isSpecificDate(value) ? fromISO(value) : today;
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (isSpecificDate(value)) {
      const d = fromISO(value);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setViewMonth(d.getMonth());
      setViewYear(d.getFullYear());
    }
  }, [value]);

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(viewYear, viewMonth, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (d: Date) => {
    onChange(toISO(d));
    setOpen(false);
  };

  const handleQuickFilter = (id: QuickFilterId) => {
    onChange(id);
    setOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setOpen(false);
  };

  let displayText = placeholder;
  if (value === "today") displayText = "Hari ini";
  else if (value === "this-month") displayText = "Bulan ini";
  else if (value === "next-month") displayText = "Bulan depan";
  else if (isSpecificDate(value)) displayText = formatDateID(value);

  const todayISO = toISO(today);
  const isSelected = (d: Date) => isSpecificDate(value) && toISO(d) === value;
  const isToday = (d: Date) => toISO(d) === todayISO;

  return (
    <div className="relative" ref={containerRef}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`w-full h-[48px] pl-11 pr-10 bg-white border rounded-xl font-body text-[14px] text-left outline-none transition-colors cursor-pointer ${
          open ? "border-primary" : "border-border hover:border-primary"
        } ${value ? "text-body" : "text-muted"}`}
      >
        {displayText}
      </button>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
        <IconCalendar />
      </span>
      <span
        className={`absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none transition-transform ${
          open ? "rotate-180" : ""
        }`}
      >
        <IconChevronDown />
      </span>

      {open && (
        <div
          role="dialog"
          aria-label="Pilih tanggal"
          className="absolute z-30 top-[calc(100%+6px)] left-0 w-[320px] bg-white rounded-xl border border-border shadow-[0px_8px_24px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 p-3 border-b border-border">
            {QUICK_FILTERS.map((qf) => (
              <button
                key={qf.id}
                type="button"
                onClick={() => handleQuickFilter(qf.id)}
                className={`h-[32px] px-3 rounded-lg font-body text-[12px] leading-[100%] transition-colors ${
                  value === qf.id
                    ? "bg-primary text-white"
                    : "bg-surface text-body hover:bg-primary/10"
                }`}
              >
                {qf.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between px-3 py-2.5">
            <button
              type="button"
              onClick={goPrevMonth}
              aria-label="Bulan sebelumnya"
              className="w-[28px] h-[28px] flex items-center justify-center rounded-md hover:bg-surface text-dark"
            >
              <IconChevronLeft />
            </button>
            <span className="font-heading font-bold text-[14px] leading-[18px] text-dark">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={goNextMonth}
              aria-label="Bulan berikutnya"
              className="w-[28px] h-[28px] flex items-center justify-center rounded-md hover:bg-surface text-dark"
            >
              <IconChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 px-3 mb-1">
            {DAYS.map((day) => (
              <div
                key={day}
                className="h-[28px] flex items-center justify-center font-body text-[11px] font-bold text-muted"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 px-3 pb-3">
            {cells.map((d, idx) => {
              if (!d) return <div key={idx} className="h-[32px]" aria-hidden="true" />;
              const selected = isSelected(d);
              const todayCell = isToday(d);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectDate(d)}
                  aria-pressed={selected}
                  className={`h-[32px] rounded-md font-body text-[13px] leading-[100%] transition-colors ${
                    selected
                      ? "bg-primary text-white font-bold"
                      : todayCell
                        ? "border border-primary text-body hover:bg-primary/10"
                        : "text-body hover:bg-surface"
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="border-t border-border p-2">
            <button
              type="button"
              onClick={handleClear}
              className="w-full h-[36px] rounded-md font-body font-bold text-[13px] leading-[100%] text-primary hover:bg-primary/5 transition-colors"
            >
              Semua Tanggal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
