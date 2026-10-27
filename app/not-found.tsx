import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageFrame>
      <section className="bg-off-white">
        <div className="reading-container py-[clamp(5rem,10vw,10rem)] text-center">
          <p className="mb-4 text-[12.5px] font-bold tracking-[0.1em] text-orange-accent uppercase">Page not found</p>
          <h1 className="display mb-5">404</h1>
          <p className="body-copy mx-auto mb-8 max-w-md text-muted-text">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/" className="button button-primary">Back to home</Link>
            <Link href="/contact" className="button button-outline">Contact us</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
