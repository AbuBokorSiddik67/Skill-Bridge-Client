import { CheckCircle2, Users, GraduationCap, Globe } from "lucide-react";

const benefits = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Expert Mentors",
    description:
      "Learn from industry professionals working in top tech companies.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Global Community",
    description: "Connect with 50k+ students and alumni worldwide.",
  },
  {
    icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    title: "Flexible Learning",
    description: "Access your courses 24/7 on any device at your own pace.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Recognized Certificates",
    description: "Get certificates that are valued by multinational employers.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Why SkillBridge is the best choice for your career
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border bg-background rounded-xl">
                <p className="text-3xl font-bold text-primary">95%</p>
                <p className="text-sm text-muted-foreground">
                  Job Placement Rate
                </p>
              </div>
              <div className="p-4 border bg-background rounded-xl">
                <p className="text-3xl font-bold text-primary">120+</p>
                <p className="text-sm text-muted-foreground">
                  Expert Instructors
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-2xl border hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
