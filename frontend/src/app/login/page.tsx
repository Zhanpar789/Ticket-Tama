"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { ApiClientError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Alamat email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Kata sandi wajib diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Kata sandi minimal 8 karakter";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      router.push("/");
    } catch (err) {
      if (err instanceof ApiClientError) {
        setSubmitError(err.message);
      } else {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        setSubmitError(
          `Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:8080 (${message})`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white">
        <div className="max-w-[1280px] mx-auto px-[90px] py-[66px]">
          <div className="flex flex-col lg:flex-row gap-[80px] items-center">
            <div className="flex-1 max-w-[421px]">
              <h1 className="font-heading font-bold text-[40px] leading-[50px] text-black mb-4">
                Selamat Datang
              </h1>

              <p className="font-heading font-normal text-[16px] leading-[20px] text-muted mb-8">
                Masuk untuk mengelola tiket dan pembayaran Anda
              </p>

              <p className="font-heading font-normal text-[14px] leading-[18px] text-black mb-8">
                Belum punya akun? Silahkan{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline"
                >
                  Daftar
                </Link>
              </p>

              {submitError && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 font-body text-[14px] text-red-600">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-heading font-bold text-[15px] leading-[19px] text-black">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contoh@email.com"
                    disabled={isSubmitting}
                    className={`w-full h-[40px] px-4 bg-white border rounded-lg font-body font-normal text-[16px] leading-[100%] placeholder:text-icon outline-none transition-colors disabled:opacity-60 ${
                      errors.email
                        ? "border-red-500"
                        : "border-[#D9D9D9] focus:border-primary"
                    }`}
                  />
                  {errors.email && (
                    <p className="font-body font-normal text-[14px] text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-heading font-bold text-[15px] leading-[19px] text-black">
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Masukkan Kata Sandi"
                      disabled={isSubmitting}
                      className={`w-full h-[40px] px-4 pr-12 bg-white border rounded-lg font-body font-normal text-[16px] leading-[100%] placeholder:text-icon outline-none transition-colors disabled:opacity-60 ${
                        errors.password
                          ? "border-red-500"
                          : "border-[#D9D9D9] focus:border-primary"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E1E1E] disabled:opacity-60"
                      aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    >
                      {showPassword ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            stroke="#1E1E1E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#1E1E1E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                            stroke="#1E1E1E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <line
                            x1="1"
                            y1="1"
                            x2="23"
                            y2="23"
                            stroke="#1E1E1E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="font-body font-normal text-[14px] text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[40px] bg-primary border border-[#D1D1D6] rounded-lg font-body font-bold text-[16px] leading-[100%] text-[#F5F5F5] hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Memproses..." : "Masuk Sekarang"}
                </button>

                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-[#D9D9D9]" />
                  <span className="font-heading font-bold text-[13px] leading-[16px] text-muted">
                    Atau masuk dengan
                  </span>
                  <div className="flex-1 h-px bg-[#D9D9D9]" />
                </div>

                <button
                  type="button"
                  disabled
                  className="w-full h-[40px] bg-[#F5F5F5] border border-[#D1D1D6] rounded-lg font-body font-bold text-[16px] leading-[100%] text-black flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
              </form>
            </div>

            <div className="hidden lg:block w-[570px] h-[380px] rounded-lg overflow-hidden shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)] relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=570&h=380&fit=crop"
                alt="Konser musik"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
