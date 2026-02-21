"use client";

import Link from "next/link";

interface BackLinkProps {
  href?: string;
  label?: string;
  onClick?: () => void | Promise<void>;
}

export default function BackLink({
  href = "/action",
  label = "Back",
  onClick,
}: BackLinkProps) {
  const handleClick = async (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      await onClick();
      window.location.href = href;
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors duration-200 self-start group"
    >
      <span className="text-lg leading-none group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
      <span>{label}</span>
    </Link>
  );
}
