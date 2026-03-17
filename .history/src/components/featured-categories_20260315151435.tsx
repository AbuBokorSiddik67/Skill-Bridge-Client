"use client";
import {
  Code,
  Palette,
  BarChart,
  Languages,
  Music,
  Microscope,
} from "lucide-react";

const categories = [
  {
    name: "Web Development",
    tutors: "120+ Tutors",
    icon: <Code size={24} />,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "UI/UX Design",
    tutors: "85+ Tutors",
    icon: <Palette size={24} />,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "Data Science",
    tutors: "60+ Tutors",
    icon: <BarChart size={24} />,
    color: "bg-green-500/10 text-green-600",
  },
  {
    name: "Languages",
    tutors: "200+ Tutors",
    icon: <Languages size={24} />,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "Music & Art",
    tutors: "45+ Tutors",
    icon: <Music size={24} />,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    name: "Science",
    tutors: "90+ Tutors",
    icon: <Microscope size={24} />,
    color: "bg-teal-500/10 text-teal-600",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-10 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Section - Better Alignment */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">
            Browse by Category
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Find the perfect expert tutor based on your interest and career
            goals.
          </p>
        </div>

        {/* Responsive Grid - Adjusted for all screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group relative flex flex-col items-center justify-center p-8 rounded-3xl border bg-card/50 hover:bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Icon Container - Fixed Size */}
              <div
                className={`w-14 h-14 mb-5 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 ${cat.color}`}
              >
                {cat.icon}
              </div>

              {/* Text Content */}
              <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                {cat.tutors}
              </p>

              {/* Subtle Overlay Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-3xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
