export type RenderedField = { rendered: string };

export type WordPressMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
};

export type WordPressTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy?: string;
  count?: number;
};

export type WordPressEmbedded = {
  "wp:featuredmedia"?: WordPressMedia[];
  "wp:term"?: WordPressTerm[][];
  author?: Array<{ id: number; name: string; url: string; description: string; avatar_urls?: Record<string, string> }>;
};

export type YoastHeadJson = {
  title?: string;
  description?: string;
  robots?: Record<string, string>;
  canonical?: string;
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: Array<{ url: string; width?: number; height?: number; type?: string }>;
  twitter_card?: string;
  schema?: Record<string, unknown>;
};

export type WordPressEntity<TAcf extends Record<string, unknown> = Record<string, unknown>> = {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  link: string;
  title: RenderedField;
  content: RenderedField;
  excerpt: RenderedField;
  acf?: TAcf;
  _embedded?: WordPressEmbedded;
  yoast_head_json?: YoastHeadJson;
  categories?: number[];
  tags?: number[];
};

export type TourAcf = {
  Price?: string | number;
  Duration?: string;
  Location?: string;
  Tags?: string;
  category?: string;
  type?: string; // 'incoming' | 'outgoing'
  description?: string;
  gallery?: string[] | Array<{ url: string; alt?: string }>;
  included?: string[] | string;
  not_included?: string[] | string;
  itinerary?: Array<{ day?: number; title?: string; description?: string }>;
  [key: string]: unknown;
};

export type Tour = WordPressEntity<TourAcf> & {
  featuredImageUrl?: string;
  sanitizedContent: string;
  terms?: WordPressTerm[];
};

export type PostAcf = {
  subtitle?: string;
  reading_time?: string;
  [key: string]: unknown;
};

export type Post = WordPressEntity<PostAcf> & {
  featuredImageUrl?: string;
  sanitizedContent: string;
  sanitizedExcerpt: string;
  terms?: WordPressTerm[];
};

export type FAQItem = {
  id: number;
  category: string;
  question: string;
  answer: string;
};

/* Form Payloads */
export type BookingFormData = {
  name: string;
  email: string;
  tour: string;
  date: string;
  quantity: string | number;
  total: string;
  message?: string;
};

export type GiftVoucherFormData = {
  value: string | number;
  first_name: string;
  last_name: string;
  dob?: string;
  phone: string;
  email: string;
  occasion?: string;
  message?: string;
  payment_method_id?: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  details?: string;
  service?: string;
};

export type WeddingFormData = {
  name: string;
  email: string;
  phone?: string;
  event_date?: string;
  service?: string;
  details?: string;
};

export type RootsFormData = {
  name: string;
  email: string;
  phone?: string;
  origin_city?: string;
  destination?: string;
  start_date?: string;
  end_date?: string;
  travel_type?: string;
  activities?: string;
  extra_destinations?: string;
  service?: string;
};

export type GroupFormData = {
  name: string;
  email: string;
  phone?: string;
  facebook?: string;
  destination?: string;
  departure_month?: string;
  departure_year?: string;
  duration?: string;
  adults_count?: string;
  children_count?: string;
  tour_leader?: string;
  themes?: string;
  itinerary_description?: string;
  guide_service?: string;
  escort_service?: string;
  transport?: string;
  newsletter?: string;
};
