import { WhatsAppIcon } from "@/components/ui/icons";

export function FloatingActions() {
  return (
    <aside aria-label="Azioni rapide di contatto" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/393384357143"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatta con noi su WhatsApp (+39 338 435 7143)"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition duration-300 hover:scale-110 hover:bg-[#20ba5a] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
      >
        <WhatsAppIcon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />

        {/* Accessible visual tooltip on desktop hover */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Parla con noi su WhatsApp
        </span>
      </a>
    </aside>
  );
}
