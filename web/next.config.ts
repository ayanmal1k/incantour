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
    ];
  },
};

export default nextConfig;
