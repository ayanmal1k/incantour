import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";

const variants = {
  primary: "bg-gradient-to-r from-incan-gold to-incan-gold-dark text-white shadow-gold hover:brightness-105",
  secondary: "border border-white/70 bg-white/10 text-white hover:bg-white/20",
  outline: "border border-incan-teal text-incan-teal hover:bg-incan-teal hover:text-white",
} as const;

type ButtonProps = PropsWithChildren<{
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
}> & Omit<ComponentProps<"button">, "className">;

export function Button({ children, href, variant = "primary", className = "", ...buttonProps }: ButtonProps) {
  const styles = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-incan-gold ${variants[variant]} ${className}`;
  if (href) return <Link href={href} className={styles}>{children}</Link>;
  return <button className={styles} {...buttonProps}>{children}</button>;
}
