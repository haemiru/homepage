export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28 lg:pb-20">
        <p className="eyebrow rise-in flex items-center gap-3">
          <span className="inline-block h-px w-9 bg-persimmon" />
          {eyebrow}
        </p>
        <h1
          className="rise-in mt-7 max-w-3xl font-display text-[clamp(2.1rem,5.6vw,3.6rem)] leading-[1.24]"
          style={{ animationDelay: "0.1s" }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="rise-in mt-8 max-w-2xl text-[1.02rem] leading-[1.95] text-ink-soft"
            style={{ animationDelay: "0.2s" }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
