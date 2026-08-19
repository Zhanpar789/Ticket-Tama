"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import ProfileSidebar from "@/components/ProfileSidebar";
import { useAuth } from "@/hooks/useAuth";

type TicketStatus = "Sudah Bayar" | "Dibatalkan" | "Menunggu";

const tickets = [
  {
    title: "Now Playing Fest 2025",
    category: "Festival Music",
    status: "Sudah Bayar" as TicketStatus,
    date: "Sabtu, 19:00 WIB",
    location: "Kiara Artha Park",
    quantity: "2 Tiket",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Google DevFest Bandung 2025",
    category: "Workshop",
    status: "Dibatalkan" as TicketStatus,
    date: "Sabtu, 10:00 WIB",
    location: "Universitas Parahyangan",
    quantity: "5 Tiket",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Pocari Sweat Run 2025",
    category: "Olahraga",
    status: "Menunggu" as TicketStatus,
    date: "Senin, 08:00 WIB",
    location: "Lapangan Saparua",
    quantity: "1 Tiket",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=85",
  },
];

const statusStyle: Record<TicketStatus, string> = {
  "Sudah Bayar": "border-emerald-200 bg-emerald-50 text-emerald-600",
  Dibatalkan: "border-red-200 bg-red-50 text-red-500",
  Menunggu: "border-amber-200 bg-amber-50 text-amber-600",
};

function SearchIcon() {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

function CalendarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>;
}

function FilterIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" /></svg>;
}

function TicketIcon() {
  return <svg width="30" height="22" viewBox="0 0 32 24" fill="none" aria-hidden="true"><path d="M2 5a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v3a3 3 0 0 0 0 6v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a3 3 0 0 0 0-6V5Z" stroke="currentColor" strokeWidth="2" /><path d="M11 3v16" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" /></svg>;
}

function QrIcon() {
  return <svg width="29" height="29" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3h7v7H3V3Zm2 2v3h3V5H5Zm9-2h7v7h-7V3Zm2 2v3h3V5h-3ZM3 14h7v7H3v-7Zm2 2v3h3v-3H5Zm7-2h2v2h-2v-2Zm3 0h2v2h-2v-2Zm3 0h3v3h-2v-1h-1v-2Zm-6 3h3v2h-3v-2Zm4 2h2v2h-2v-2Zm3-1h3v3h-3v-3Z" fill="currentColor" /></svg>;
}

