"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import { getEventById } from "@/lib/events";

function IconCalendar() {
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
        d="M19 4H5a2 2 0 00-2 2v14l3-2h13a2 2 0 002-2V6a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
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
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="9"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight() {
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <polyline
        points="6 9 12 15 18 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="18"
        cy="5"
        r="3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="6"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="18"
        cy="19"
        r="3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMinus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const id = typeof params.id === "string" ? params.id : "";
  const event = getEventById(id);

  const [quantity, setQuantity] = useState(0);
  const [openSection, setOpenSection] = useState<"age" | "refund" | null>("age");
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  if (!event) {
    notFound();
  }

  const handleBuy = () => {
    if (quantity === 0) {
      setToast({ show: true, message: "Pilih jumlah tiket terlebih dahulu" });
      return;
    }
    setToast({
      show: true,
      message: `Membeli ${quantity} tiket ${event.title} (${event.priceLabel})`,
    });
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.clipboard && url) {
        await navigator.clipboard.writeText(url);
        setToast({ show: true, message: "Link event disalin ke clipboard" });
      } else {
        setToast({ show: true, message: "Browser tidak mendukung fitur salin link" });
      }
    } catch {
      setToast({ show: true, message: "Gagal menyalin link" });
    }
  };

  return (
    <>
      <Navbar />
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
      <main className="flex-1 w-full bg-white">
        <section className="max-w-[1100px] mx-auto px-6 md:px-[90px] pt-6 md:pt-8">
          <div className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden bg-[#1A1A1A]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="font-heading font-bold text-[28px] md:text-[40px] leading-[110%] text-white">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <InfoBox icon={<IconCalendar />} label={event.date} />
            <InfoBox icon={<IconClock />} label={event.time} />
            <InfoBox icon={<IconPin />} label={event.location} />
          </div>

          <div className="w-full h-px bg-border my-8 md:my-10" />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pb-10">
            <div className="flex-1 min-w-0">
              <Section title="Tentang Event Ini">
                {event.description.split("\n\n").map((para, idx) => (
                  <p
                    key={idx}
                    className="font-body text-[15px] md:text-[16px] leading-[26px] text-body mb-4 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </Section>

              <Section title="Sorotan Penampil/Artis">
                <ul className="list-disc pl-5 space-y-2">
                  {event.lineup.map((item) => (
                    <li
                      key={item}
                      className="font-body text-[15px] md:text-[16px] leading-[26px] text-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Syarat & Ketentuan">
                <Accordion
                  title="Batasan Usia"
                  open={openSection === "age"}
                  onToggle={() =>
                    setOpenSection((prev) => (prev === "age" ? null : "age"))
                  }
                >
                  <p className="font-body text-[14px] md:text-[15px] leading-[24px] text-body">
                    {event.terms}
                  </p>
                </Accordion>
                <Accordion
                  title="Kebijakan Pengembalian Dana"
                  open={openSection === "refund"}
                  onToggle={() =>
                    setOpenSection((prev) => (prev === "refund" ? null : "refund"))
                  }
                >
                  <p className="font-body text-[14px] md:text-[15px] leading-[24px] text-body">
                    {event.refundPolicy}
                  </p>
                </Accordion>
              </Section>
            </div>

            <aside className="w-full lg:w-[360px] flex-shrink-0 space-y-4">
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-5">
                <h3 className="font-heading font-bold text-[16px] leading-[20px] text-dark">
                  Pesan Sekarang
                </h3>

                <div className="flex items-start justify-between gap-3 mt-4">
                  <p className="font-heading font-bold text-[14px] leading-[18px] text-dark">
                    {event.title}
                  </p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 font-body font-bold text-[11px] leading-[14px] text-emerald-700">
                    Tersedia
                  </span>
                </div>

                <p className="font-heading font-bold text-[28px] leading-[35px] text-primary mt-3">
                  {event.priceLabel}
                </p>

                <div className="w-full h-px bg-border my-4" />

                <div className="flex items-center justify-between">
                  <span className="font-body text-[14px] leading-[18px] text-body">
                    Maks. {event.maxTickets} Tiket
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                      disabled={quantity === 0}
                      aria-label="Kurangi jumlah"
                      className="w-[28px] h-[28px] flex items-center justify-center rounded-md border border-border text-dark hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <IconMinus />
                    </button>
                    <span className="font-body font-bold text-[16px] leading-[20px] text-dark min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((q) => Math.min(event.maxTickets, q + 1))
                      }
                      disabled={quantity >= event.maxTickets}
                      aria-label="Tambah jumlah"
                      className="w-[28px] h-[28px] flex items-center justify-center rounded-md border border-border text-dark hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <IconPlus />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBuy}
                  className="w-full h-[44px] mt-5 flex items-center justify-center gap-2 rounded-lg bg-primary border border-primary-dark font-body font-bold text-[14px] leading-[18px] text-white hover:bg-primary-dark transition-colors"
                >
                  Beli Tiket
                  <IconArrowRight />
                </button>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="w-full h-[44px] flex items-center justify-center gap-2 rounded-lg border border-border bg-white font-body font-bold text-[14px] leading-[18px] text-dark hover:bg-surface transition-colors"
              >
                <IconShare />
                Bagikan Event
              </button>
            </aside>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-[90px] pb-12 md:pb-16">
          <div className="w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden border border-border bg-surface">
            <iframe
              title={`Peta lokasi ${event.location}`}
              src={event.mapEmbed}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoBox({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white">
      <span className="text-muted flex-shrink-0">{icon}</span>
      <span className="font-body text-[14px] md:text-[15px] leading-[20px] text-dark">
        {label}
      </span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 md:mb-10 last:mb-0">
      <h2 className="font-heading font-bold text-[18px] md:text-[20px] leading-[25px] text-dark mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-xl mb-3 last:mb-0 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 px-4 md:px-5 py-3 md:py-4 text-left hover:bg-surface transition-colors"
      >
        <span className="font-heading font-bold text-[14px] md:text-[15px] leading-[20px] text-dark">
          {title}
        </span>
        <span
          className={`text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <IconChevronDown />
        </span>
      </button>
      {open && <div className="px-4 md:px-5 pb-4 md:pb-5">{children}</div>}
    </div>
  );
}
