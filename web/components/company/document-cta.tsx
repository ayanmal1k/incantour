import React from "react";
import { NewspaperIcon, DownloadIcon } from "@/components/ui/icons";

export type DocumentCtaProps = {
  href: string;
  filename?: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "warm" | "cool";
};

export function DocumentCta({
  href,
  filename,
  label,
  icon: Icon = NewspaperIcon,
  variant = "warm",
}: DocumentCtaProps) {
  const gradientClass =
    variant === "cool"
      ? "bg-gradient-to-r from-[#1B5E5F] to-[#0F4142]"
      : "bg-gradient-to-r from-amber-500 to-amber-600";

  return (
    <a
      href={href}
      download={filename || true}
      className={`inline-flex items-center gap-3 ${gradientClass} text-white font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:opacity-95 transform hover:scale-105 active:scale-95 transition-all text-sm sm:text-base group`}
    >
      <Icon className="w-5 h-5 text-amber-200 group-hover:scale-110 transition-transform shrink-0" />
      <span>{label}</span>
      <DownloadIcon className="w-4 h-4 opacity-80 group-hover:translate-y-0.5 transition-transform shrink-0" />
    </a>
  );
}
