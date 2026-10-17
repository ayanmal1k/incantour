export type RenderedField = { rendered: string };

export type WordPressMedia = {
  id: number;
  source_url: string;
  alt_text: string;
};

export type WordPressEmbedded = {
  "wp:featuredmedia"?: WordPressMedia[];
  "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
};

export type WordPressEntity<TAcf extends Record<string, unknown> = Record<string, unknown>> = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: RenderedField;
  content: RenderedField;
  excerpt: RenderedField;
  acf?: TAcf;
  _embedded?: WordPressEmbedded;
};

export type TourAcf = {
  Price?: string | number;
  Duration?: string;
  Location?: string;
  Tags?: string;
  category?: string;
  type?: string;
  [key: string]: unknown;
};

export type Tour = WordPressEntity<TourAcf> & {
  featuredImageUrl?: string;
  sanitizedContent: string;
};

export type Post = WordPressEntity & {
  featuredImageUrl?: string;
  sanitizedContent: string;
  sanitizedExcerpt: string;
};
