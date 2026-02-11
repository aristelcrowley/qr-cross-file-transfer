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
      className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-muted hover:text-clay-heading transition-colors self-start"
    >
      <span className="text-lg leading-none">←</span>
      <span>{label}</span>
    </Link>
  );
}
