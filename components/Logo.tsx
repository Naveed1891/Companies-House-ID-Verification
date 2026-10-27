import Image from "next/image";
import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center no-underline"
      aria-label="Companies House Identity Verification home"
    >
      {inverse ? (
        <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-1.5">
          <Image
            src="/ch-logo-v2.webp"
            alt="Companies House Identity Verification"
            width={180}
            height={54}
            className="h-10 w-auto"
            priority
          />
        </span>
      ) : (
        <Image
          src="/ch-logo-v2.webp"
          alt="Companies House Identity Verification"
          width={220}
          height={66}
          className="h-12 w-auto"
          priority
        />
      )}
    </Link>
  );
}
