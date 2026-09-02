import Link from "next/link";

import { Event } from "@/lib/events";

function IconCalendar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M19 4H5a2 2 0 00-2 2v14l3-2h13a2 2 0 002-2V6a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

function IconArrow() {
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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-muted"
    >
      <path
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/event/${event.id}`}
      className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative w-full aspect-[16/10] bg-[#D9D9D9] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${event.image})` }}
          aria-hidden="true"
        />
        <div className="absolute top-3 left-3 bg-white rounded-xl px-2 py-1 z-10">
          <span className="font-body font-normal text-[12px] leading-[15px] text-body">
            {event.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-white p-4">
        <h3 className="min-h-[40px] mb-2 font-heading font-bold text-[16px] leading-[20px] text-black line-clamp-2">
          {event.title}
        </h3>

        <div className="flex min-h-[34px] items-center gap-2 mb-1 text-muted">
          <IconCalendar />
          <span className="font-body text-[14px] leading-[17px]">{event.date}</span>
        </div>

        <div className="flex min-h-[34px] items-center gap-2 mb-3 text-muted">
          <IconPin />
          <span className="font-body text-[14px] leading-[17px]">{event.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-body text-[16px] leading-[19px] text-body font-bold">
            {event.priceLabel}
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full text-dark group-hover:bg-primary group-hover:text-white transition-colors">
            <IconArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

type EventCardsProps = {
  events: Event[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onReset?: () => void;
  resetLabel?: string;
};

export default function EventCards({
  events,
  title = "Event Populer",
  subtitle,
  showViewAll = true,
  emptyTitle = "Event tidak ditemukan",
  emptyDescription = "Coba ubah kata kunci atau pilih kategori lain.",
  onReset,
  resetLabel = "Reset Pencarian",
}: EventCardsProps) {
  const isEmpty = events.length === 0;

  return (
    <section className="max-w-[1100px] mx-auto px-6 md:px-[90px] mt-[60px]">
      <div className="flex items-start justify-between gap-4 mb-[40px]">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading font-bold text-[28px] leading-[35px] text-black">
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-[14px] leading-[20px] text-muted">{subtitle}</p>
          )}
        </div>
        {showViewAll && !isEmpty && (
          <Link
            href="/event"
            className="flex items-center gap-2 h-[40px] px-5 bg-primary border border-primary rounded-lg text-white shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] hover:bg-primary-dark transition-colors flex-shrink-0"
          >
            <span className="font-body font-normal text-[14px] leading-[140%] text-white">
              Lihat semua
            </span>
            <IconArrow />
          </Link>
        )}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 h-[40px] px-5 bg-white border border-border rounded-lg text-body font-body text-[14px] leading-[140%] hover:border-primary hover:text-primary transition-colors flex-shrink-0"
          >
            {resetLabel}
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-border rounded-2xl bg-surface">
          <IconSearch />
          <h3 className="mt-4 font-heading font-bold text-[18px] leading-[24px] text-body">
            {emptyTitle}
          </h3>
          <p className="mt-2 font-body text-[14px] leading-[20px] text-muted max-w-md">
            {emptyDescription}
          </p>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="mt-6 flex items-center gap-2 h-[44px] px-6 bg-primary border border-primary rounded-lg text-white font-body text-[14px] leading-[140%] hover:bg-primary-dark transition-colors"
            >
              {resetLabel}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
