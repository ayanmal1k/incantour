import type { PropsWithChildren } from "react";

import { Container } from "@/components/ui/container";

type SectionProps = PropsWithChildren<{
  className?: string;
  containerClassName?: string;
  id?: string;
}>;

export function Section({ children, className = "", containerClassName, id }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
