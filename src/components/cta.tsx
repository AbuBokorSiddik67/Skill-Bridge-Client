import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to start your journey?
        </h2>
        <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
          Join 10,000+ students already learning on SkillBridge. Get unlimited
          access to all courses and mentorship.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" className="font-bold">
            Join Now for Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white hover:bg-white/10 text-white"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
