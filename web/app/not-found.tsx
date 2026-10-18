import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CompassIcon, GiftIcon, MailIcon } from "@/components/ui/icons";

export default function NotFound() {
  const quickLinks = [
    {
      title: "Catalogo Tour & Pacchetti",
      description: "Scopri gli itinerari culturali e paesaggistici più amati.",
      href: "/tours",
      icon: <CompassIcon className="w-5 h-5 text-amber-500" />,
    },
    {
      title: "Campania Experience",
      description: "TerraMare Tours, Pompei, Amalfi e tour esclusivi.",
      href: "/terra-mare-tour",
      icon: <CompassIcon className="w-5 h-5 text-teal-600" />,
    },
    {
      title: "Regala un Viaggio",
      description: "Crea un voucher regalo personalizzato per i tuoi cari.",
      href: "/regala-un-viaggio",
      icon: <GiftIcon className="w-5 h-5 text-amber-500" />,
    },
    {
      title: "Serve Aiuto? Contattaci",
      description: "Il nostro team è a tua disposizione per trovare l'itinerario giusto.",
      href: "/contatti",
      icon: <MailIcon className="w-5 h-5 text-teal-600" />,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      {/* 404 Hero Section */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/campania experience.jpg"
            alt="Destinazione non trovata"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(27, 94, 95, 0.7) 50%, rgba(15, 65, 66, 0.85) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Badge */}
          <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/15 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm border border-white/20">
            Errore 404
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 tracking-tight leading-tight text-gradient-hero drop-shadow-md">
            Destinazione Fuori Rotta
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            La pagina o l&apos;itinerario che stai cercando non esiste o è stato trasferito. Non preoccuparti, le meraviglie della Campania e del mondo ti aspettano.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            <span>Torna alla Home</span>
            <ArrowRightIcon className="w-4 h-4 text-white" />
          </Link>
        </div>
      </section>

      {/* Suggested Explorations Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950">
              Cosa vorresti esplorare oggi?
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Scegli una delle nostre sezioni principali per riprendere la navigazione.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-4 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-teal-950 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
