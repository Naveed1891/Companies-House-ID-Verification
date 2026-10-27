import Link from "next/link";
import { Logo } from "./Logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-warm-cream">
      <div className="site-container py-5 sm:py-7"><Logo /></div>
      <div className="site-container flex flex-1 items-center justify-center py-[clamp(1.5rem,5vw,4rem)]">{children}</div>
      <Link href="/" className="sr-only">Back to home</Link>
    </main>
  );
}

export function AuthField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mb-[18px] flex flex-col gap-[7px] text-[13.5px] font-bold text-slate">{label}{children}</label>;
}
