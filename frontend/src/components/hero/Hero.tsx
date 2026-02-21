"use client";

export default function Hero() {
  return (
    <section className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl clay-badge text-2xl">
        🔄
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gradient leading-tight">
        QR Cross File Transfer
      </h1>
      <p className="text-base sm:text-lg text-clay-muted max-w-md mx-auto leading-relaxed">
        Instant, private file sharing between your devices.
        <br className="hidden sm:block" />
        No cloud. No sign-up. Just Wi-Fi.
      </p>
    </section>
  );
}
