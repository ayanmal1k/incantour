import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  image: string;
  children?: ReactNode;
};

export function PageHero({ title, eyebrow, description, image, children }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-incan-teal py-20 text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/35 to-black/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#1B5E5F]/25 via-transparent to-[#E6A532]/15" />
      <Container>
        <div className="max-w-3xl animate-rise">
          {eyebrow ? <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-incan-cream">{eyebrow}</p> : null}
          <h1 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">{title}</h1>
          {description ? <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">{description}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
