export type CategoryIconType =
  | "ship"
  | "anchor"
  | "globe"
  | "compass"
  | "heart"
  | "ring"
  | "star"
  | "map-pin"
  | "hiking"
  | "book"
  | "graduation-cap"
  | "cocktail"
  | "gift"
  | "paper-plane";

export type CategoryDownloadItem = {
  title: string;
  filename: string;
  href: string;
  exists: boolean;
  type: "pdf" | "pub";
  size?: string;
  note?: string;
};

export type TravelCategoryConfig = {
  slug: "crociere" | "viaggi-atipici" | "viaggi-di-nozze" | "percorsi-lingua-italiana";
  route: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  hero: {
    breadcrumb: string;
    tagBadge?: string;
    title: string;
    subtitle: string;
    description: string;
    quote?: {
      text: string;
      author: string;
    };
    bgImage: string;
    floatingIcons: Array<{
      icon: CategoryIconType;
      position: string;
      delay: string;
      color: string;
    }>;
    featurePills: Array<{
      label: string;
      icon: CategoryIconType;
    }>;
  };
  search: {
    title: string;
    subtitle: string;
    placeholder: string;
  };
  toursSection: {
    badge: string;
    title: string;
    subtitle: string;
    emptyMessage: string;
    cardBadge: string;
    filterKeywords: string[];
  };
  relatedPosts: {
    title: string;
    subtitle: string;
    tag: string;
  };
  floatingAction: {
    icon: CategoryIconType;
    title: string;
    href: string;
  };
  downloads?: {
    badge: string;
    title: string;
    items: CategoryDownloadItem[];
  };
  hasWeddingForm?: boolean;
  hasLanguageForm?: boolean;
};

export const travelCategoryConfigs: Record<
  TravelCategoryConfig["slug"],
  TravelCategoryConfig
