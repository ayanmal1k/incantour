"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation, siteName } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      <nav
        className={`w-full px-6 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-[rgba(230,165,50,0.98)] via-[rgba(212,148,26,0.98)] via-25% to-[rgba(27,94,95,0.98)] shadow-[0_2px_20px_rgba(230,165,50,0.25)] backdrop-blur-md"
            : "bg-transparent"
        }`}
        aria-label="Navigazione principale"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo with spinning spiral and text */}
          <Link href="/" className="flex items-center space-x-3 group" aria-label={`${siteName}, home`}>
            <div className="relative h-11 w-11 shrink-0 animate-spin-slow motion-reduce:animate-none">
              <Image
                src="/assets/images/icon.png"
                alt="IncanTour Spiral Logo"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="relative h-7 w-36 shrink-0">
              <Image
                src="/assets/images/logo - text.png"
                alt={siteName}
                fill
                sizes="144px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 font-semibold text-[15px] lg:text-base tracking-wide transition-colors duration-300 py-2 cursor-pointer ${
                      isScrolled
                        ? "text-[#E6A532] hover:text-white"
                        : "text-white hover:text-orange-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Dropdown Menu Card */}
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-50 border border-slate-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block rounded-lg px-4 py-2.5 text-[15px] font-semibold transition-colors ${
                          pathname === child.href
                            ? "bg-amber-50 text-[#E6A532]"
                            : "text-gray-800 hover:bg-gray-100 hover:text-[#E6A532]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 font-semibold text-[15px] lg:text-base tracking-wide transition-colors duration-300 py-2 ${
                    isScrolled
                      ? "text-[#E6A532] hover:text-white"
                      : "text-white hover:text-orange-300"
                  }`}
                >
                  <span>{item.label}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 ml-0.5"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-semibold text-[15px] lg:text-base tracking-wide transition-colors duration-300 py-2 ${
                    isScrolled
                      ? "text-[#E6A532] hover:text-white"
                      : "text-white hover:text-orange-300"
                  } ${pathname === item.href ? "text-white underline decoration-2 underline-offset-4" : ""}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-white text-2xl focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen ? (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-4 px-6 text-gray-800 border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <div className="space-y-3">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-gray-100 pb-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="w-full flex justify-between items-center py-2.5 text-left font-bold text-base text-gray-800 hover:text-amber-600 cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileDropdown === item.label ? "rotate-180 text-[#E6A532]" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openMobileDropdown === item.label ? (
                      <div className="pl-4 space-y-1.5 mt-1 border-l-2 border-amber-200">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-[15px] text-gray-700 hover:text-[#E6A532] font-semibold"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 font-bold text-base text-gray-800 hover:text-[#E6A532] border-b border-gray-100"
                  >
                    <span>{item.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 ml-1">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 font-bold text-base text-gray-800 hover:text-[#E6A532] border-b border-gray-100"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
