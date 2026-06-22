import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1100px] mx-auto px-[90px] pt-[85px] pb-[100px]">
        <div className="flex flex-col lg:flex-row gap-[80px] items-start">
          <div className="flex-1 max-w-[553px]">
            <div className="inline-flex items-center gap-2 bg-surface h-[32px] px-3 rounded-[4px] shadow-[inset_0px_4px_4px_-1px_rgba(12,12,13,0.05)] mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="font-heading font-medium text-[11px] leading-[32px] text-black">
                Hampir Habis: Jazz Festival 2026
              </span>
            </div>

            <h1 className="font-heading font-bold text-[40px] leading-[50px] text-black mb-6">
              Rasakan Pengalaman Event Terbaik Secara Langsung
            </h1>

            <p className="font-heading font-normal text-[18px] leading-[32px] text-muted mb-8">
              Temukan konser, workshop, dan event di sekitarmu. Amankan
              tiketmu sekarang dengan pemesanan instan dan tiket digital QR.
            </p>

            <button className="flex items-center justify-center w-[200px] h-[48px] bg-primary border border-primary rounded-lg shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)] font-body font-normal text-[16px] leading-[100%] text-[#F5F5F5] hover:bg-primary-dark transition-colors">
              Beli Tiket
            </button>
          </div>

          <div className="w-full lg:w-[500px] h-[309px] rounded-xl overflow-hidden shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)] relative">
            <Image
              src="/images/jazz-image.jpg"
              alt="Java Jazz Festival 2026"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="font-heading font-semibold text-[24px] leading-[30px] text-white">
                Java Jazz Festival 2026
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
