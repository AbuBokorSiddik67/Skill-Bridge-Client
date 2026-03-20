"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Star,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Clock,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import BookingModal from "@/components/booking-modal";
import { getUser } from "@/services/auth";
import { IUser } from "@/types";

type TutorProfile = {
  id: string;
  userId: string;
  aboutTutor: string;
  sessionPrice: number;
  experienceYears: number;
  education: string;
  averageRating: number;
  totalReviews: number;
  totalEarnings: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    imageLink: string;
    bio: string;
    address: string;
    role: string;
    status: string;
    createdAt: string;
  };
};

export default function TutorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchPresentUser = async () => {
      const getPresentUser = await getUser();
      setUser(getPresentUser);
    };
    fetchPresentUser();
  }, [tutor]);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await fetch(
          `https://skillbridgeserver-gules.vercel.app/v1/api/tutors/single/${id}`,
        );
        const json = await res.json();
        setTutor(json.data);
      } catch (err) {
        console.error("Failed to fetch tutor:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTutor();
  }, [id]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-36 mb-6" />
        <Card className="rounded-xl border border-neutral-200 dark:border-neutral-800">
          <CardContent className="p-6 space-y-5">
            <div className="flex gap-4">
              <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-neutral-500">Tutor not found.</p>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-neutral-200 dark:border-neutral-700"
        >
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-5 -ml-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to tutors
      </Button>

      <Card className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <CardContent className="p-6">
          {/* ── Profile header ─────────────────────────────── */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="w-16 h-16 flex-shrink-0">
              <AvatarImage src={tutor.user.imageLink} alt={tutor.user.name} />
              <AvatarFallback className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-lg font-medium">
                {getInitials(tutor.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {tutor.user.name}
                </h1>
                <Badge
                  variant="outline"
                  className="shrink-0 text-emerald-700 border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400 text-xs"
                >
                  {tutor.status}
                </Badge>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                {tutor.education}
              </p>
              {tutor.user.address && (
                <p className="text-sm text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {tutor.user.address}
                </p>
              )}
            </div>
          </div>

          {/* ── Stats ──────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              {
                icon: (
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                ),
                label: "Rating",
                value: tutor.averageRating,
              },
              {
                icon: <MessageSquare className="w-4 h-4 text-neutral-400" />,
                label: "Reviews",
                value: tutor.totalReviews,
              },
              {
                icon: <Clock className="w-4 h-4 text-neutral-400" />,
                label: "Experience",
                value: `${tutor.experienceYears} yrs`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 text-center"
              >
                <div className="flex justify-center mb-1.5">{s.icon}</div>
                <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                  {s.value}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Separator className="bg-neutral-100 dark:bg-neutral-800 mb-5" />

          {/* ── About ──────────────────────────────────────── */}
          <div className="mb-5">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-2">
              About
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {tutor.aboutTutor}
            </p>
          </div>

          <Separator className="bg-neutral-100 dark:bg-neutral-800 mb-5" />

          {/* ── Contact info ───────────────────────────────── */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-3">
              Contact
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-500 dark:text-neutral-400 w-16">
                  Email
                </span>
                <span className="text-neutral-900 dark:text-neutral-50 ml-auto truncate">
                  {tutor.user.email}
                </span>
              </div>
              {tutor.user.phone && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span className="text-neutral-500 dark:text-neutral-400 w-16">
                    Phone
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-50 ml-auto">
                    {tutor.user.phone}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-neutral-100 dark:bg-neutral-800 mb-5" />

          {/* ── Booking bar ────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                ৳{tutor.sessionPrice}
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {" "}
                / session
              </span>
            </div>
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              className="bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Book a session
            </Button>
          </div>
        </CardContent>
      </Card>

      {modalOpen && (
        <BookingModal
          tutor={tutor}
          onClose={() => setModalOpen(false)}
          studentId={user?.id}
        />
      )}
    </div>
  );
}
