"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import Avatar from "@/components/Avatar";
import Navbar from "@/components/Navbar";
import PhoneInput from "@/components/PhoneInput";
import ProfileSidebar from "@/components/ProfileSidebar";
import Toast from "@/components/Toast";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/hooks/useAuth";
import { Country } from "@/lib/countries";
import { ProfileData, defaultProfile, profileStorage, readFileAsDataURL } from "@/lib/profile";

function IconTicketStats() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#DBE7FB" />
      <path
        d="M14 17a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H16a2 2 0 01-2-2v-2a2 2 0 100-4v-2z"
        fill="#2663EB"
      />
      <path d="M22 17v14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendarStats() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#DBE7FB" />
      <rect
        x="13"
        y="16"
        width="22"
        height="18"
        rx="3"
        stroke="#2663EB"
        strokeWidth="2.4"
      />
      <path
        d="M19 14v4M29 14v4M13 23h22"
        stroke="#2663EB"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWalletStats() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#DBE7FB" />
      <rect
        x="12"
        y="17"
        width="24"
        height="16"
        rx="3"
        stroke="#2663EB"
        strokeWidth="2.4"
      />
      <path
        d="M28 25h4"
        stroke="#2663EB"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white border border-[#E5E5E5]">
      <div className="flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="font-heading font-normal text-[14px] leading-[18px] text-dark">
          {label}
        </p>
        <p className="font-heading font-bold text-[18px] md:text-[20px] leading-[25px] text-dark truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={<IconTicketStats />}
        label="Total Ticket"
        value="-"
      />
      <StatCard
        icon={<IconCalendarStats />}
        label="Event Dihadiri"
        value="-"
      />
      <StatCard
        icon={<IconWalletStats />}
        label="Total Pembelian"
        value="-"
      />
    </div>
  );
}

function Label({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="font-heading font-bold text-[14px] leading-[18px] text-dark">
      {children}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
  );
}

