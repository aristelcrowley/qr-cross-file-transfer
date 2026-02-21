"use client";

export default function Hero() {
  return (
    <section className="text-center space-y-3">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
        <span className="text-xs font-medium text-indigo-300 tracking-wide">Connect Over Local Network</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient leading-snug">
        QR Cross File Transfer
      </h1>
      <p className="text-sm text-clay-muted max-w-xs mx-auto leading-relaxed">
        Scan the code below with your phone to start sharing files.
      </p>
    </section>
  );
}