> = {
  crociere: {
    slug: "crociere",
    route: "/crociere",
    seo: {
      title: "Crociere - Viaggi Lenti sul Mare | IncanTour",
      description:
        "Salpare con Incantour: crociere esclusive, viaggi lenti, panorami infiniti ed emozioni autentiche tra coste mozzafiato e navi selezionate.",
      canonical: "/crociere",
      ogImage: "/assets/images/crociere2.jpg",
    },
    hero: {
      breadcrumb: "Crociere",
      title: "Crociere",
      subtitle: "Viaggi lenti, panorami infiniti, emozioni indimenticabili",
      description:
        "Salpare non è solo muoversi sull'acqua: è lasciarsi cullare da un ritmo diverso, scoprire coste nascoste e vivere il fascino del viaggio lento. Con Incantour le crociere non sono semplici trasferimenti ma esperienze pensate per emozionare, tra paesaggi incantevoli, soste autentiche ed atmosfere uniche di esplorazione senza fretta. Scegli la tua rotta ideale e lasciati ispirare dalle proposte selezionate per te.",
      quote: {
        text: "La crociera è sempre circondata dalla magica atmosfera della fantasia romantica. Vi è un tocco di Arcadia in una crociera.",
        author: "Agatha Christie",
      },
      bgImage: "/assets/images/crociere2.jpg",
      floatingIcons: [
        { icon: "ship", position: "top-20 left-10", delay: "0.5s", color: "text-amber-300" },
        { icon: "anchor", position: "bottom-20 right-10", delay: "1s", color: "text-teal-300" },
      ],
      featurePills: [
        { label: "Navi di Lusso & Yacht", icon: "ship" },
        { label: "Servizi All-Inclusive", icon: "cocktail" },
        { label: "Destinazioni Mondiali", icon: "globe" },
      ],
    },
    search: {
      title: "Trova la tua Crociera Ideale",
      subtitle: "Esplora la nostra selezione di crociere ed itinerari sul mare",
      placeholder: "Cerca per destinazione, durata o tipologia di nave...",
    },
    toursSection: {
      badge: "Esperienze sul Mare",
      title: "Pacchetti Crociere",
      subtitle: "Scegli la tua crociera tra le nostre proposte selezionate per te",
      emptyMessage: "Nessuna crociera trovata. Modifica i criteri di ricerca per esplorare le altre proposte.",
      cardBadge: "Crociere",
      filterKeywords: ["crocier"],
    },
    relatedPosts: {
      title: "Notizie e Approfondimenti",
      subtitle: "Resta aggiornato con le ultime novità, racconti ed eventi sul nostro blog",
      tag: "crociere",
    },
    floatingAction: {
      icon: "ship",
      title: "Contattaci per informazioni sulle crociere",
      href: "/contatti?arg=crociere",
    },
  },

  "viaggi-atipici": {
    slug: "viaggi-atipici",
    route: "/viaggi-atipici",
    seo: {
      title: "Viaggi Atipici - Avventure Fuori dagli Schemi | IncanTour",
      description:
        "Vivi un'avventura in angoli del mondo tra antico e moderno. Scopri la collezione Incantour di viaggi atipici, esperienze autentiche e percorsi su misura.",
      canonical: "/viaggi-atipici",
      ogImage: "/assets/images/viaggi.jpg",
    },
    hero: {
      breadcrumb: "Viaggi Atipici",
      title: "Viaggi Atipici",
      subtitle: "Vivi un'avventura in angoli del mondo tra antico e moderno",
      description:
        "Un viaggio atipico non è solo spostarsi, ma trasformarsi. È un'avventura che ti porta a guardare il mondo – e te stesso – con occhi nuovi. Con Incantour immergiti nella cultura viva dei luoghi, tra storie antiche e vibrazioni moderne, per scoprire un mosaico di esperienze autentiche e sorprendenti.",
      bgImage: "/assets/images/viaggi.jpg",
      floatingIcons: [
        { icon: "globe", position: "top-20 left-10", delay: "0.5s", color: "text-amber-300" },
        { icon: "compass", position: "bottom-20 right-10", delay: "1s", color: "text-teal-300" },
      ],
      featurePills: [
        { label: "Destinazioni Uniche", icon: "map-pin" },
        { label: "Avventure Autentiche", icon: "hiking" },
        { label: "Itinerari Su Misura", icon: "compass" },
      ],
    },
    search: {
      title: "Trova la tua Avventura Atipica",
      subtitle: "Scopri la nostra collezione di esperienze di viaggio fuori dagli schemi",
      placeholder: "Cerca per destinazione, attività o tipologia...",
    },
    toursSection: {
      badge: "Esperienze Fuori dagli Schemi",
      title: "Pacchetti Viaggi Atipici",
      subtitle: "Scegli tra la nostra selezione di avventure ed esperienze straordinarie nel mondo",
      emptyMessage: "Nessun pacchetto trovato con i criteri di ricerca specificati.",
      cardBadge: "Viaggi Atipici",
      filterKeywords: ["atipic", "suggestioni", "avventura"],
    },
    relatedPosts: {
      title: "Notizie e Approfondimenti",
      subtitle: "Resta aggiornato con le ultime novità, racconti ed eventi sul nostro blog",
      tag: "viaggi",
    },
    floatingAction: {
      icon: "paper-plane",
      title: "Richiedi un itinerario atipico su misura",
      href: "/contatti?arg=viaggi-atipici",
    },
  },

  "viaggi-di-nozze": {
    slug: "viaggi-di-nozze",
    route: "/viaggi-di-nozze",
    seo: {
      title: "Viaggi di Nozze & Luna di Miele | Nozze da Incanto - IncanTour",
      description:
        "La tua luna di miele da sogno con IncanTour: itinerari romantici, cura sartoriale di ogni dettaglio e la possibilità di aprire la tua Lista di Nozze online.",
      canonical: "/viaggi-di-nozze",
      ogImage: "/assets/images/viaggi di nozze.jpg",
    },
    hero: {
      breadcrumb: "Viaggi di Nozze",
      title: "Nozze da Incanto",
      subtitle: "La tua luna di miele, un viaggio di emozioni",
      description:
        "Gioia, felicità, tenerezza, emozione, entusiasmo: la luna di miele è un momento unico e irripetibile, un capitolo speciale di ogni storia d'amore. Con Incantour il viaggio di nozze si trasforma in un'esperienza vissuta con ritmi dolci, mille attenzioni in luoghi da sogno. Un viaggio pensato per creare ricordi preziosi da custodire per sempre.",
      bgImage: "/assets/images/viaggi di nozze.jpg",
      floatingIcons: [
        { icon: "heart", position: "top-20 left-10", delay: "0.5s", color: "text-amber-300" },
        { icon: "ring", position: "bottom-20 right-10", delay: "1s", color: "text-teal-300" },
      ],
      featurePills: [
        { label: "Fughe Romantiche", icon: "heart" },
        { label: "Esperienze Luxury", icon: "star" },
        { label: "Destinazioni da Sogno", icon: "map-pin" },
      ],
    },
    search: {
      title: "Trova la tua Luna di Miele da Sogno",
      subtitle: "Esplora le nostre proposte ed itinerari per viaggi di nozze",
      placeholder: "Cerca per destinazione, tipologia di esperienza o durata...",
    },
    toursSection: {
      badge: "Proposte Esclusive",
      title: "Pacchetti Viaggi di Nozze",
      subtitle: "Scegli tra la nostra selezione di itinerari romantici creati per voi",
      emptyMessage: "Nessun pacchetto nozze trovato. Personalizza la tua luna di miele con il nostro modulo dedicato.",
      cardBadge: "Viaggi di Nozze",
      filterKeywords: ["nozze", "honeymoon", "luna di miele", "wedding"],
    },
    hasWeddingForm: true,
    relatedPosts: {
      title: "Notizie e Approfondimenti",
      subtitle: "Resta aggiornato con le ultime novità, racconti ed eventi sul nostro blog",
      tag: "wedding",
    },
    floatingAction: {
      icon: "gift",
      title: "Apri la tua lista di nozze",
      href: "#lista-nozze-form-section",
    },
  },

  "percorsi-lingua-italiana": {
    slug: "percorsi-lingua-italiana",
    route: "/percorsi-lingua-italiana",
    seo: {
      title: "Percorsi di Lingua e Cultura Italiana | IncanTour",
      description:
        "Immergiti nella lingua e nella civiltà italiana tra terra e mare. Corsi itineranti, dimore storiche, laboratori culturali e tutoraggio CILS con IncanTour.",
      canonical: "/percorsi-lingua-italiana",
      ogImage: "/assets/images/percorsi di lingua e cultura.jpg",
    },
    hero: {
      breadcrumb: "Radici e Cultura",
      tagBadge: "RADICI E CULTURA",
      title: "PERCORSI DI LINGUA E CULTURA ITALIANA",
      subtitle: "Un viaggio attraverso la lingua Italiana per scoprire luoghi letterari e preziosita’ uniche.",
      description:
        "Pensati per viaggiatori curiosi – giovani e adulti – che intendono migliorare la conoscenza della lingua e della cultura italiana. Non un semplice corso, ma un vero viaggio itinerante che svela angoli inesplorati, tradizioni vive e segni tangibili e intangibili della nostra civiltà. Con Incantour sarà possibile immergersi nei percorsi di lingua e cultura tra le atmosfere della Campania, attraverso lo Stivale tra terra e mare , in location suggestive e gradevoli: dimore storiche, castelli, barche d'epoca, giardini tra profumi di gelsomini, agrumeti in fiore, tramonti e paesaggi da incanto.",
      bgImage: "/assets/images/percorsi di lingua e cultura.jpg",
      floatingIcons: [
        { icon: "book", position: "top-20 left-10", delay: "0.5s", color: "text-amber-300" },
        { icon: "graduation-cap", position: "bottom-20 right-10", delay: "1s", color: "text-teal-300" },
      ],
      featurePills: [
        { label: "Dimore Storiche & Castelli", icon: "map-pin" },
        { label: "Laboratori & Seminari", icon: "book" },
        { label: "Certificazione CILS", icon: "graduation-cap" },
      ],
    },
    downloads: {
      badge: "Documentazione & Approfondimenti",
      title: "Scarica i Documenti Informativi",
      items: [
        {
          title: "Programma",
          filename: "Programma.pdf",
          href: "/assets/documents/Programma.pdf",
          exists: false,
          type: "pdf",
          note: "Documento in fase di aggiornamento. Richiedibile tramite form.",
        },
        {
          title: "Laboratori",
          filename: "Laboratori.pub",
          href: "/assets/documents/Laboratori.pub",
          exists: true,
          type: "pub",
          size: "3.1 MB",
        },
        {
          title: "Seminari",
          filename: "Seminari.pdf",
          href: "/assets/documents/Seminari.pdf",
          exists: false,
          type: "pdf",
          note: "Documento in fase di aggiornamento. Richiedibile tramite form.",
        },
      ],
    },
    search: {
      title: "Trova il tuo Percorso di Lingua Ideale",
      subtitle: "Esplora i nostri programmi di immersione nella lingua e cultura italiana",
      placeholder: "Cerca per livello, location o tipologia di percorso...",
    },
    toursSection: {
      badge: "Esperienze Itineranti",
      title: "Pacchetti Lingua & Cultura",
      subtitle: "Immergiti nei percorsi culturali tra terra e mare in location di grande fascino",
      emptyMessage: "Nessun percorso trovato con i filtri correnti. Compila il form in basso per un itinerario personalizzato.",
      cardBadge: "Lingua & Cultura",
      filterKeywords: ["lingua", "cultura", "radici"],
    },
    hasLanguageForm: true,
    relatedPosts: {
      title: "Notizie e Approfondimenti",
      subtitle: "Resta aggiornato con le ultime novità, racconti ed eventi sul nostro blog",
      tag: "lingua",
    },
    floatingAction: {
      icon: "graduation-cap",
      title: "Prenota il tuo percorso di lingua",
      href: "#booking-form-section",
    },
  },
};
