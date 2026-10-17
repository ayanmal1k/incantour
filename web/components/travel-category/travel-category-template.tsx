import React from "react";
import { CategoryDownloads } from "./category-downloads";
import { CategoryFloatingAction } from "./category-floating-action";
import { CategoryHero } from "./category-hero";
import { CategoryRelatedNews } from "./category-related-news";
import { CategoryToursBrowser } from "./category-tours-browser";
import { LanguageBookingForm } from "./language-booking-form";
import { WeddingListForm } from "./wedding-list-form";
import type { TravelCategoryConfig } from "@/lib/travel-categories";
import type { Post, Tour } from "@/lib/wordpress/types";

export function TravelCategoryTemplate({
  config,
  allTours,
  relatedPosts,
}: {
  config: TravelCategoryConfig;
  allTours: Tour[];
  relatedPosts: Post[];
}) {
  return (
    <article className="min-h-screen bg-white">
      {/* 1. Hero Section with dynamic background, floating elements, text gradient, narrative card */}
      <CategoryHero config={config} />

      {/* 2. Page-specific Downloads Section (if present, e.g. for Percorsi Lingua) */}
      {config.downloads && <CategoryDownloads downloads={config.downloads} />}

      {/* 3. Search Bar and WordPress-driven Category Tours Grid */}
      <CategoryToursBrowser allTours={allTours} config={config} />

      {/* 4. Page-specific Interactive Forms */}
      {config.hasWeddingForm && <WeddingListForm />}
      {config.hasLanguageForm && <LanguageBookingForm />}

      {/* 5. Related Blog & Insights Section */}
      <CategoryRelatedNews
        posts={relatedPosts}
        title={config.relatedPosts.title}
        subtitle={config.relatedPosts.subtitle}
      />

      {/* 6. Page-specific Floating Quick-Action Widget */}
      <CategoryFloatingAction
        icon={config.floatingAction.icon}
        title={config.floatingAction.title}
        href={config.floatingAction.href}
      />
    </article>
  );
}
