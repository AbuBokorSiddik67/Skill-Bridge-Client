"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  AlignLeft,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Fixed Zod Schema with explicit Enum values
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["STUDENT", "TUTOR"], {
    errorMap: () => ({ message: "Role must be either STUDENT or TUTOR" }),
  }),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  imageLink: z.string().url("Invalid image URL"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  address: z.string().min(5, "Address is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "STUDENT",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      console.log("Registering Data:", data);
      // Example: const res = await registerUser(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.message || "An error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl space-y-8 bg-card p-8 rounded-2xl border shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">
            Enter your details to join SkillBridge
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("name")}
                id="name"
                placeholder="John Doe"
                className="pl-10"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="user@test.com"
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="••••••"
                className="pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label>Role</Label>
            <Select onValueChange={(value) => setValue("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="TUTOR">Tutor</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("phone")}
                id="phone"
                placeholder="01711111111"
                className="pl-10"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Image Link */}
          <div className="space-y-2">
            <Label htmlFor="imageLink">Profile Image URL</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("imageLink")}
                id="imageLink"
                placeholder="https://i.pravatar.cc/300"
                className="pl-10"
              />
            </div>
            {errors.imageLink && (
              <p className="text-xs text-destructive">
                {errors.imageLink.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("address")}
                id="address"
                placeholder="Dhaka, Bangladesh"
                className="pl-10"
              />
            </div>
            {errors.address && (
              <p className="text-xs text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                {...register("bio")}
                id="bio"
                placeholder="Briefly describe yourself..."
                className="pl-10 pt-2"
              />
            </div>
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full md:col-span-2 h-12 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
