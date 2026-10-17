import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";

type TourCardProps = {
  id: number | string;
  title: string;
  image?: string;
  location?: string;
  duration?: string;
  price?: string;
};

export function TourCard({ id, title, image, location, duration, price }: TourCardProps) {
  return (
    <Card className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-incan-sand">
        {image ? <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /> : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-incan-teal">{title}</h3>
        <p className="mt-3 text-sm text-slate-600">{[location, duration].filter(Boolean).join(" · ")}</p>
        {price ? <p className="mt-4 text-lg font-bold text-incan-gold-dark">{price}</p> : null}
        <Link href={`/tour/${id}`} className="mt-6 text-sm font-bold text-incan-teal underline decoration-incan-gold decoration-2 underline-offset-4">Scopri il tour</Link>
      </div>
    </Card>
  );
}
