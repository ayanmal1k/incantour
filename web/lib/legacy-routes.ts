/**
 * Source of truth for deferred legacy redirects. Enable an entry in
 * next.config.ts only after its Next destination has been deployed.
 */
export const legacyRoutePlan = [
  { source: "/index.html", destination: "/" },
  { source: "/src/tours.html", destination: "/tour" },
  { source: "/src/tour-detail.html?id=:id", destination: "/tour/:id" },
  { source: "/src/booking.html?tour=:tour", destination: "/prenota?tour=:tour" },
  { source: "/src/blog.html", destination: "/blog" },
  { source: "/src/blog-post.html?id=:id", destination: "/blog/:id" },
  { source: "/src/storia-visione.html", destination: "/storia-visione" },
  { source: "/src/team.html", destination: "/team" },
  { source: "/src/contatti.html", destination: "/contatti" },
  { source: "/src/faq.html", destination: "/faq" },
  { source: "/src/partner.html", destination: "/partner" },
  { source: "/src/lavora-con-noi.html", destination: "/lavora-con-noi" },
  { source: "/src/viaggi-di-nozze.html", destination: "/viaggi-di-nozze" },
  { source: "/src/wedding-planner.html", destination: "/wedding-planner" },
  { source: "/src/destination-wedding.html", destination: "/destination-wedding" },
  { source: "/src/turismo-radici.html", destination: "/turismo-radici" },
  { source: "/src/percorsi-lingua-italiana.html", destination: "/percorsi-lingua-italiana" },
  { source: "/src/viaggi-atipici.html", destination: "/viaggi-atipici" },
  { source: "/src/terra-mare-tour.html", destination: "/terra-mare-tour" },
  { source: "/src/crociere.html", destination: "/crociere" },
  { source: "/src/gruppi-a-tema.html", destination: "/gruppi-a-tema" },
  { source: "/src/regala-un-viaggio.html", destination: "/regala-un-viaggio" },
  { source: "/src/donate.html", destination: "/sostieni-incantour" },
] as const;
