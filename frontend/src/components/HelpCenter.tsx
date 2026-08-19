"use client";

import { useState } from "react";

const categories = [
  { title: "Pembelian & Pengiriman", lines: ["Di Mana Tiket Saya?", "Panduan Tiket Digital"], type: "ticket", color: "primary" },
  { title: "Pengembalian & Pembatalan", lines: ["Kebijakan acara dibatalkan", "Cara mengajukan pengembalian dana"], type: "refresh", color: "green" },
  { title: "Akun Saya", lines: ["Perbarui profile", "Ubah kata sandi"], type: "user", color: "purple" },
  { title: "Harga Tiket", lines: ["Biaya pajak dan layanan", "Perubahan harga tiket"], type: "tag", color: "orange" },
  { title: "Masalah Pelayanan", lines: ["Metode pembayaran", "Kendala transaksi"], type: "card", color: "red" },
  { title: "Status Acara", lines: ["Perubahan lokasi", "Pembaruan jadwal"], type: "calendar", color: "teal" },
];

function CategoryIcon({ type }: { type: string }) {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "ticket") return <svg {...props}><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 010 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 010-4V8z" /><path d="M9 8v8" /></svg>;
  if (type === "refresh") return <svg {...props}><path d="M20 11a8 8 0 00-15-3l-2 3m1-7v4h4M4 13a8 8 0 0015 3l2-3m-1 7v-4h-4" /></svg>;
  if (type === "user") return <svg {...props}><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0114 0M18 11v4M16 13h4" /></svg>;
  if (type === "tag") return <svg {...props}><path d="M20 13l-7 7-10-10V4h6z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg>;
  if (type === "card") return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></svg>;
  return <svg {...props}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16M9 14h.01M15 14h.01M9 17h.01M15 17h.01" /></svg>;
}

