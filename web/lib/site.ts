export const siteName = "IncanTour";

export const siteDescription =
  "Viaggi, esperienze e itinerari su misura tra Italia e mondo.";

export type NavigationItem = {
  href: string;
  label: string;
  isExternal?: boolean;
  children?: readonly NavigationItem[];
};

export const navigation: readonly NavigationItem[] = [
  {
    href: "/terra-mare-tour",
    label: "Campania Experience",
    children: [
      { href: "/terra-mare-tour", label: "TerraMare Tours" },
      { href: "/destination-wedding", label: "Destination Wedding" },
      { href: "/wedding-planner", label: "Wedding Travel coordinator" },
      { href: "/gruppi-a-tema", label: "Gruppi a tema" },
      { href: "/disegna-il-tuo-viaggio", label: "Disegna il Tuo Viaggio (Incoming)" },
    ],
  },
  {
    href: "/viaggi-atipici",
    label: "Suggestioni dal Mondo",
    children: [
      { href: "/viaggi-atipici", label: "Viaggi atipici" },
      { href: "/crociere", label: "Crociere" },
      { href: "/viaggi-di-nozze", label: "Viaggi di nozze" },
      { href: "/disegna-il-tuo-viaggio", label: "Disegna il Tuo Viaggio (Outgoing)" },
    ],
  },
  {
    href: "/percorsi-lingua-italiana",
    label: "Radici e Cultura",
    children: [
      { href: "/percorsi-lingua-italiana", label: "Percorsi di lingua italiana" },
      { href: "/turismo-radici", label: "Turismo delle radici" },
    ],
  },
  {
    href: "/storia-visione",
    label: "Chi Siamo",
    children: [
      { href: "/storia-visione", label: "Storia & Visione" },
      { href: "/team", label: "Il nostro team" },
      { href: "/partner", label: "Partner" },
      { href: "/lavora-con-noi", label: "Lavora con noi" },
      { href: "/faq", label: "FAQ" },
      { href: "/contatti", label: "Contatti / Dove siamo" },
    ],
  },
  {
    href: "/blog",
    label: "News",
    children: [
      { href: "/blog", label: "Blog / Approfondimenti" },
    ],
  },
  {
    href: "https://culturedigitalisviluppo.com/vecchioincantour/agencyservices",
    label: "Agency Services",
    isExternal: true,
  },
];

export const locales = ["it", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function getSiteUrl() {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
}
