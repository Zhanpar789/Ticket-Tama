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

function TicketTamaLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1a2 2 0 00-2 2 2 2 0 002 2v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 002-2 2 2 0 00-2-2V9z"
        fill="white"
      />
    </svg>
  );
}

function LogoutLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/85 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-[96px] h-[96px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-border border-t-primary animate-spin" />
          <div className="w-[64px] h-[64px] rounded-full bg-primary flex items-center justify-center animate-pulse">
            <TicketTamaLogo size={28} />
          </div>
        </div>
        <p className="font-heading font-bold text-[18px] leading-[23px] text-dark">
          Sedang keluar...
        </p>
      </div>
    </div>
  );
}

function MenuItem({
  href,
  onClick,
  icon,
  children,
  variant = "default",
}: {
  href: string;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "danger";
}) {
  const isDanger = variant === "danger";
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className={`flex items-center gap-3 h-[40px] px-3 rounded-lg font-heading font-normal text-[14px] transition-colors ${
        isDanger
          ? "text-red-600 hover:bg-red-50"
          : "text-dark hover:bg-surface"
      }`}
    >
      <span className={isDanger ? "text-red-600" : "text-muted"}>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await logout();
    setIsLoggingOut(false);
    router.push("/");
  };

  return (
    <>
      <nav className="w-full h-[76px] bg-surface shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 md:px-[90px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
              <TicketTamaLogo size={20} />
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

          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="w-[180px] h-[36px]" aria-hidden="true" />
            ) : isAuthenticated && user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 h-[36px] pl-1 pr-2 rounded-full hover:bg-border/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-[32px] h-[32px] rounded-full bg-primary flex items-center justify-center font-heading font-bold text-[14px] leading-[100%] text-white">
                    {getInitial(user.nama_lengkap)}
                  </div>
                  <span className="font-heading font-bold text-[14px] leading-[18px] text-dark max-w-[140px] truncate hidden sm:inline">
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

                    <div className="md:hidden p-2 border-b border-border flex flex-col gap-1">
                      <MenuItem
                        href="/event"
                        onClick={closeMenu}
                        icon={
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
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                        }
                      >
                        Event
                      </MenuItem>
                      <MenuItem
                        href="/bantuan"
                        onClick={closeMenu}
                        icon={
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
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                          </svg>
                        }
                      >
                        Bantuan
                      </MenuItem>
                    </div>

                    <div className="p-2 flex flex-col gap-1">
                      <MenuItem
                        href="/dashboard"
                        onClick={closeMenu}
                        icon={<IconUser />}
                      >
                        Profil Saya
                      </MenuItem>
                      <MenuItem
                        href="/dashboard"
                        onClick={closeMenu}
                        icon={<IconTicket />}
                      >
                        Tiket Saya
                      </MenuItem>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 h-[40px] px-3 rounded-lg font-heading font-normal text-[14px] text-red-600 hover:bg-red-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      </nav>

      {isLoggingOut && <LogoutLoader />}
    </>
  );
}
