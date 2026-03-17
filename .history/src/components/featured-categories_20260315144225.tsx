import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    title: "Full-Stack Web Dev",
    level: "Beginner",
    price: "$49",
    duration: "12 Weeks",
  },
  {
    title: "UI/UX Design Masterclass",
    level: "Intermediate",
    price: "$39",
    duration: "8 Weeks",
  },
  {
    title: "Data Science with Python",
    level: "Advanced",
    price: "$59",
    duration: "10 Weeks",
  },
];

export function FeaturedCourses() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Courses
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick the best course to boost your career
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.title}
              className="overflow-hidden border-2 hover:border-primary transition-all"
            >
              <div className="aspect-video bg-muted" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">{course.level}</Badge>
                  <span className="font-bold text-primary">{course.price}</span>
                </div>
                <CardTitle className="mt-2">{course.title}</CardTitle>
                <CardDescription>{course.duration}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
