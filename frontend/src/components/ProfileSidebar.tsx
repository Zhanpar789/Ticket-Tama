"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

type Props = {
  active: "profil" | "tiket";
};

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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function ProfileSidebar({ active }: Props) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await logout();
    setIsLoggingOut(false);
    router.push("/");
  };

  return (
    <aside className="w-full md:w-[260px] md:flex-shrink-0">
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        <Link
          href="/profile"
          className={`flex items-center gap-3 h-[48px] px-4 rounded-xl font-heading font-bold text-[14px] leading-[18px] transition-colors whitespace-nowrap ${
            active === "profil"
              ? "bg-[#DBE7FB] text-primary"
              : "bg-white border border-border text-dark hover:bg-surface"
          }`}
        >
          <span className={active === "profil" ? "text-primary" : "text-muted"}>
            <IconUser />
          </span>
          <span>Profil Saya</span>
        </Link>

        <Link
          href="/dashboard"
          className={`flex items-center gap-3 h-[48px] px-4 rounded-xl font-heading font-bold text-[14px] leading-[18px] transition-colors whitespace-nowrap ${
            active === "tiket"
              ? "bg-[#DBE7FB] text-primary"
              : "bg-white border border-border text-dark hover:bg-surface"
          }`}
        >
          <span className={active === "tiket" ? "text-primary" : "text-muted"}>
            <IconTicket />
          </span>
          <span>Ticket Saya</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 h-[48px] px-4 rounded-xl font-heading font-bold text-[14px] leading-[18px] bg-white border border-border text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-red-600">
            <IconLogout />
          </span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
