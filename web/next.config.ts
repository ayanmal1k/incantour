import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    // Activate the remaining entries in lib/legacy-routes.ts only as their
    // destination routes are migrated. Redirecting them now would cause 404s.
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/src/tours.html",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/tours.html",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/tour",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/tour/:slug*",
        destination: "/tours/:slug*",
        permanent: true,
      },
      {
        source: "/src/tour-detail.html",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/tour-detail.html",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/src/blog.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/src/blog-post.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-post.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-post",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-post/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      {
        source: "/src/crociere.html",
        destination: "/crociere",
        permanent: true,
      },
      {
        source: "/crociere.html",
        destination: "/crociere",
        permanent: true,
      },
      {
        source: "/src/viaggi-atipici.html",
        destination: "/viaggi-atipici",
        permanent: true,
      },
      {
        source: "/viaggi-atipici.html",
        destination: "/viaggi-atipici",
        permanent: true,
      },
      {
        source: "/src/viaggi-di-nozze.html",
        destination: "/viaggi-di-nozze",
        permanent: true,
      },
      {
        source: "/viaggi-di-nozze.html",
        destination: "/viaggi-di-nozze",
        permanent: true,
      },
      {
        source: "/src/percorsi-lingua-italiana.html",
        destination: "/percorsi-lingua-italiana",
        permanent: true,
      },
      {
        source: "/percorsi-lingua-italiana.html",
        destination: "/percorsi-lingua-italiana",
        permanent: true,
      },
      {
        source: "/src/destination-wedding.html",
        destination: "/destination-wedding",
        permanent: true,
      },
      {
        source: "/destination-wedding.html",
        destination: "/destination-wedding",
        permanent: true,
      },
      {
        source: "/src/wedding-planner.html",
        destination: "/wedding-planner",
        permanent: true,
      },
      {
        source: "/wedding-planner.html",
        destination: "/wedding-planner",
        permanent: true,
      },
      {
        source: "/src/terra-mare-tour.html",
        destination: "/terra-mare-tour",
        permanent: true,
      },
      {
        source: "/terra-mare-tour.html",
        destination: "/terra-mare-tour",
        permanent: true,
      },
      {
        source: "/terra-mare",
        destination: "/terra-mare-tour",
        permanent: true,
      },
      {
        source: "/src/turismo-radici.html",
        destination: "/turismo-radici",
        permanent: true,
      },
      {
        source: "/turismo-radici.html",
        destination: "/turismo-radici",
        permanent: true,
      },
      {
        source: "/src/gruppi-a-tema.html",
        destination: "/gruppi-a-tema",
        permanent: true,
      },
      {
        source: "/gruppi-a-tema.html",
        destination: "/gruppi-a-tema",
        permanent: true,
      },
      {
        source: "/src/storia-visione.html",
        destination: "/storia-visione",
        permanent: true,
      },
      {
        source: "/storia-visione.html",
        destination: "/storia-visione",
        permanent: true,
      },
      {
        source: "/src/team.html",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/team.html",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/src/partner.html",
        destination: "/partner",
        permanent: true,
      },
      {
        source: "/partner.html",
        destination: "/partner",
        permanent: true,
      },
      {
        source: "/src/lavora-con-noi.html",
        destination: "/lavora-con-noi",
        permanent: true,
      },
      {
        source: "/lavora-con-noi.html",
        destination: "/lavora-con-noi",
        permanent: true,
      },
      {
        source: "/src/faq.html",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/faq.html",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/src/contatti.html",
        destination: "/contatti",
        permanent: true,
      },
      {
        source: "/contatti.html",
        destination: "/contatti",
        permanent: true,
      },
      {
        source: "/src/booking.html",
        destination: "/prenota",
        permanent: true,
      },
      {
        source: "/booking.html",
        destination: "/prenota",
        permanent: true,
      },
      {
        source: "/booking",
        destination: "/prenota",
        permanent: true,
      },
      {
        source: "/src/regala-un-viaggio.html",
        destination: "/regala-un-viaggio",
        permanent: true,
      },
      {
        source: "/regala-un-viaggio.html",
        destination: "/regala-un-viaggio",
        permanent: true,
      },
      {
        source: "/src/donate.html",
        destination: "/sostieni-incantour",
        permanent: true,
      },
      {
        source: "/donate.html",
        destination: "/sostieni-incantour",
        permanent: true,
      },
      {
        source: "/donate",
        destination: "/sostieni-incantour",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
