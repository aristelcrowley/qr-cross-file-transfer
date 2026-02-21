"use client";

import { useRouter } from "next/navigation";
import type { SessionState } from "@/types";
import { setSessionState } from "@/services/session.service";

interface ActionCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  sessionState: SessionState;
}

export default function ActionCard({
  href,
  icon,
  title,
  description,
  sessionState,
}: ActionCardProps) {
  const router = useRouter();

  const handleClick = async () => {
    await setSessionState(sessionState);
    router.push(href);
  };

  return (
    <button onClick={handleClick} className="block group text-left w-full">
      <div className="clay-card p-8 sm:p-10 text-center group-hover:scale-[1.02] group-hover:border-indigo-500/25 group-active:scale-[0.98] transition-all duration-300">
        <span className="text-4xl sm:text-5xl block mb-5 group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <h3 className="text-lg font-bold text-clay-heading mb-1.5">{title}</h3>
        <p className="text-sm text-clay-muted leading-relaxed">{description}</p>
      </div>
    </button>
  );
}
