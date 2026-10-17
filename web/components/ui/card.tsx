import type { HTMLAttributes, PropsWithChildren } from "react";

export function Card({ children, className = "", ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`overflow-hidden rounded-card bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover ${className}`} {...props}>
      {children}
    </div>
  );
}
