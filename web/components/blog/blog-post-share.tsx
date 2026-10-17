"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeftIcon,
  CheckIcon,
  FacebookIcon,
  ShareIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

type BlogPostShareProps = {
  title: string;
  url?: string;
};

export function BlogPostShare({ title, url }: BlogPostShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl || window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`;
  const twShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="pt-10 border-t border-slate-100 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2.5 bg-gradient-warm text-white font-bold px-6 py-3 rounded-full shadow-gold hover:opacity-95 transition"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Torna a tutti gli articoli</span>
      </Link>

      <div className="flex items-center gap-2.5">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
          Condividi:
        </span>

        {/* Facebook */}
        <a
          href={fbShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Condividi su Facebook"
          className="h-10 w-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>

        {/* WhatsApp */}
        <a
          href={waShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Condividi su WhatsApp"
          className="h-10 w-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
        >
          <WhatsAppIcon className="h-4 w-4" />
        </a>

        {/* Twitter / X */}
        <a
          href={twShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Condividi su X"
          className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
        >
          <TwitterIcon className="h-4 w-4" />
        </a>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copia link"
          className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition border border-slate-200"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-emerald-600" />
          ) : (
            <ShareIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
