"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  DollarSign,
  Briefcase,
  BookOpen,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// আপনার JSON ডাটা অনুযায়ী ইন্টারফেস
interface CreateTutorFormValues {
  userId: string;
  aboutTutor: string;
  sessionPrice: number;
  experienceYears: number;
  education: string;
}

const CreateTutorPage = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const form = useForm<CreateTutorFormValues>({
    defaultValues: {
      userId: userId || "", // ইউজারের আইডি প্রপস থেকে আসবে
      aboutTutor: "",
      sessionPrice: 0,
      experienceYears: 0,
      education: "",
    },
  });

  const onSubmit = async (values: CreateTutorFormValues) => {
    try {
      console.log("Creating Tutor Profile: ", values);

      // এখানে আপনার API কল হবে (যেমন: createTutorProfile)
      // const res = await createTutorProfile(values);

      toast.success("Tutor profile created successfully!");
      router.push("/profile"); // সফল হলে প্রোফাইলে পাঠিয়ে দিবে
    } catch (error) {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-background p-4 md:p-10 flex justify-center items-start">
      <Card className="max-w-2xl w-full shadow-lg border-border bg-card">
        <CardHeader className="border-b pb-6 space-y-2">
          <div className="flex items-center gap-3 text-primary">
            <PlusCircle className="h-8 w-8" />
            <CardTitle className="text-2xl font-extrabold tracking-tight">
              Create Tutor Profile
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete your professional profile to start accepting students.
          </p>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* User ID - Hidden or Read Only */}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase opacity-60">
                      Account ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        className="bg-muted font-mono text-xs"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Session Price */}
                <FormField
                  control={form.control}
                  name="sessionPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" /> Session
                        Price (৳)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 500"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Experience Years */}
                <FormField
                  control={form.control}
                  name="experienceYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />{" "}
                        Experience (Years)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 3"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Education */}
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />{" "}
                      Educational Qualification
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. BSc in Mathematics" {...field} />
                    </FormControl>
                    <FormDescription className="text-[10px]">
                      State your highest degree or current study.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* About Tutor (Bio) */}
              <FormField
                control={form.control}
                name="aboutTutor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" /> About Your
                      Teaching
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell students about your teaching methods and expertise..."
                        {...field}
                        className="min-h-[150px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold gap-2"
                >
                  Create Professional Profile <ArrowRight className="h-5 w-5" />
                </Button>
                <p className="text-center text-[11px] text-muted-foreground mt-4">
                  By creating a profile, you agree to our tutor guidelines.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTutorPage;
