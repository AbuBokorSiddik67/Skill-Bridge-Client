import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import Image from "next/image";

const topCourses = [
  {
    id: 1,
    title: "Next.js 15 Enterprise Architecture",
    instructor: "Sarah Jenkins",
    rating: 4.9,
    students: "12,400",
    duration: "18h 30m",
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Advanced UI/UX Design Systems",
    instructor: "Michael Chen",
    rating: 4.8,
    students: "8,200",
    duration: "24h 15m",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "AI & Machine Learning with Python",
    instructor: "Dr. Aris Thorne",
    rating: 5.0,
    students: "15,100",
    duration: "42h 00m",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
  },
];

export function TopCourses() {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold  tracking-tight">
              Our Top Rated Courses
            </h2>
            <p className="text-muted-foreground mt-2">
              Learn from our most popular and highest rated programs.
            </p>
          </div>
          <button className="hidden md:block text-primary font-semibold hover:underline">
            View All Courses
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {topCourses.map((course) => (
            <Card
              key={course.id}
              className="group overflow-hidden border-none shadow-none bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-background/80 text-foreground backdrop-blur-md">
                  {course.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-yellow-600 mb-3">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.students} students)
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  By {course.instructor}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    Full Access
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
