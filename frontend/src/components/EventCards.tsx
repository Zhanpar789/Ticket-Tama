import Link from "next/link";

import { EVENTS, Event } from "@/lib/events";

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

function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/event/${event.id}`}
      className="block w-full rounded-lg overflow-hidden bg-white border border-black/10 shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
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

      <div className="p-4 bg-white">
        <h3 className="font-heading font-bold text-[16px] leading-[20px] text-black mb-2 line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 mb-1 text-muted">
          <IconCalendar />
          <span className="font-body text-[14px] leading-[17px]">{event.date}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-muted">
          <IconPin />
          <span className="font-body text-[14px] leading-[17px]">{event.location}</span>
        </div>

        <div className="flex items-center justify-between">
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

export default function EventCards() {
  const popular = EVENTS.slice(0, 4);

  return (
    <section className="max-w-[1100px] mx-auto px-6 md:px-[90px] mt-[60px]">
      <div className="flex items-center justify-between mb-[40px]">
        <h2 className="font-heading font-bold text-[28px] leading-[35px] text-black">
          Event Populer
        </h2>
        <Link
          href="/event"
          className="flex items-center gap-2 h-[40px] px-5 bg-primary border border-primary rounded-lg shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] hover:bg-primary-dark transition-colors"
        >
          <span className="font-body font-normal text-[14px] leading-[140%] text-white">
            Lihat semua
          </span>
          <IconArrow />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {popular.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
