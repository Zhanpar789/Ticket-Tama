"use client";

import { useEffect } from "react";

function IconAlert() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="7" x2="12" y2="14" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      width="20"
      height="20"
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

type Props = {
  show: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
};

export default function Toast({
  show,
  onClose,
  message,
  duration = 12000,
}: Props) {
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-[92px] left-4 right-4 md:left-auto md:right-6 z-[60] flex md:justify-end pointer-events-none"
    >
      <div
        className="w-full md:w-auto md:max-w-[480px] bg-white border-l-[5px] border-emerald-500 shadow-[0px_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4 px-4 md:px-5 py-4 pointer-events-auto animate-[toast-slide-down_0.25s_ease-out]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-[32px] h-[32px] rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white">
            <IconAlert />
          </span>
          <p className="font-body font-bold text-[15px] md:text-[16px] leading-[20px] text-emerald-700 truncate">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="w-[32px] h-[32px] flex items-center justify-center text-emerald-500 hover:text-emerald-700 transition-colors flex-shrink-0 rounded-md hover:bg-emerald-50"
        >
          <IconClose />
        </button>
      </div>
    </div>
  );
}
