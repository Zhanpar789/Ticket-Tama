"use client";

import { useState } from "react";

export default function Subscription() {
  const [email, setEmail] = useState("");

  return (
    <section className="max-w-[650px] mx-auto mt-[60px] px-[90px]">
      <div className="w-full bg-primary rounded-lg shadow-[0px_16px_16px_-8px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)] py-[40px] px-[40px] text-center">
        <h2 className="font-heading font-extrabold text-[28px] leading-[35px] text-[#F3F3F3] mb-4">
          Jangan Lewatkan Event Seru!
        </h2>
        <p className="font-heading font-normal text-[14px] leading-[18px] text-[#F5F5F5] mb-8 max-w-[372px] mx-auto">
          Berlangganan nawala kami dan jadi yang pertama tahu event terbaru
          serta promo tiket eksklusif.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-[472px] mx-auto">
          <div className="flex-1 w-full">
            <input
              type="email"
              placeholder="Masukan alamat email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[48px] px-4 bg-white rounded-xl font-heading text-[14px] leading-[18px] text-[#444444] placeholder:text-[#444444] outline-none shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)]"
            />
          </div>
          <button className="w-full sm:w-[136px] h-[48px] bg-accent rounded-lg shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)] font-body font-normal text-[16px] leading-[100%] text-[#F5F5F5] hover:opacity-90 transition-opacity">
            Langganan
          </button>
        </div>
      </div>
    </section>
  );
}
