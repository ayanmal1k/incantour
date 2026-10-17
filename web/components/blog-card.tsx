import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";

type BlogCardProps = { id: number | string; title: string; excerpt?: string; image?: string };

export function BlogCard({ id, title, excerpt, image }: BlogCardProps) {
  return (
    <Card className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-incan-sand">
        {image ? <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /> : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-incan-teal">{title}</h3>
        {excerpt ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{excerpt}</p> : null}
        <Link href={`/blog/${id}`} className="mt-6 text-sm font-bold text-incan-teal underline decoration-incan-gold decoration-2 underline-offset-4">Leggi l&apos;articolo</Link>
      </div>
    </Card>
  );
}
