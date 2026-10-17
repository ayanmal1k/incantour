import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/ui/icons";

export function SocialSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-primary py-24 text-white"
      aria-label="Segui i nostri canali social"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl text-white drop-shadow-sm">
            Segui i nostri social
          </h2>
          <p className="mt-4 text-lg text-amber-100 sm:text-xl">
            Resta connesso con il mondo Incantour…
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
            <a
              href="https://instagram.com/incantour"
              target="_blank"
              rel="noreferrer"
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white/15 px-8 py-4 font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold"
            >
              <InstagramIcon className="h-6 w-6 text-amber-300 transition duration-300 group-hover:scale-110" />
              <span>@incantour</span>
            </a>

            <a
              href="https://facebook.com/incantour"
              target="_blank"
              rel="noreferrer"
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white/15 px-8 py-4 font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold"
            >
              <FacebookIcon className="h-6 w-6 text-amber-300 transition duration-300 group-hover:scale-110" />
              <span>IncanTour Official</span>
            </a>

            <a
              href="https://twitter.com/incantour"
              target="_blank"
              rel="noreferrer"
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white/15 px-8 py-4 font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-incan-gold"
            >
              <TwitterIcon className="h-6 w-6 text-amber-300 transition duration-300 group-hover:scale-110" />
              <span>@incantour</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
