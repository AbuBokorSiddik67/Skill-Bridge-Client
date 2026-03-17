import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IUserResponse } from "@/types";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Briefcase,
  Info,
  Edit3,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const ProfilePage = ({ userData }: { userData: IUserResponse }) => {
  const user = userData.data;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="w-full min-h-screen bg-background border rounded-xl overflow-hidden shadow-sm">
      {/* Header / Banner - Responsive Height */}
      <div className="h-32 md:h-48 bg-muted relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />

        {/* Profile Info Overlay - Mobile Optimized */}
        <div className="absolute -bottom-16 left-4 md:left-10 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            <AvatarImage
              src={user.imageLink}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback className="text-xl md:text-2xl font-bold bg-secondary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="mb-0 md:mb-4 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {user.name}
            </h1>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <Briefcase className="h-4 w-4" /> {user.role}
            </p>
          </div>
        </div>

        {/* Edit Button - Hidden on extreme small, shown on top right for mobile */}
        <div className="absolute top-4 right-4">
          <Link href={"/dashboard/edit-profile"}>
            <Button variant="secondary" size="sm" className="gap-2 shadow-sm">
              <Edit3 className="h-4 w-4" />
              <span className="hidden sm:inline">Edit Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-20 md:mt-24 px-4 md:px-10 pb-12">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Left Column: Essential Info (Order changed for mobile) */}
          <div className="col-span-12 lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <Info className="h-5 w-5 text-muted-foreground" /> Basic
                Information
              </h3>
              <div className="space-y-3 bg-card p-5 rounded-xl border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Status</span>
                  <Badge
                    variant={
                      user.status === "ACTIVE" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Role</span>
                  <span className="font-medium text-foreground">
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Verification
                  </span>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    {user.emailVerified ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />{" "}
                        Verified
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-orange-500" /> Pending
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-muted-foreground" /> System
                Timeline
              </h3>
              <div className="space-y-4 bg-card p-5 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">
                      Created At
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">
                      Last Updated
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Bio & Contact */}
          <div className="col-span-12 lg:col-span-8 space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Biography
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {user.bio || "No bio information provided."}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Contact & Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 border rounded-xl bg-card hover:bg-accent transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">
                      Email
                    </p>
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-xl bg-card hover:bg-accent transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">
                      Phone
                    </p>
                    <p className="text-sm font-medium">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-xl bg-card hover:bg-accent transition-colors md:col-span-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">
                      Address
                    </p>
                    <p className="text-sm font-medium">{user.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Identity Bar */}
            <div className="bg-primary p-6 rounded-2xl text-primary-foreground flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-lg">System Identity</h4>
                <p className="opacity-70 text-xs font-mono truncate max-w-[250px] md:max-w-none">
                  ID: {user.id}
                </p>
              </div>
              <ShieldCheck className="h-10 w-10 opacity-20 hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
