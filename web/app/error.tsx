"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-[55vh] place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-incan-gold-dark">Qualcosa non va</p>
        <h2 className="mt-3 font-display text-4xl text-incan-teal">Riproviamo?</h2>
        <button onClick={reset} className="mt-6 rounded-full bg-incan-teal px-6 py-3 font-bold text-white">Riprova</button>
      </div>
    </div>
  );
}
