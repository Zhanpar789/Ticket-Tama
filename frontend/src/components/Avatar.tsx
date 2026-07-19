"use client";

function getInitial(name: string | undefined | null): string {
  if (!name) return "?";
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toUpperCase();
}

type Props = {
  src: string | null;
  name: string;
  size?: number;
  textClass?: string;
  className?: string;
};

export default function Avatar({
  src,
  name,
  size = 32,
  textClass = "text-[14px]",
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-full bg-primary flex items-center justify-center font-heading font-bold leading-[100%] text-white flex-shrink-0 overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Foto profil"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={textClass}>{getInitial(name)}</span>
      )}
    </div>
  );
}
