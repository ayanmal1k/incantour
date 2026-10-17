"use client";

import React, { useState } from "react";
import { TerraMareHero } from "./terra-mare-hero";
import { TerraMareToursBrowser } from "./terra-mare-tours-browser";
import { CategoryRelatedNews } from "@/components/travel-category/category-related-news";
import { CategoryFloatingAction } from "@/components/travel-category/category-floating-action";
import type { Tour, Post } from "@/lib/wordpress/types";

export function TerraMareClientContent({
  allTours,
  relatedPosts,
}: {
  allTours: Tour[];
  relatedPosts: Post[];
}) {
  const [activeFilter, setActiveFilter] = useState<"experience" | "soggiorni" | null>(null);

  const handleToggleFilter = (filter: "experience" | "soggiorni") => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const handleClearFilter = () => {
    setActiveFilter(null);
  };

  return (
    <>
      {/* 1. Hero with dynamic narrative and filter toggles */}
      <TerraMareHero
        activeFilter={activeFilter}
        onToggleFilter={handleToggleFilter}
      />

      {/* 2. Interactive Tours Browser with search and category filters */}
      <TerraMareToursBrowser
        allTours={allTours}
        activeFilter={activeFilter}
        onClearFilter={handleClearFilter}
      />

      {/* 3. Related News Section */}
      <CategoryRelatedNews
        posts={relatedPosts}
        title="Notizie e Approfondimenti"
        subtitle="Resta aggiornato con le ultime novità, racconti ed eventi sul nostro blog"
      />

      {/* 4. Floating Action Widget */}
      <CategoryFloatingAction
        icon="compass"
        title="Richiedi informazioni sui tour Terra e Mare"
        href="/contatti?arg=terra-mare"
      />
    </>
  );
}
