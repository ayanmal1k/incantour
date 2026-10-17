"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type StatItem = {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

const stats: readonly StatItem[] = [
  { target: 2500, label: "Happy Travelers", suffix: "+" },
  { target: 85, label: "Destinazioni" },
  { target: 150, label: "Pacchetti Tour", suffix: "+" },
  { target: 24, label: "Assistenza 24/7", suffix: "/7" },
];

export function StatsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const duration = 1800;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);

              setCounts(stats.map((s) => Math.floor(s.target * easeOut)));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCounts(stats.map((s) => s.target));
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-primary py-20 text-white shadow-inner"
      aria-label="Statistiche Incantour"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="font-display text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
                {stat.prefix}
                {prefersReducedMotion ? stat.target : hasAnimated ? counts[idx] : 0}
                {stat.suffix}
              </div>
              <div className="mt-2 text-sm font-semibold tracking-wide text-amber-100 sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
