const EVALUATE_URL = "https://www.trustpilot.com/evaluate/companieshouseidverification.com";

function TrustpilotStars() {
  return (
    <div className="flex gap-1" aria-label="Rated 4.8 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className="grid h-7 w-7 place-items-center rounded-[2px] bg-[#00b67a] text-[13px] leading-none text-white"
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TrustpilotReviews() {
  return (
    <section className="border-y border-soft-border bg-white" aria-label="Trustpilot rating">
      <div className="site-container flex flex-col items-center justify-center gap-3 py-4 sm:flex-row sm:gap-5">
        <div className="flex items-center gap-2" aria-label="Trustpilot">
          <span className="text-[1.65rem] leading-none text-[#00b67a]" aria-hidden="true">
            ★
          </span>
          <span className="text-xl font-semibold leading-none tracking-[-0.035em] text-charcoal">
            Trustpilot
          </span>
        </div>

        <span className="hidden h-6 w-px bg-soft-border sm:block" aria-hidden="true" />

        <TrustpilotStars />

        <span className="hidden h-6 w-px bg-soft-border sm:block" aria-hidden="true" />

        <a
          href={EVALUATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-orange-accent underline decoration-orange-accent/30 underline-offset-4 transition-colors hover:text-charcoal focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-accent"
        >
          Leave a review
        </a>
      </div>
    </section>
  );
}
