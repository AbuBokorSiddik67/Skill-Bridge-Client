"use client";

import {
  MapPin,
  Phone,
  Mail,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types";

export default function TutorAccountPage({ user }: { user: IUser }) {
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const lastUpdated = new Date(user.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner */}
      <div className="h-40 w-full bg-muted/60 relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--foreground) / 0.15) 0%, transparent 60%),
                              radial-gradient(circle at 80% 20%, hsl(var(--foreground) / 0.08) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute bottom-4 right-6 text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
          Member since {joinedDate}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        {/* Avatar & Name Row */}
        <div className="flex items-end gap-5 -mt-14 mb-8">
          <div className="relative shrink-0">
            <img
              src={user.imageLink || "https://github.com/shadcn.png"}
              alt={user.name}
              className="h-28 w-28 rounded-2xl object-cover border-4 border-background shadow-md"
            />
            <span
              className={`absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-full border-2 border-background ${
                user.status === "ACTIVE" ? "bg-emerald-500" : "bg-destructive"
              }`}
            />
          </div>

          <div className="pb-1 flex-1 flex flex-col gap-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-semibold text-foreground leading-none">
                {user.name}
              </h1>
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-wider font-semibold"
              >
                {user.role}
              </Badge>
              <Badge
                variant={user.status === "ACTIVE" ? "secondary" : "destructive"}
                className="text-[10px]"
              >
                {user.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bio Card — spans 2 cols */}
          <div className="md:col-span-2 rounded-lg border border-border bg-card p-5 space-y-2">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              About
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {user.bio || "This user hasn't written a bio yet."}
            </p>
          </div>

          {/* Status Card */}
          <div className="rounded-lg border border-border bg-card p-5 space-y-3">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Account Flags
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Verified
                </span>
                {user.emailVerified ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive/70" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> Deleted
                </span>
                {user.isDeleted ? (
                  <CheckCircle2 className="h-4 w-4 text-destructive" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> Last Login
                </span>
                <span className="text-xs font-medium text-foreground">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleDateString()
                    : "Never"}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 rounded-lg border border-border bg-card p-5 space-y-3">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Contact
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">
                    {user.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Address</p>
                  <p className="text-sm font-medium text-foreground">
                    {user.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="rounded-lg border border-border bg-card p-5 space-y-3">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Timeline
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Joined</p>
                  <p className="text-sm font-medium text-foreground">
                    {joinedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User ID Footer */}
          <div className="md:col-span-3 rounded-lg border border-border bg-muted/30 px-5 py-3 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              User ID
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {user.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
