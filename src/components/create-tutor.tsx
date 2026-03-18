"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
} from "lucide-react";
import { toast } from "sonner";
import { ITutorProfile } from "@/types";
import { createTutorProfile } from "@/services/tutors";
import { useRouter } from "next/navigation";

const CreateTutorForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const form = useForm<ITutorProfile>({
    defaultValues: {
      userId: userId,
      aboutTutor: "",
      sessionPrice: 0,
      experienceYears: 0,
      education: "",
    },
  });

  const onSubmit = async (values: ITutorProfile) => {
    const toastId = toast.loading("Creating your tutor profile...");
    try {
      const res = await createTutorProfile({ ...values, userId });

      if (res.success) {
        toast.success("Profile created successfully!", { id: toastId });
        form.reset(); 
        router.push("/dashboard");
        
      } else {
        toast.error(res.message || "Failed to create profile", { id: toastId });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <PlusCircle className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-2xl font-bold">Become a Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="aboutTutor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Professional Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your teaching style..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sessionPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" /> Hourly Rate
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experienceYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" /> Experience (Yrs)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Education
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. BSc in Computer Science"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTutorForm;
