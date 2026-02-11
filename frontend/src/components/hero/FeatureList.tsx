"use client";

export default function FeatureList() {
  const features = [
    {
      icon: "⚡",
      title: "Instant Transfer",
      desc: "Files move directly between devices at full LAN speed.",
    },
    {
      icon: "🔒",
      title: "Completely Private",
      desc: "No cloud, no servers — your files never leave your network.",
    },
    {
      icon: "📱",
      title: "Works Everywhere",
      desc: "Any device with a browser. No app install required.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
      {features.map((f) => (
        <div
          key={f.title}
          className="clay-card p-5 text-center space-y-2"
        >
          <span className="text-2xl block">{f.icon}</span>
          <h3 className="text-sm font-bold text-clay-heading">{f.title}</h3>
          <p className="text-xs text-clay-muted leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