function ContactIcon({ type }: { type: "email" | "phone" }) {
  if (type === "email") return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .8 2.9a2 2 0 01-.4 2.1L8.2 10a16 16 0 005.8 5.8l1.3-1.3a2 2 0 012.1-.4c.9.4 1.9.7 2.9.8a2 2 0 011.7 2z" /></svg>;
}

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const filteredCategories = submittedQuery
    ? categories.filter((category) => `${category.title} ${category.lines.join(" ")}`.toLowerCase().includes(submittedQuery.toLowerCase()))
    : categories;

  return (
    <>
      <main className="w-full overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] px-6 pt-4 md:px-[90px] md:pt-[15px]">
          <p className="font-body text-[14px] leading-[20px] text-muted">Pusat Bantuan</p>

          <section className="mt-5 rounded-[18px] bg-primary px-5 py-8 text-center shadow-[0px_16px_25px_rgba(12,12,13,0.14)] md:mt-5 md:px-12 md:py-[30px]">
            <h1 className="font-heading text-[30px] font-bold leading-[38px] text-white md:text-[40px] md:leading-[50px]">Halo, Ada Yang Bisa Kami Bantu?</h1>
            <p className="mt-3 font-body text-[16px] leading-[24px] text-white md:text-[18px] md:leading-[26px]">Temukan Jawaban Seputar Tiket, Pembayaran, Dan Pengelolaan Akun Anda.</p>
            <form onSubmit={(event) => { event.preventDefault(); setSubmittedQuery(query.trim()); }} className="mx-auto mt-10 flex h-[56px] max-w-[626px] rounded-[14px] bg-white p-2 text-left">
              <label className="flex min-w-0 flex-1 items-center gap-3 pl-3">
                <span className="sr-only">Cari bantuan</span>
                <svg className="shrink-0 text-border" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Bantuan Tentang Tiket Anda ...." className="min-w-0 flex-1 bg-transparent font-body text-[16px] text-body outline-none placeholder:text-border" />
              </label>
              <button type="submit" className="h-full rounded-lg bg-accent px-6 font-heading text-[14px] font-bold text-white shadow-[0px_2px_3px_rgba(12,12,13,0.16)] transition-opacity hover:opacity-90">Cari</button>
            </form>
          </section>

          <section className="py-10 md:py-[40px]">
            <h2 className="font-heading text-[20px] font-bold leading-[25px] text-black">Jelajahi Berdasarkan Kategori</h2>
            <div className="mt-8 grid grid-cols-1 gap-x-[112px] gap-y-[42px] sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <button key={category.title} type="button" className="min-h-[171px] rounded-lg border border-border bg-white p-4 text-left shadow-[0px_2px_3px_rgba(12,12,13,0.12)] transition-shadow hover:shadow-[0px_6px_12px_rgba(12,12,13,0.16)]">
                  <span className={`flex h-[40px] w-[40px] items-center justify-center rounded-lg ${category.color === "primary" ? "bg-primary/10 text-primary" : category.color === "green" ? "bg-emerald-50 text-emerald-500" : category.color === "purple" ? "bg-purple-50 text-purple-500" : category.color === "orange" ? "bg-orange-50 text-orange-500" : category.color === "red" ? "bg-red-50 text-red-600" : "bg-teal-50 text-teal-600"}`}><CategoryIcon type={category.type} /></span>
                  <span className="mt-3 block font-heading text-[18px] font-bold leading-[23px] text-black">{category.title}</span>
                  <span className="mt-4 block font-body text-[14px] leading-[18px] text-muted">{category.lines.map((line) => <span key={line} className="block">{line}</span>)}</span>
                </button>
              ))}
            </div>
            {filteredCategories.length === 0 && <p className="mt-8 text-center font-body text-[14px] text-muted">Kategori bantuan tidak ditemukan.</p>}
          </section>
        </div>

        <section className="border-t border-border/70 bg-surface px-6 py-10 md:px-[90px] md:py-[42px]">
          <div className="mx-auto max-w-[1100px] text-center">
            <h2 className="font-heading text-[30px] font-bold leading-[38px] text-black md:text-[32px] md:leading-[40px]">Masih Butuh Bantuan?</h2>
            <p className="mt-3 font-heading text-[17px] font-semibold leading-[22px] text-muted">Tim dukungan kami siap membantu Anda 24/7.</p>
            <div className="mt-7 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-[92px]">
              <article className="flex min-h-[320px] flex-col items-center rounded-[18px] border border-border/30 bg-white px-8 py-8 shadow-[0px_2px_5px_rgba(12,12,13,0.12)]">
                <span className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-primary text-white shadow-[0px_3px_5px_rgba(12,12,13,0.18)]"><ContactIcon type="email" /></span>
                <p className="mt-6 max-w-[390px] font-body text-[16px] leading-[20px] text-muted">Kirimkan detail permasalahan Anda dan kami akan merespons dalam 24 jam.</p>
                <a href="mailto:bantuan@tickettama.com" className="mt-auto flex h-[62px] w-[200px] items-center justify-center rounded-lg bg-primary font-heading text-[17px] font-bold text-white shadow-[0px_3px_4px_rgba(12,12,13,0.2)] transition-opacity hover:opacity-90">Kirim Email</a>
              </article>
              <article className="flex min-h-[320px] flex-col items-center rounded-[18px] border border-border/30 bg-white px-8 py-8 shadow-[0px_2px_5px_rgba(12,12,13,0.12)]">
                <span className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-accent text-white shadow-[0px_3px_5px_rgba(12,12,13,0.18)]"><ContactIcon type="phone" /></span>
                <p className="mt-6 max-w-[390px] font-body text-[16px] leading-[20px] text-muted">Tersedia untuk masalah mendesak.<br />Senin-Jumat, pukul 09.00-18.00 (WIB).</p>
                <a href="tel:0221234567" className="mt-auto flex h-[62px] w-[200px] items-center justify-center rounded-lg bg-accent font-heading text-[17px] font-bold text-white shadow-[0px_3px_4px_rgba(12,12,13,0.2)] transition-opacity hover:opacity-90">022-123-4567</a>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
