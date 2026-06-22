export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Pilih Event",
      description: "Jelajahi berbagai event pilihan dan tentukan event favoritmu.",
      color: "bg-primary",
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 11V6a2 2 0 00-2-2h0a2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2h0a2 2 0 00-2 2v6M10 10V6a2 2 0 00-2-2h0a2 2 0 00-2 2v8a8 8 0 0016 0v-3a2 2 0 00-2-2h0a2 2 0 00-2 2"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      number: 2,
      title: "Pembayaran Mudah",
      description:
        "Bayar dengan aman menggunakan QRIS, GoPay, OVO, atau e-wallet lainnya secara instan.",
      color: "bg-accent",
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="5"
            width="20"
            height="14"
            rx="3"
            stroke="white"
            strokeWidth="1.6"
          />
          <path d="M2 10h20" stroke="white" strokeWidth="1.6" />
          <path d="M6 15h4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: 3,
      title: "Dapatkan Tiket QR",
      description:
        "Terima tiket QR digital secara langsung tanpa perlu dicetak.",
      color: "bg-primary",
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
            stroke="white"
            strokeWidth="1.6"
          />
          <path d="M8 12h8M8 15h5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="9" r="1" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-surface py-[60px] mt-[80px]">
      <div className="max-w-[1100px] mx-auto px-[90px] text-center">
        <h2 className="font-heading font-bold text-[28px] leading-[35px] text-black mb-4">
          Cara Kerja
        </h2>
        <p className="font-heading font-normal text-[20px] leading-[25px] text-muted mb-[50px]">
          Dapatkan tiketmu dalam 3 langkah mudah
        </p>

        <div className="flex flex-col md:flex-row justify-center items-start gap-[60px]">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center w-[230px]">
              <div
                className={`w-[80px] h-[80px] rounded-full ${step.color} flex items-center justify-center mb-[16px]`}
              >
                {step.icon}
              </div>
              <h3 className="font-heading font-semibold text-[16px] leading-[20px] text-body mb-2">
                {step.number}. {step.title}
              </h3>
              <p className="font-heading font-normal text-[14px] leading-[18px] text-muted text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
