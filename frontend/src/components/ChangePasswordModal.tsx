"use client";

import { FormEvent, RefObject, useEffect, useRef, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { ApiClientError } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

function IconEye() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      width="16"
      height="16"
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

function IconCircleCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#10B981" />
      <polyline
        points="8 12 11 15 16 9"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCircleX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#DC2626" />
      <line
        x1="9"
        y1="9"
        x2="15"
        y2="15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="15"
        y1="9"
        x2="9"
        y2="15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PasswordField({
  id,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  inputRef,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder: string;
  autoComplete?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className={`flex h-[44px] rounded-lg border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 transition-colors ${
          error ? "border-red-500" : "border-border"
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 h-full px-4 font-body text-[14px] leading-[18px] text-dark placeholder:text-muted focus:outline-none bg-white"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          tabIndex={-1}
          className="px-3 text-muted hover:text-dark transition-colors flex items-center justify-center"
        >
          {show ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
      {error && (
        <p className="font-body text-[12px] leading-[16px] text-red-600">
          {error}
        </p>
      )}
    </>
  );
}

function passwordRules(pw: string) {
  return {
    minLength: pw.length >= 8,
    hasUpperLower: /[a-z]/.test(pw) && /[A-Z]/.test(pw),
    hasNumberSpec: /\d/.test(pw) || /[^A-Za-z0-9]/.test(pw),
  };
}

function RuleRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      {ok ? <IconCircleCheck /> : <IconCircleX />}
      <span className="font-body text-[14px] leading-[20px] text-dark">
        {label}
      </span>
    </div>
  );
}

type Errors = {
  current?: string;
  next?: string;
  confirm?: string;
  form?: string;
};

export default function ChangePasswordModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const { changePassword } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSaving, setIsSaving] = useState(false);

  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent("");
      setNext("");
      setConfirm("");
      setErrors({});
      setIsSaving(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && firstFieldRef.current) {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSaving) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, isSaving, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const rules = passwordRules(next);
  const allRulesMet =
    rules.minLength && rules.hasUpperLower && rules.hasNumberSpec;

  const validate = (): boolean => {
    const next_errors: Errors = {};
    if (!current) {
      next_errors.current = "Wajib mengisi kata sandi saat ini";
    }
    if (!next) {
      next_errors.next = "Silakan masukkan kata sandi baru Anda";
    } else if (!allRulesMet) {
      next_errors.next = "Kata sandi baru tidak memenuhi syarat";
    }
    if (!confirm) {
      next_errors.confirm = "Silakan ulangi kata sandi baru Anda";
    } else if (confirm !== next) {
      next_errors.confirm = "Konfirmasi kata sandi tidak cocok";
    }
    setErrors(next_errors);
    return Object.values(next_errors).every((v) => !v);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSaving(true);
    setErrors((prev) => ({ ...prev, form: undefined }));
    try {
      await changePassword(current, next);
      onSuccess();
      onClose();
    } catch (err) {
      if (err instanceof ApiClientError) {
        const msg = err.message.toLowerCase();
        if (
          err.status === 400 &&
          (msg.includes("lama") || msg.includes("sama dengan"))
        ) {
          setErrors({ current: err.message });
        } else {
          setErrors({ form: err.message });
        }
      } else {
        setErrors({ form: "Gagal mengubah kata sandi. Coba lagi." });
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSaving) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-start sm:items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        className="w-full max-w-[560px] bg-white rounded-2xl shadow-[0px_20px_50px_rgba(0,0,0,0.15)] p-6 md:p-8 my-4 sm:my-8"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2
            id="change-password-title"
            className="font-heading font-bold text-[26px] md:text-[28px] leading-[35px] text-dark"
          >
            Ubah Kata Sandi
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Tutup"
            className="w-[32px] h-[32px] flex items-center justify-center rounded-md text-muted hover:text-dark hover:bg-surface transition-colors disabled:opacity-50"
          >
            <IconClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="current_password"
                className="font-heading font-bold text-[14px] leading-[18px] text-dark"
              >
                Kata Sandi Lama
                <span className="text-red-600 ml-1">*</span>
              </label>
              <PasswordField
                id="current_password"
                inputRef={firstFieldRef}
                value={current}
                onChange={(v) => {
                  setCurrent(v);
                  setErrors((p) => ({ ...p, current: undefined, form: undefined }));
                }}
                error={errors.current}
                placeholder="Masukkan Kata Sandi Lama"
                autoComplete="current-password"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="new_password"
                className="font-heading font-bold text-[14px] leading-[18px] text-dark"
              >
                Kata Sandi Baru
                <span className="text-red-600 ml-1">*</span>
              </label>
              <PasswordField
                id="new_password"
                value={next}
                onChange={(v) => {
                  setNext(v);
                  setErrors((p) => ({ ...p, next: undefined, form: undefined }));
                }}
                error={errors.next}
                placeholder="Masukkan Kata Sandi Baru"
                autoComplete="new-password"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm_password"
                className="font-heading font-bold text-[14px] leading-[18px] text-dark"
              >
                Konfirmasi Kata Sandi Baru
                <span className="text-red-600 ml-1">*</span>
              </label>
              <PasswordField
                id="confirm_password"
                value={confirm}
                onChange={(v) => {
                  setConfirm(v);
                  setErrors((p) => ({ ...p, confirm: undefined, form: undefined }));
                }}
                error={errors.confirm}
                placeholder="Masukkan Kata Sandi Baru"
                autoComplete="new-password"
              />
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <RuleRow
                ok={rules.minLength}
                label="Kata sandi harus terdiri dari minimal 8 karakter"
              />
              <RuleRow
                ok={rules.hasUpperLower}
                label="Mengandung huruf kapital dan huruf kecil"
              />
              <RuleRow
                ok={rules.hasNumberSpec}
                label="Minimal ada 1 angka atau karakter khusus"
              />
            </div>

            {errors.form && (
              <p className="font-body text-[13px] leading-[18px] text-red-600">
                {errors.form}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="h-[44px] px-6 rounded-lg border border-primary bg-white font-body font-bold text-[14px] leading-[18px] text-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="h-[44px] px-6 rounded-lg bg-primary border border-primary-dark font-body font-bold text-[14px] leading-[18px] text-white hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "Menyimpan..." : "Simpan Kata Sandi"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
