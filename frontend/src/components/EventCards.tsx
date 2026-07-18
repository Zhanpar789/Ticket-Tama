import Link from "next/link";

interface EventCardProps {
  title: string;
  category: string;
  date: string;
  location: string;
  price: string;
  image?: string; // TODO: Tambahkan path gambar di sini, contoh: "/images/festival-musik.jpg"
}

function EventCard({ title, category, date, location, price, image }: EventCardProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white border border-black/10 shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] hover:shadow-lg transition-shadow group cursor-pointer">
      <div className="relative w-full h-[190px] bg-[#D9D9D9] overflow-hidden">
        <div className="absolute top-3 left-3 bg-white rounded-xl px-2 py-1 z-10">
          <span className="font-body font-normal text-[12px] leading-[15px] text-body">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="font-heading font-bold text-[16px] leading-[20px] text-black mb-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 4H5a2 2 0 00-2 2v14l3-2h13a2 2 0 002-2V6a2 2 0 00-2-2z"
              stroke="#B3B3B3"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="font-body text-[14px] leading-[17px] text-muted">
            {date}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="#B3B3B3"
            />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
          <span className="font-body text-[14px] leading-[17px] text-muted">
            {location}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-body text-[16px] leading-[19px] text-body">
            {price}
          </span>
          <Link
            href="#"
            className="w-[28px] h-[28px] flex items-center justify-center rounded-full hover:bg-surface transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="#2C2C2C"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

const events: EventCardProps[] = [
  {
    title: "Festival Musik Jakarta",
    category: "Konser",
    date: "10 Januari 2026",
    location: "Stadion GBK",
    price: "Rp. 150.000",
    image: "/images/festival-musik.jpg", // TODO: Upload gambar ke folder public/images/
  },
  {
    title: "Half Marathon - PocariRun",
    category: "Olahraga",
    date: "29 Januari 2026 - 05.00",
    location: "Bandung",
    price: "Rp. 350.000",
    image: "/images/half-marathon.jpg", // TODO: Upload gambar ke folder public/images/
  },
  {
    title: "Pameran Kesenian IKJ",
    category: "Seni & Teater",
    date: "16 Januari 2026 - 10.00",
    location: "Jakarta",
    price: "Gratis",
    image: "/images/pameran-kesenian.jpg", // TODO: Upload gambar ke folder public/images/
  },
  {
    title: "Vibe Coding - Code with AI",
    category: "Workshop",
    date: "28 Februari 2026 - 13.00",
    location: "Online - Zoom",
    price: "Rp. 100.000",
    image: "/images/vibe-coding.jpg", // TODO: Upload gambar ke folder public/images/
  },
];

export default function EventCards() {
  return (
    <section className="max-w-[1100px] mx-auto px-[90px] mt-[60px]">
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </section>
  );
}
