import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";

const topTutors = [
  {
    id: 1,
    name: "Dr. Aris Thorne",
    specialty: "Full-Stack Web Dev",
    rating: 4.9,
    sessions: 120,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    price: "$25/hr",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    specialty: "UI/UX Design",
    rating: 4.8,
    sessions: 85,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    price: "$20/hr",
  },
  {
    id: 3,
    name: "Michael Chen",
    specialty: "Data Science",
    rating: 5.0,
    sessions: 200,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    price: "$30/hr",
  },
  {
    id: 4,
    name: "Emma Watson",
    specialty: "English Literature",
    rating: 4.7,
    sessions: 95,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    price: "$15/hr",
  },
];

export function TutorCarousel() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">
            Meet Our Expert Tutors
          </h2>
          <p className="text-muted-foreground mt-2">
            Book a 1-on-1 session with the best mentors in the industry.
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {topTutors.map((tutor) => (
              <CarouselItem
                key={tutor.id}
                className="pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="h-24 w-24 rounded-full object-cover border-4 border-primary/10 group-hover:border-primary/50 transition-colors"
                      />
                      <Badge className="absolute -bottom-2 right-0 bg-yellow-500 text-white border-none">
                        <Star size={10} fill="currentColor" className="mr-1" />{" "}
                        {tutor.rating}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg">{tutor.name}</h3>
                    <p className="text-sm text-primary font-medium">
                      {tutor.specialty}
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} /> {tutor.sessions} Sessions
                      </div>
                      <div className="font-bold text-foreground text-sm">
                        {tutor.price}
                      </div>
                    </div>

                    <button className="mt-6 w-full py-2 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      Book Now
                    </button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
