"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, BookOpen, Clock } from "lucide-react";

type TutorProfile = {
  id: string;
  aboutTutor: string;
  sessionPrice: number;
  experienceYears: number;
  education: string;
  averageRating: number;
  totalReviews: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    imageLink: string;
    bio: string;
    address: string;
    status: string;
  };
};

function TutorCardSkeleton() {
  return (
    <Card className="rounded-xl border border-neutral-200 dark:border-neutral-800">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-3 w-full mb-1.5" />
        <Skeleton className="h-3 w-3/4 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export default function TutorListPage() {
  const router = useRouter();
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(
          "https://skillbridgeserver-gules.vercel.app/v1/api/tutors/all-account",
        );
        const json = await res.json();
        setTutors(json.data || []);
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Find a tutor
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
          Browse verified tutors and book a session
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <TutorCardSkeleton key={i} />
            ))
          : tutors.map((tutor) => (
              <Card
                key={tutor.id}
                onClick={() => router.push(`/tutors/${tutor.id}`)}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-sm transition-all duration-200"
              >
                <CardContent className="p-5">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={tutor.user.imageLink}
                        alt={tutor.user.name}
                      />
                      <AvatarFallback className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm font-medium">
                        {getInitials(tutor.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 leading-tight">
                        {tutor.user.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {tutor.education}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                    {tutor.user.bio}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal gap-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-0"
                    >
                      <Clock className="w-3 h-3" />
                      {tutor.experienceYears} yrs exp
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs font-normal text-emerald-700 border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400"
                    >
                      {tutor.status}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal gap-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-0"
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {tutor.averageRating} ({tutor.totalReviews})
                    </Badge>
                  </div>

                  {/* Address */}
                  {tutor.user.address && (
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1 mt-1.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {tutor.user.address}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="px-5 pb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                      ৳{tutor.sessionPrice}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {" "}
                      / session
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/tutors/${tutor.id}`);
                    }}
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    Book
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
}
