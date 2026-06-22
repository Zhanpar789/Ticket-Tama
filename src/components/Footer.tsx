import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface shadow-[inset_0px_1px_4px_rgba(12,12,13,0.05)] mt-[80px]">
      <div className="max-w-[1280px] mx-auto px-[90px] pt-[40px] pb-[30px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-[40px]">
          <div>
            <h3 className="font-heading font-bold text-[18px] leading-[23px] text-muted mb-4">
              TicketTama
            </h3>
            <p className="font-heading font-normal text-[14px] leading-[18px] text-muted max-w-[200px]">
              Cara termudah untuk menemukan dan membeli tiket event
              favoritmu. Digital, aman, dan instan.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-[14px] leading-[18px] text-muted mb-4">
              JELAJAHI
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/event?category=konser"
                  className="font-heading text-[14px] leading-[18px] text-muted hover:text-primary transition-colors"
                >
                  Konser
                </Link>
              </li>
              <li>
                <Link
                  href="/event?category=workshop"
                  className="font-heading text-[14px] leading-[18px] text-muted hover:text-primary transition-colors"
                >
                  Workshop
                </Link>
              </li>
              <li>
                <Link
                  href="/event?category=olahraga"
                  className="font-heading text-[14px] leading-[18px] text-muted hover:text-primary transition-colors"
                >
                  Olahraga
                </Link>
              </li>
              <li>
                <Link
                  href="/event?category=seni-teater"
                  className="font-heading text-[14px] leading-[18px] text-muted hover:text-primary transition-colors"
                >
                  Seni & Teater
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-[14px] leading-[18px] text-muted mb-4">
              BANTUAN
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/pusat-bantuan"
                  className="font-heading text-[14px] leading-[18px] text-muted hover:text-primary transition-colors"
                >
                  Pusat Bantuan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-[14px] leading-[18px] text-muted mb-4">
              IKUTI KAMI
            </h4>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Twitter"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742A13.84 13.84 0 0022 4.01z"
                    stroke="#B3B3B3"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
                    stroke="#B3B3B3"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="#B3B3B3"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="#B3B3B3"
                    strokeWidth="1.6"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="#B3B3B3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-[#D9D9D9] mb-[20px]" />

        <p className="font-heading font-normal text-[13px] leading-[16px] text-muted text-center">
          &copy; Copyright 2026 Tiket-Tama. All rights reserved
        </p>
      </div>
    </footer>
  );
}
