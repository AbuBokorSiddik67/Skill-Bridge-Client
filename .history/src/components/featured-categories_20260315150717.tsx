"use client"
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
    icon: <Code />,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "UI/UX Design",
    tutors: "85+ Tutors",
    icon: <Palette />,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "Data Science",
    tutors: "60+ Tutors",
    icon: <BarChart />,
    color: "bg-green-500/10 text-green-600",
  },
  {
    name: "Languages",
    tutors: "200+ Tutors",
    icon: <Languages />,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "Music & Art",
    tutors: "45+ Tutors",
    icon: <Music />,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    name: "Science",
    tutors: "90+ Tutors",
    icon: <Microscope />,
    color: "bg-teal-500/10 text-teal-600",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-4 text-muted-foreground">
            Find the perfect tutor based on your interest
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group cursor-pointer p-6 rounded-2xl border bg-card hover:border-primary transition-all text-center"
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.tutors}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