function TicketCard({ ticket }: { ticket: (typeof tickets)[number] }) {
  const isPaid = ticket.status === "Sudah Bayar";
  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-[#D1D5DB] bg-white p-6 shadow-[0_2px_8px_rgba(12,12,13,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(12,12,13,0.08)] lg:flex-row lg:items-center lg:gap-8 lg:p-7">
      <div className="h-[180px] w-full flex-shrink-0 rounded-xl bg-cover bg-center lg:w-[220px]" style={{ backgroundImage: `url("${ticket.image}")` }} />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-body text-[10px] font-medium leading-[14px] ${statusStyle[ticket.status]}`}>
            <span className="flex h-3 w-3 items-center justify-center rounded-full border border-current text-[8px]">{ticket.status === "Dibatalkan" ? "×" : ticket.status === "Menunggu" ? "◷" : "✓"}</span>
            {ticket.status}
          </span>
          <span className="font-body text-[12px] leading-[16px] text-body">{ticket.category}</span>
        </div>
        <h2 className="font-heading font-bold text-[21px] leading-[28px] text-black md:text-[23px]">{ticket.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-[12px] leading-[16px] text-body">
          <span className="flex items-center gap-1 text-primary"><CalendarIcon /><span className="text-body">{ticket.date}</span></span>
          <span className="flex items-center gap-1 text-primary"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></svg><span className="text-body">{ticket.location}</span></span>
        </div>
        <p className="mt-3 flex items-center gap-2 font-body text-[12px] font-medium leading-[16px] text-body"><span className="text-primary"><TicketIcon /></span> Dipesan: {ticket.quantity}</p>
      </div>
      <div className="flex shrink-0 gap-4 border-[#D1D5DB] pt-6 sm:pt-0 lg:w-[256px] lg:flex-col lg:border-l lg:pl-6">
        <button type="button" className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-body text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(38,99,235,0.24)] transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-[#6B91EF] disabled:opacity-100 disabled:shadow-none lg:flex-none" disabled={!isPaid}>
          {isPaid ? <><QrIcon /> Lihat E-Tiket</> : <><span className="text-[24px] leading-none">{ticket.status === "Dibatalkan" ? "×" : "◷"}</span> {ticket.status}</>}
        </button>
        <button type="button" className="h-[52px] flex-1 rounded-xl border-[2px] border-primary bg-white px-5 font-body text-[15px] font-bold text-primary transition-colors hover:bg-[#DBE7FB] lg:flex-none">Detail Event</button>
      </div>
    </article>
  );
}

export default function TicketsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Semua status");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isAuthenticated, isLoading, router]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchQuery = ticket.title.toLowerCase().includes(query.toLowerCase());
    return matchQuery && (status === "Semua status" || ticket.status === status);
  });

  if (isLoading || !user) {
    return <><Navbar /><main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#F5F6F8]"><p className="font-body text-[16px] text-muted">Memuat...</p></main></>;
  }

  return (
    <><Navbar /><main className="min-h-[calc(100vh-76px)] bg-[#F5F6F8]"><div className="mx-auto max-w-[1500px] px-6 py-8 md:px-12 lg:px-16 lg:py-10">
      <nav aria-label="Breadcrumb" className="mb-10 font-body text-[14px] leading-[18px] text-muted"><Link href="/profile" className="hover:text-primary">Profil</Link><span className="mx-2 text-muted/60">›</span><span className="font-bold text-primary">Tiket Saya</span></nav>
      <div className="flex flex-col gap-10 lg:flex-row"><ProfileSidebar active="tiket" /><section className="min-w-0 flex-1">
        <header className="mb-8"><h1 className="font-heading text-[34px] font-bold leading-[43px] text-black md:text-[40px] md:leading-[50px]">Tiket Saya</h1><p className="mt-2 font-body text-[18px] leading-[24px] text-body">Kelola pembelian tiket Anda.</p></header>
        <div className="rounded-2xl border border-[#D1D5DB] bg-white/40 p-6 md:p-8 lg:p-10">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_220px_180px]"><label className="flex h-[48px] items-center gap-3 rounded-xl border border-[#D1D5DB] bg-white px-4 text-[#A5A8B0]"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari berdasarkan nama event..." className="min-w-0 flex-1 bg-transparent font-body text-[14px] text-body outline-none placeholder:text-muted" /></label><button type="button" className="flex h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-4 font-body text-[14px] font-medium text-muted transition-colors hover:border-primary hover:text-primary"><CalendarIcon />Pilih tanggal</button><label className="flex h-[48px] items-center gap-3 rounded-xl border border-[#D1D5DB] bg-white px-4 font-body text-[14px] font-medium text-muted transition-colors focus-within:border-primary"><FilterIcon /><select value={status} onChange={(event) => setStatus(event.target.value)} className="min-w-0 flex-1 appearance-none bg-transparent outline-none"><option>Semua status</option><option>Sudah Bayar</option><option>Dibatalkan</option><option>Menunggu</option></select></label></div>
          <div className="space-y-6">{filteredTickets.map((ticket) => <TicketCard key={ticket.title} ticket={ticket} />)}{filteredTickets.length === 0 && <p className="py-12 text-center font-body text-[14px] text-muted">Tiket tidak ditemukan.</p>}</div>
          <div className="mt-14 flex flex-col items-center justify-between gap-5 font-body text-[13px] text-muted md:flex-row"><label className="flex items-center gap-2">Tampilkan <select className="h-[36px] rounded-lg border border-[#D1D5DB] bg-white px-3 text-[12px] text-muted"><option>3 Per halaman</option></select></label><nav aria-label="Pagination" className="flex items-center gap-3"><button type="button" disabled className="h-[36px] rounded-lg border border-[#D1D5DB] bg-white px-4 disabled:opacity-60">← Previous</button><button type="button" className="flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-primary text-white">1</button><button type="button" className="text-body">2</button><button type="button" className="text-body">3</button><span className="text-body">...</span><button type="button" className="text-body">7</button><button type="button" className="text-body">8</button><button type="button" className="h-[36px] rounded-lg border border-[#D1D5DB] bg-white px-4 text-body">Next →</button></nav></div>
        </div>
      </section></div>
    </div></main></>);
}
