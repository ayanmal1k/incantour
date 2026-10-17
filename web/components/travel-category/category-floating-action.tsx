import React from "react";
import Link from "next/link";
import { CategoryIcon } from "./category-icon";
import type { CategoryIconType } from "@/lib/travel-categories";

export function CategoryFloatingAction({
  icon,
  title,
  href,
}: {
  icon: CategoryIconType;
  title: string;
  href: string;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        href={href}
        title={title}
        aria-label={title}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 bg-gradient-warm hover:shadow-[0_10px_25px_rgba(230,165,50,0.5)] group"
      >
        <span className="sr-only">{title}</span>
        <CategoryIcon name={icon} className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-12" />
      </Link>
    </div>
  );
}
