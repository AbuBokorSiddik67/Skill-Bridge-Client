"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Loader2, MapPin, Video } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type TutorProfile = {
  id: string;
  sessionPrice: number;
  user: {
    id: string;
    name: string;
  };
};

type LocationType = "online" | "in-person";

type BookingForm = {
  categoryId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  locationType: LocationType;
  location: string;
  meetingLink: string;
  notes: string;
  paymentMethod: string;
};

type Props = {
  tutor: TutorProfile;
  onClose: () => void;
  /** Pass the logged-in student's id from your auth session/context */
  studentId?: string;
};

// ── Static data ───────────────────────────────────────────────────────────────

// Replace these with real category IDs from your DB / API call
const CATEGORIES = [
  { id: "cat-math", label: "Mathematics" },
  { id: "cat-english", label: "English" },
  { id: "cat-physics", label: "Physics" },
  { id: "cat-chemistry", label: "Chemistry" },
  { id: "cat-biology", label: "Biology" },
  { id: "cat-ict", label: "ICT / Programming" },
  { id: "cat-bangla", label: "Bangla" },
  { id: "cat-other", label: "Other" },
];

const PAYMENT_METHODS = [
  { value: "CASH", label: "Cash" },
  { value: "BKASH", label: "bKash" },
  { value: "NAGAD", label: "Nagad" },
  { value: "CARD", label: "Card" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function BookingModal({
  tutor,
  onClose,
  studentId = "",
}: Props) {
  const [form, setForm] = useState<BookingForm>({
    categoryId: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    locationType: "online",
    location: "",
    meetingLink: "",
    notes: "",
    paymentMethod: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof BookingForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    // ── Validation ───────────────────────────────────────
    if (
      !form.categoryId ||
      !form.startDate ||
      !form.startTime ||
      !form.endDate ||
      !form.endTime ||
      !form.paymentMethod
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.locationType === "in-person" && !form.location.trim()) {
      setError("Please enter a session address.");
      return;
    }

    setError("");
    setLoading(true);

    const payload = {
      tutorId: tutor.id,
      studentId,
      categoryId: form.categoryId,
      startDate: new Date(`${form.startDate}T${form.startTime}`).toISOString(),
      endDate: new Date(`${form.endDate}T${form.endTime}`).toISOString(),
      totalPrice: tutor.sessionPrice,
      location:
        form.locationType === "in-person" ? form.location.trim() : "Online",
      meetingLink:
        form.locationType === "online" && form.meetingLink.trim()
          ? form.meetingLink.trim()
          : null,
      notes: form.notes.trim() || null,
      paymentMethod: form.paymentMethod,
    };

    try {
      const res = await fetch(
        "https://skillbridgeserver-gules.vercel.app/v1/api/bookings/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Booking failed");
      }

      setSuccess(true);
    } catch (err: Error | unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
        {/* ── Success state ─────────────────────────────── */}
        {success ? (
          <div className="flex flex-col items-center text-center py-4 gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Booking confirmed!
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                Your session with{" "}
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {tutor.user.name}
                </span>{" "}
                has been requested. You will receive a confirmation shortly.
              </p>
            </div>
            <Button
              onClick={onClose}
              className="mt-2 w-full bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* ── Header ─────────────────────────────────── */}
            <DialogHeader className="mb-1">
              <DialogTitle className="text-neutral-900 dark:text-neutral-50">
                Book a session
              </DialogTitle>
              <DialogDescription className="text-neutral-500 dark:text-neutral-400">
                With{" "}
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {tutor.user.name}
                </span>{" "}
                &mdash; ৳{tutor.sessionPrice} / session
              </DialogDescription>
            </DialogHeader>

            <Separator className="bg-neutral-100 dark:bg-neutral-800 my-3" />

            <div className="space-y-4">
              {/* Subject / Category */}
              <div className="space-y-1.5">
                <Label className="text-neutral-700 dark:text-neutral-300">
                  Subject / Category <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(val) => set("categoryId", val)}>
                  <SelectTrigger className="border-neutral-200 dark:border-neutral-700">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start date & time */}
              <div className="space-y-1.5">
                <Label className="text-neutral-700 dark:text-neutral-300">
                  Start <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                    className="border-neutral-200 dark:border-neutral-700"
                  />
                  <Input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => set("startTime", e.target.value)}
                    className="border-neutral-200 dark:border-neutral-700"
                  />
                </div>
              </div>

              {/* End date & time */}
              <div className="space-y-1.5">
                <Label className="text-neutral-700 dark:text-neutral-300">
                  End <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => set("endDate", e.target.value)}
                    className="border-neutral-200 dark:border-neutral-700"
                  />
                  <Input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => set("endTime", e.target.value)}
                    className="border-neutral-200 dark:border-neutral-700"
                  />
                </div>
              </div>

              {/* Session type */}
              <div className="space-y-2">
                <Label className="text-neutral-700 dark:text-neutral-300">
                  Session type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={form.locationType}
                  onValueChange={(val: string) =>
                    set("locationType", val as LocationType)
                  }
                  className="flex gap-5"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="online"
                      id="loc-online"
                      className="border-neutral-300 dark:border-neutral-600"
                    />
                    <Label
                      htmlFor="loc-online"
                      className="flex items-center gap-1.5 cursor-pointer font-normal text-neutral-700 dark:text-neutral-300"
                    >
                      <Video className="w-3.5 h-3.5 text-neutral-400" />
                      Online
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="in-person"
                      id="loc-inperson"
                      className="border-neutral-300 dark:border-neutral-600"
                    />
                    <Label
                      htmlFor="loc-inperson"
                      className="flex items-center gap-1.5 cursor-pointer font-normal text-neutral-700 dark:text-neutral-300"
                    >
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      In-person
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Online: meeting link (optional) */}
              {form.locationType === "online" && (
                <div className="space-y-1.5">
                  <Label className="text-neutral-700 dark:text-neutral-300">
                    Meeting link{" "}
                    <span className="text-neutral-400 text-xs font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={form.meetingLink}
                    onChange={(e) => set("meetingLink", e.target.value)}
                    className="border-neutral-200 dark:border-neutral-700"
                  />
                </div>
              )}

              {/* In-person: address (required) */}
              {form.locationType === "in-person" && (
                <div className="space-y-1.5">
                  <Label className="text-neutral-700 dark:text-neutral-300">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Enter session address"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    className="border-neutral-200 dark:border-neutral-700"
                  />
                </div>
              )}

              {/* Payment method */}
              <div className="space-y-1.5">
                <Label className="text-neutral-700 dark:text-neutral-300">
                  Payment method <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(val) => set("paymentMethod", val)}>
                  <SelectTrigger className="border-neutral-200 dark:border-neutral-700">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label className="text-neutral-700 dark:text-neutral-300">
                  Notes{" "}
                  <span className="text-neutral-400 text-xs font-normal">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  placeholder="Tell the tutor what you need help with..."
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className="resize-none border-neutral-200 dark:border-neutral-700"
                />
              </div>
            </div>

            {/* Price summary */}
            <div className="mt-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Total
              </span>
              <span className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                ৳{tutor.sessionPrice}
              </span>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="flex-1 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Confirming..." : "Confirm booking"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
