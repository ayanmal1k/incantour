import type { Metadata } from "next";

import { FeaturedToursSection } from "@/components/home/featured-tours-section";
import { HeroSection } from "@/components/home/hero-section";
import { JourneyTimelineSection } from "@/components/home/journey-timeline-section";
import { LatestPostsSection } from "@/components/home/latest-posts-section";
import { SocialSection } from "@/components/home/social-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TravelGallerySection } from "@/components/home/travel-gallery-section";
import { TravelStylesSection } from "@/components/home/travel-styles-section";
import { getPosts, getTours } from "@/lib/wordpress/client";
import type { Post, Tour } from "@/lib/wordpress/types";

export const metadata: Metadata = {
  title: "IncanTour - Scopri Destinazioni Straordinarie",
  description:
    "Viaggi culturali esperienziali tra racconti, natura, sapori e tradizioni dalla Campania e dal mondo.",
};

export const revalidate = 300;

export default async function HomePage() {
  let tours: Tour[] = [];
  let posts: Post[] = [];
  let toursError: string | null = null;
  let postsError: string | null = null;

  try {
    tours = await getTours();
  } catch (error) {
    toursError = error instanceof Error ? error.message : "Impossibile caricare i tour";
  }

  try {
    posts = await getPosts(3);
  } catch (error) {
    postsError = error instanceof Error ? error.message : "Impossibile caricare gli articoli";
  }

  return (
    <>
      <HeroSection />
      <TravelStylesSection />
      <StatsSection />
      <FeaturedToursSection tours={tours} error={toursError} />
      <JourneyTimelineSection />
      <TestimonialsSection />
      <LatestPostsSection posts={posts} error={postsError} />
      <TravelGallerySection />
      <SocialSection />
    </>
  );
}
