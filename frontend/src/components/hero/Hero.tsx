"use client";

export default function Hero() {
  return (
    <section className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl clay-badge text-3xl">
        🔄
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-clay-heading">
        QR Cross File Transfer
      </h1>
      <p className="text-base sm:text-lg text-clay-muted max-w-sm mx-auto leading-relaxed">
        Instant, private file sharing between your devices.
        <br className="hidden sm:block" />
        No cloud. No sign-up. Just Wi-Fi.
      </p>
    </section>
  );
}
