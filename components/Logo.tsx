import Image from "next/image";
import Link from "next/link";

export function Logo({}: { inverse?: boolean } = {}) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center no-underline"
      aria-label="Companies House Identity Verification home"
    >
      <Image
        src="/ch-logo.webp"
        alt="Companies House Identity Verification"
        width={220}
        height={60}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
}
