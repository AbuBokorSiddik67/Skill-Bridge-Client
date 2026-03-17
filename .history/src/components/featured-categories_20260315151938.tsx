"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay"; // এটি ইম্পোর্ট করতে হবে
import {
  Code,
  Palette,
  BarChart,
  Languages,
  Music,
  Microscope,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
  // Autoplay প্লাগিন সেটআপ (২ সেকেন্ড পর পর চেঞ্জ হবে)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            Find the perfect expert tutor based on your interest and career
            goals.
          </p>
        </div>

        {/* Carousel without buttons */}
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true, // ইনফিনিট লুপ
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <div className="group relative flex flex-col items-center justify-center p-8 rounded-3xl border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 mb-5 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 ${cat.color}`}
                  >
                    {cat.icon}
                  </div>

                  {/* Text Content */}
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors text-center">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground font-medium">
                    {cat.tutors}
                  </p>

                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-3xl pointer-events-none" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
