"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full h-[76px] bg-surface shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-[90px]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1a2 2 0 00-2 2 2 2 0 002 2v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 002-2 2 2 0 00-2-2V9z"
                fill="white"
              />
            </svg>
          </div>
          <span className="font-heading font-bold text-[18px] leading-[23px] text-dark">
            Ticket<span className="text-primary">Tama</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/event"
            className="font-heading font-normal text-[14px] leading-[18px] text-black hover:text-primary transition-colors"
          >
            Event
          </Link>
          <Link
            href="/bantuan"
            className="font-heading font-normal text-[14px] leading-[18px] text-black hover:text-primary transition-colors"
          >
            Bantuan
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center justify-center px-[12px] h-[36px] bg-primary-dark border border-primary rounded-lg font-body font-normal text-[14px] leading-[140%] text-white hover:bg-primary transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="flex items-center justify-center px-[12px] h-[36px] bg-accent border border-accent rounded-lg font-body font-normal text-[14px] leading-[140%] text-[#F5F5F5] hover:opacity-90 transition-opacity"
          >
            Daftar
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-4 flex flex-col gap-4">
          <Link
            href="/event"
            className="font-heading text-[14px] text-black"
            onClick={() => setMobileOpen(false)}
          >
            Event
          </Link>
          <Link
            href="/bantuan"
            className="font-heading text-[14px] text-black"
            onClick={() => setMobileOpen(false)}
          >
            Bantuan
          </Link>
          <div className="flex gap-3 pt-2">
            <Link
              href="/login"
              className="flex-1 text-center px-3 py-2 bg-primary-dark text-white rounded-lg text-[14px]"
              onClick={() => setMobileOpen(false)}
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center px-3 py-2 bg-accent text-[#F5F5F5] rounded-lg text-[14px]"
              onClick={() => setMobileOpen(false)}
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
