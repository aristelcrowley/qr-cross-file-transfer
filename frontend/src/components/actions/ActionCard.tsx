"use client";

import Link from "next/link";

interface ActionCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export default function ActionCard({
  href,
  icon,
  title,
  description,
}: ActionCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="clay-card p-7 sm:p-8 text-center group-hover:scale-[1.03] group-active:scale-[0.98] transition-all duration-200">
        <span className="text-4xl sm:text-5xl block mb-4">{icon}</span>
        <h3 className="text-lg font-bold text-clay-heading mb-1">{title}</h3>
        <p className="text-sm text-clay-muted leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
