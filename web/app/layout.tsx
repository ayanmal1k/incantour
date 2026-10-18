import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";

import { ExtensionErrorSuppressor } from "@/components/extension-error-suppressor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "@/app/globals.css";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: `${siteName} | Viaggi su misura`, template: `%s | ${siteName}` },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName,
    title: `${siteName} | Viaggi su misura`,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/assets/images/icon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/assets/images/icon.png",
    apple: "/assets/images/icon.png",
  },
};

const extensionSuppressorCode = `
  (function() {
    function isExtensionMessage(args) {
      try {
        for (var i = 0; i < args.length; i++) {
          var item = args[i];
          if (!item) continue;
          var str = '';
          if (typeof item === 'string') {
            str = item;
          } else if (item instanceof Error || (typeof item === 'object' && item !== null)) {
            str = ((item && item.message) || '') + ' ' + ((item && item.stack) || '') + ' ' + ((item && item.name) || '') + ' ' + String(item);
          } else {
            str = String(item);
          }
          str = str.toLowerCase();
          if (
            str.indexOf('metamask') !== -1 ||
            str.indexOf('chrome-extension://') !== -1 ||
            str.indexOf('moz-extension://') !== -1 ||
            str.indexOf('inpage.js') !== -1 ||
            str.indexOf('failed to connect to metamask') !== -1 ||
            str.indexOf('error restoring session') !== -1 ||
            str.indexOf('nkbihfbeogaeaoehlefnkodbefgpgknn') !== -1
          ) {
            return true;
          }
        }
        var stack = (new Error().stack || '').toLowerCase();
        if (
          stack.indexOf('chrome-extension://') !== -1 ||
          stack.indexOf('moz-extension://') !== -1 ||
          stack.indexOf('inpage.js') !== -1 ||
          stack.indexOf('nkbihfbeogaeaoehlefnkodbefgpgknn') !== -1
        ) {
          return true;
        }
      } catch (err) {
        // ignore check errors
      }
      return false;
    }

    if (typeof console !== 'undefined') {
      var origError = console.error;
      console.error = function() {
        if (isExtensionMessage(arguments)) {
          return;
        }
        return origError.apply(console, arguments);
      };

      var origWarn = console.warn;
      console.warn = function() {
        if (isExtensionMessage(arguments)) {
          return;
        }
        return origWarn.apply(console, arguments);
      };
    }

    function isExtensionError(err) {
      if (!err) return false;
      var str = ((err && err.message) || '') + ' ' + ((err && err.stack) || '') + ' ' + String(err);
      str = str.toLowerCase();
      return str.indexOf('metamask') !== -1 ||
             str.indexOf('chrome-extension://') !== -1 ||
             str.indexOf('moz-extension://') !== -1 ||
             str.indexOf('inpage.js') !== -1 ||
             str.indexOf('failed to connect to metamask') !== -1 ||
             str.indexOf('error restoring session') !== -1 ||
             str.indexOf('nkbihfbeogaeaoehlefnkodbefgpgknn') !== -1;
    }

    window.addEventListener('error', function(e) {
      if (isExtensionError(e.error) || (e.filename && (e.filename.indexOf('extension://') !== -1 || e.filename.indexOf('inpage.js') !== -1))) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return true;
      }
    }, true);

    window.addEventListener('unhandledrejection', function(e) {
      if (isExtensionError(e.reason)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return true;
      }
    }, true);
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={poppins.variable}>
      <head>
        <link rel="icon" type="image/png" href="/assets/images/icon.png" />
        <link rel="shortcut icon" type="image/png" href="/assets/images/icon.png" />
        <link rel="apple-touch-icon" href="/assets/images/icon.png" />
        <Script
          id="extension-error-suppressor"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: extensionSuppressorCode }}
        />
      </head>
      <body className="font-sans antialiased">
        <ExtensionErrorSuppressor />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}


