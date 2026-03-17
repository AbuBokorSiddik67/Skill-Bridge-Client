export function LogoCloud() {
  const companies = ["Google", "Microsoft", "Amazon", "Netflix", "Meta"];
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-8">
          Trusted by the world's most innovative companies``
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
          {companies.map((company) => (
            <span key={company} className="text-2xl font-bold tracking-tighter">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
