import React from "react";
import {
  AnchorIcon,
  BookIcon,
  CocktailIcon,
  CompassIcon,
  GiftIcon,
  GlobeIcon,
  GraduationCapIcon,
  HeartIcon,
  HikingIcon,
  MapPinIcon,
  PaperPlaneIcon,
  RingIcon,
  ShipIcon,
  StarIcon,
} from "@/components/ui/icons";
import type { CategoryIconType } from "@/lib/travel-categories";

export function CategoryIcon({
  name,
  className = "w-5 h-5",
}: {
  name: CategoryIconType;
  className?: string;
}) {
  switch (name) {
    case "ship":
      return <ShipIcon className={className} />;
    case "anchor":
      return <AnchorIcon className={className} />;
    case "globe":
      return <GlobeIcon className={className} />;
    case "compass":
      return <CompassIcon className={className} />;
    case "heart":
      return <HeartIcon className={className} />;
    case "ring":
      return <RingIcon className={className} />;
    case "star":
      return <StarIcon className={className} />;
    case "map-pin":
      return <MapPinIcon className={className} />;
    case "hiking":
      return <HikingIcon className={className} />;
    case "book":
      return <BookIcon className={className} />;
    case "graduation-cap":
      return <GraduationCapIcon className={className} />;
    case "cocktail":
      return <CocktailIcon className={className} />;
    case "gift":
      return <GiftIcon className={className} />;
    case "paper-plane":
      return <PaperPlaneIcon className={className} />;
    default:
      return <CompassIcon className={className} />;
  }
}
