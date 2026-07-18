"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (isLoading || !user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 w-full bg-white">
          <div className="max-w-[1280px] mx-auto px-[90px] py-[66px] flex items-center justify-center">
            <p className="font-body text-muted text-[16px]">Memuat...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white">
        <div className="max-w-[1280px] mx-auto px-[90px] py-[66px]">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="font-heading font-bold text-[40px] leading-[50px] text-black">
              Halo, {user.nama_lengkap}
            </h1>
            <p className="font-body font-normal text-[16px] leading-[20px] text-muted">
              Selamat datang di TicketTama. Kelola tiket dan temukan event
              favoritmu di sini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-2xl border border-border bg-surface">
              <p className="font-heading font-bold text-[14px] leading-[18px] text-muted mb-2">
                Nama Lengkap
              </p>
              <p className="font-heading font-bold text-[20px] leading-[25px] text-black">
                {user.nama_lengkap}
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-surface">
              <p className="font-heading font-bold text-[14px] leading-[18px] text-muted mb-2">
                Email
              </p>
              <p className="font-heading font-bold text-[20px] leading-[25px] text-black break-all">
                {user.email}
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-surface">
              <p className="font-heading font-bold text-[14px] leading-[18px] text-muted mb-2">
                User ID
              </p>
              <p className="font-heading font-bold text-[20px] leading-[25px] text-black">
                #{user.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="h-[44px] px-6 bg-primary-dark border border-primary-dark rounded-lg font-body font-bold text-[14px] leading-[100%] text-white hover:bg-primary transition-colors"
          >
            Keluar
          </button>
        </div>
      </main>
    </>
  );
}
