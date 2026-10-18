import Image from "next/image";
import Link from "next/link";
import { ClockIcon, ExternalLinkIcon, MapPinIcon, ParkingIcon, PhoneIcon, ShieldIcon } from "@/components/ui/icons";

export function LocationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Palazzo Pignatelli Image & Maison Degas Card */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group relative">
              <div className="relative w-full h-[340px] md:h-[400px]">
                <Image
                  src="/assets/images/contact map.png"
                  alt="Palazzo Pignatelli di Monteleone - Sede IncanTour a Napoli"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-black/65 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wide">
                Palazzo Pignatelli di Monteleone (XVI sec.)
              </div>
            </div>

            {/* Clickable Maison Degas Link/Card */}
            <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  Maison Degas – Dimora de Charme
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Sede Incantour al 3° piano
                </p>
              </div>
              <a
                href="https://www.maisondegas.it"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1B5E5F] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-[#0F4142] transition shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Visita Sito Ufficiale</span>
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Location Details & ZTL Box */}
          <div className="space-y-6">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">
                Sede Principale
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-teal-900 mt-1 mb-4">
                DOVE SIAMO
              </h2>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Siamo nel Centro Storico di Napoli, al 3° piano dello storico Palazzo
              Pignatelli di Monteleone (XVI secolo), in Calata Trinità Maggiore 53,
              angolo Piazza del Gesù Nuovo, all&apos;interno della Maison Degas – Dimora
              de Charme.
            </p>

            {/* ZTL Information Box */}
            <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center text-lg shrink-0">
                  <ParkingIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    ZTL (Zona a Traffico Limitato)
                  </h3>
                  <p className="text-xs text-amber-800 font-medium">
                    Informazioni utili per i visitatori
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">
                I nostri uffici si trovano nel cuore del centro storico di Napoli,
                all&apos;interno della Zona a Traffico Limitato (ZTL) e dell&apos;area
                pedonale di Piazza del Gesù Nuovo.
              </p>

              <div className="text-xs text-gray-700 space-y-2 font-medium pt-1">
                <p className="flex items-start gap-2">
                  <ClockIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Orari varco:</strong> Attivo tutti i giorni, 24 ore su 24.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <ShieldIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    L&apos;accesso all&apos;area pedonale è presidiato dal varco
                    elettronico di Calata Trinità Maggiore.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <ParkingIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Transito consentito esclusivamente ai veicoli muniti di apposito
                    permesso.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <ShieldIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Motocicli e scooter non sono autorizzati salvo espressa deroga
                    comunale.
                  </span>
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="#contact-form-section"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow hover:opacity-95 transition"
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span>CONTATTACI PER ASSISTENZA</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy-conscious, Lazy-Loaded Google Maps Embed */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100 relative">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Posizione:</strong> Calata Trinità Maggiore, 53, 80134 Napoli (Piazza del Gesù Nuovo)
              </span>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Calata+Trinit%C3%A0+Maggiore+53+80134+Napoli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-teal-800 font-bold hover:text-teal-950 underline shrink-0"
            >
              <span>Apri su Google Maps</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="h-[420px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.0649755490715!2d14.25055047656606!3d40.84632832924376!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0844f2b960b7%3A0x67c76ec7c0e5a95!2sCalata%20Trinit%C3%A0%20Maggiore%2C%2053%2C%2080134%20Napoli%20NA!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa interattiva della sede IncanTour a Napoli"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
