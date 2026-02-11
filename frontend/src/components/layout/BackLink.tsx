import Link from "next/link";

interface BackLinkProps {
  href?: string;
  label?: string;
}

export default function BackLink({
  href = "/action",
  label = "Back",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-muted hover:text-clay-heading transition-colors self-start"
    >
      <span className="text-lg leading-none">←</span>
      <span>{label}</span>
    </Link>
  );
}
