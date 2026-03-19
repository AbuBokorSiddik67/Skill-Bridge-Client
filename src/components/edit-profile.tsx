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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Notebook,
  Save,
  X,
  Edit3,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { IUser, IUserResponse } from "@/types";
import { updateStudentProfile } from "@/services/auth";

interface EditProfileFormValues {
  name: string;
  phone: string;
  imageLink: string;
  bio: string;
  address: string;
  status: string;
}

const EditAccount = ({ userData }: { userData: IUserResponse }) => {
  const user = userData.data;

  const form = useForm<EditProfileFormValues>({
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      imageLink: user.imageLink || "",
      bio: user.bio || "",
      address: user.address || "",
      status: user.status || "ACTIVE",
    },
  });

  const onSubmit = async (values: EditProfileFormValues) => {
    try {
      const res = await updateStudentProfile(user.id, values as IUser);
      console.log(user, values)
      if (res.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-background p-4 md:p-10">
      <Card className="max-w-4xl mx-auto shadow-sm border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <Edit3 className="h-6 w-6 text-primary" />
              Edit Account Settings
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Update profile details for {user.name} ({user.role})
            </p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Admin Name"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email (Read Only) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 opacity-70">
                    <Mail className="h-4 w-4" /> Email Address
                  </label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="017XXXXXXXX"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status Selection */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Activity className="h-4 w-4" /> Account Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Profile Image URL */}
                <FormField
                  control={form.control}
                  name="imageLink"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Profile Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/photo.jpg"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dhanmondi, Dhaka"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-2">
                        <Notebook className="h-4 w-4" /> Biography
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          {...field}
                          className="min-h-[120px] bg-background resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <Button type="submit" className="flex-1 gap-2 h-11">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
                <Button type="button" variant="outline" className="flex-1 h-11">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAccount;
