"use client";

import { useState } from "react";

const categories = [
  "Semua Event",
  "Konser",
  "Workshop",
  "Olahraga",
  "Seni & Teater",
  "Lainnya",
];

export default function SearchSection() {
  const [active, setActive] = useState("Semua Event");

  return (
    <section className="max-w-[1101px] mx-auto px-[90px] mt-[60px]">
      <div className="flex flex-row items-center gap-4 flex-wrap">
        <div className="relative w-[260px] h-[48px] flex-shrink-0">
          <div className="absolute left-[15px] top-1/2 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                stroke="#1D1B20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari event...."
            className="w-full h-full pl-[47px] pr-4 bg-white border border-border rounded-xl shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] font-body text-[16px] leading-[100%] text-body placeholder:text-body outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-row items-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`h-[48px] px-5 rounded-xl border font-body text-[16px] leading-[100%] transition-colors whitespace-nowrap ${
                active === cat
                  ? "bg-primary border-primary text-white shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)]"
                  : "bg-surface border-border text-body hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border mt-[40px]" />
    </section>
  );
}
