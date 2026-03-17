import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export function Hero() {
  // throw new Error("Testing SkillBridge Error Page");
  return (
    <section className="relative w-full py-10 lg:py-10 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-20 blur-3xl">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/30" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start space-y-8">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted/50">
              <span className="text-primary mr-2">New</span>
              Explore our latest industry-standard courses
            </div>

            < className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Master New Skills with{" "}
              <span className="text-primary italic">SkillBridge</span>
            </>

            <p className="text-xl text-muted-foreground max-w-[600px]">
              Join thousands of students learning from industry experts. Get
              access to high-quality projects, mentorship, and a community that
              helps you grow.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-12 px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center font-bold text-[10px]"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <p>Trusted by 10k+ students worldwide</p>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative lg:ml-10">
            <div className="relative z-10 rounded-2xl border bg-card p-2 shadow-2xl">
              {/* এখানে আপনি যেকোনো ইমেজ বা ভিডিও থাম্বনেইল দিতে পারেন */}
              <div className="aspect-video rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PlayCircle className="h-10 w-10 text-primary" />
                  </div>
                  <p className="font-semibold">Industry Expert Mentorship</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Live classes & Real-world projects
                  </p>
                </div>
              </div>
            </div>
            {/* Decoration items */}
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-lg bg-primary/10 -z-10" />
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full border-2 border-dashed border-primary/20 -z-10 animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}
