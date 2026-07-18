"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

function getInitial(name: string | undefined | null): string {
  if (!name) return "?";
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toUpperCase();
}

function IconUser() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconTicket() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1a2 2 0 100 4v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 100-4V9z" />
      <path d="M9 9v6" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    router.push("/");
  };

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
          {isLoading ? (
            <div className="w-[180px] h-[36px]" aria-hidden="true" />
          ) : isAuthenticated && user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 h-[36px] pl-1 pr-2 rounded-full hover:bg-border/20 transition-colors"
              >
                <div className="w-[32px] h-[32px] rounded-full bg-primary flex items-center justify-center font-heading font-bold text-[14px] leading-[100%] text-white">
                  {getInitial(user.nama_lengkap)}
                </div>
                <span className="font-heading font-bold text-[14px] leading-[18px] text-dark max-w-[140px] truncate">
                  {user.nama_lengkap}
                </span>
                <span className="text-muted">
                  <IconChevron open={menuOpen} />
                </span>
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+8px)] w-[260px] bg-white rounded-2xl border border-border shadow-[0px_8px_24px_rgba(12,12,13,0.12)] overflow-hidden z-50"
                >
                  <div className="p-4 flex items-center gap-3 border-b border-border">
                    <div className="w-[44px] h-[44px] rounded-full bg-primary flex items-center justify-center font-heading font-bold text-[16px] leading-[100%] text-white flex-shrink-0">
                      {getInitial(user.nama_lengkap)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-bold text-[14px] leading-[18px] text-dark truncate">
                        {user.nama_lengkap}
                      </p>
                      <p className="font-body text-[12px] leading-[16px] text-muted truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 flex flex-col gap-1">
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 h-[40px] px-3 rounded-lg font-heading font-normal text-[14px] text-dark hover:bg-surface transition-colors"
                    >
                      <span className="text-muted">
                        <IconUser />
                      </span>
                      <span>Profil Saya</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 h-[40px] px-3 rounded-lg font-heading font-normal text-[14px] text-dark hover:bg-surface transition-colors"
                    >
                      <span className="text-muted">
                        <IconTicket />
                      </span>
                      <span>Tiket Saya</span>
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 h-[40px] px-3 rounded-lg font-heading font-normal text-[14px] text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <span className="text-red-600">
                        <IconLogout />
                      </span>
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
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
          {isAuthenticated && user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 pt-2"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center font-heading font-bold text-[14px] leading-[100%] text-white">
                {getInitial(user.nama_lengkap)}
              </div>
              <span className="font-heading font-bold text-[14px] text-dark truncate">
                {user.nama_lengkap}
              </span>
            </Link>
          ) : (
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
          )}
        </div>
      )}
    </nav>
  );
}
