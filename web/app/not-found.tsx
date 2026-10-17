import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[55vh] place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-incan-gold-dark">404</p>
        <h1 className="mt-3 font-display text-5xl text-incan-teal">Questa destinazione non esiste.</h1>
        <p className="mt-5 text-slate-600">Forse il percorso è cambiato durante la migrazione del sito.</p>
        <Link href="/" className="mt-7 inline-flex rounded-full bg-incan-teal px-6 py-3 font-bold text-white">Torna alla home</Link>
      </div>
    </div>
  );
}