function inputClass(hasError?: boolean) {
  return `w-full h-[44px] px-4 rounded-lg border bg-white font-body text-[14px] leading-[18px] text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors ${
    hasError ? "border-red-500" : "border-border"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-body text-[12px] leading-[16px] text-red-600 mt-1">
      {message}
    </p>
  );
}

type Errors = Partial<Record<keyof ProfileData, string>>;

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { profile, isHydrated: isProfileHydrated } = useProfile();

  const [form, setForm] = useState<ProfileData>(defaultProfile);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.sessionStorage.getItem("tt_profile_saved");
    if (flag === "1") {
      window.sessionStorage.removeItem("tt_profile_saved");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuccess(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isProfileHydrated || hasInitialized) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(profile);
    setHasInitialized(true);
  }, [isProfileHydrated, profile, hasInitialized]);

  const setField = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSuccess(false);
  };

  const handleFotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, foto: "File harus berupa gambar" }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, foto: "Ukuran foto maksimal 2MB" }));
      return;
    }
    try {
      const dataUrl = await readFileAsDataURL(file);
      setForm((prev) => ({ ...prev, foto: dataUrl }));
      setErrors((prev) => ({ ...prev, foto: undefined }));
      setSuccess(false);
    } catch {
      setErrors((prev) => ({ ...prev, foto: "Gagal membaca foto" }));
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleHapusFoto = () => {
    setForm((prev) => ({ ...prev, foto: null }));
    setErrors((prev) => ({ ...prev, foto: undefined }));
    setSuccess(false);
  };

  const handleWhatsappToggle = (checked: boolean) => {
    setField("whatsapp_sama_dengan_telepon", checked);
    if (checked) {
      setField("nomor_whatsapp", form.nomor_telepon);
      setField("country_code_whatsapp", form.country_code_telepon);
    }
  };

  const handleCountryTeleponChange = (c: Country) => {
    setField("country_code_telepon", c.code);
    if (form.whatsapp_sama_dengan_telepon) {
      setField("country_code_whatsapp", c.code);
    }
  };

  const handleCountryWhatsappChange = (c: Country) => {
    setField("country_code_whatsapp", c.code);
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.nama_lengkap.trim()) {
      next.nama_lengkap = "Nama lengkap wajib diisi";
    }
    if (!form.email.trim()) {
      next.email = "Alamat email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Format email tidak valid";
    }
    if (!form.nomor_telepon.trim()) {
      next.nomor_telepon = "Nomor telepon wajib diisi";
    }
    if (!form.alamat_lengkap.trim()) {
      next.alamat_lengkap = "Alamat lengkap wajib diisi";
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      setSuccess(false);
      return;
    }
    setIsSaving(true);
    const payload: ProfileData = {
      ...form,
      nama_lengkap: form.nama_lengkap.trim(),
      email: form.email.trim(),
      nomor_telepon: form.nomor_telepon.trim(),
      nomor_whatsapp: form.whatsapp_sama_dengan_telepon
        ? form.nomor_telepon.trim()
        : form.nomor_whatsapp.trim(),
      alamat_lengkap: form.alamat_lengkap.trim(),
    };
    setTimeout(() => {
      const ok = profileStorage.set(payload, user!.id);
      if (!ok) {
        setIsSaving(false);
        setErrors({
          foto: "Gagal menyimpan foto. Coba foto dengan ukuran lebih kecil.",
        });
        return;
      }
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("tt_profile_saved", "1");
        window.location.reload();
      }
    }, 400);
  };

  if (isLoading || !user || !isProfileHydrated || !hasInitialized) {
    return (
      <>
        <Navbar />
        <main className="flex-1 w-full bg-[#F1F1F1]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-[90px] py-10 flex items-center justify-center">
            <p className="font-body text-muted text-[16px]">Memuat...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Toast
        show={success}
        onClose={() => setSuccess(false)}
        message="Data berhasil disimpan"
      />
      <main className="flex-1 w-full bg-[#F1F1F1]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-[90px] py-6 md:py-8">
          <nav
            aria-label="Breadcrumb"
            className="font-body text-[14px] leading-[18px] text-muted mb-6"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Profil
            </Link>
            <span className="mx-2 text-muted/60">›</span>
            <span className="text-primary font-bold">Profil Saya</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6">
            <ProfileSidebar active="profil" />

            <section className="flex-1 min-w-0">
              <header className="mb-6">
                <h1 className="font-heading font-bold text-[28px] md:text-[36px] leading-[40px] md:leading-[45px] text-dark">
                  Pengaturan Akun
                </h1>
                <p className="font-body text-[15px] leading-[20px] text-muted mt-2">
                  Kelola informasi pribadi dan preferensi Anda.
                </p>
              </header>

              <div className="mb-6">
                <StatsRow />
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#E5E5E5] p-5 md:p-8"
                noValidate
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <Avatar
                      src={form.foto}
                      name={profile.nama_lengkap || user.nama_lengkap}
                      size={80}
                      textClass="text-[28px]"
                    />

                    <div className="min-w-0">
                      <p className="font-heading font-bold text-[18px] md:text-[20px] leading-[25px] text-dark truncate">
                        {profile.nama_lengkap || user.nama_lengkap}
                      </p>
                      <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 font-body font-bold text-[13px] leading-[18px] text-primary hover:underline"
                        >
                          <IconEdit />
                          Ubah Foto
                        </button>
                        <button
                          type="button"
                          onClick={handleHapusFoto}
                          disabled={!form.foto}
                          className="flex items-center gap-1.5 font-body font-bold text-[13px] leading-[18px] text-red-600 hover:underline disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
                        >
                          <IconTrash />
                          Hapus Foto
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFotoChange}
                        />
                      </div>
                      <FieldError message={errors.foto} />
                    </div>
                  </div>

                  <div className="sm:ml-auto flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      disabled
                      title="Segera hadir"
                      className="h-[40px] px-4 rounded-lg border border-border bg-white font-body font-bold text-[13px] leading-[18px] text-dark opacity-60 cursor-not-allowed"
                    >
                      Ubah Kata Sandi
                    </button>
                    <span className="inline-flex items-center gap-1.5 h-[40px] px-3 rounded-lg bg-red-50 border border-red-200 font-body font-bold text-[12px] leading-[16px] text-red-700">
                      <span className="text-red-600">
                        <IconClose />
                      </span>
                      Email Belum Diverifikasi
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pt-6">
                  <div className="flex flex-col gap-2">
                    <Label required>Nama Lengkap</Label>
                    <input
                      type="text"
                      value={form.nama_lengkap}
                      onChange={(e) => setField("nama_lengkap", e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className={inputClass(!!errors.nama_lengkap)}
                    />
                    <FieldError message={errors.nama_lengkap} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label required>Alamat Email</Label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="nama@email.com"
                      className={inputClass(!!errors.email)}
                    />
                    <FieldError message={errors.email} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label required>Nomor Telepon</Label>
                    <PhoneInput
                      value={form.nomor_telepon}
                      onChange={(v) => {
                        setField("nomor_telepon", v);
                        if (form.whatsapp_sama_dengan_telepon) {
                          setField("nomor_whatsapp", v);
                        }
                      }}
                      countryCode={form.country_code_telepon}
                      onCountryChange={handleCountryTeleponChange}
                      hasError={!!errors.nomor_telepon}
                    />
                    <FieldError message={errors.nomor_telepon} />
                    <p className="font-body text-[12px] leading-[16px] text-muted">
                      Pastikan nomor ini sesuai dengan akun e-wallet yang
                      terhubung untuk kelancaran pencairan dana.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Nomor Whatsapp</Label>
                    <PhoneInput
                      value={
                        form.whatsapp_sama_dengan_telepon
                          ? form.nomor_telepon
                          : form.nomor_whatsapp
                      }
                      onChange={(v) => setField("nomor_whatsapp", v)}
                      countryCode={
                        form.whatsapp_sama_dengan_telepon
                          ? form.country_code_telepon
                          : form.country_code_whatsapp
                      }
                      onCountryChange={handleCountryWhatsappChange}
                      hasError={!!errors.nomor_whatsapp}
                    />
                    <FieldError message={errors.nomor_whatsapp} />
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                      <span
                        className={`relative w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${
                          form.whatsapp_sama_dengan_telepon
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-border"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.whatsapp_sama_dengan_telepon}
                          onChange={(e) =>
                            handleWhatsappToggle(e.target.checked)
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {form.whatsapp_sama_dengan_telepon && <IconCheck />}
                      </span>
                      <span className="font-body text-[13px] leading-[18px] text-dark">
                        Nomor WhatsApp sama dengan nomor telepon
                      </span>
                    </label>
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <Label required>Alamat Lengkap</Label>
                    <textarea
                      value={form.alamat_lengkap}
                      onChange={(e) =>
                        setField("alamat_lengkap", e.target.value)
                      }
                      placeholder="Masukkan alamat lengkap Anda"
                      rows={4}
                      className={`${inputClass(!!errors.alamat_lengkap)} h-auto py-3 resize-y`}
                    />
                    <FieldError message={errors.alamat_lengkap} />
                  </div>
                </div>

                <div className="flex justify-end items-center gap-3 mt-8 pt-6 border-t border-[#E5E5E5]">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="h-[44px] px-6 rounded-lg bg-primary border border-primary-dark font-body font-bold text-[14px] leading-[18px] text-white hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
