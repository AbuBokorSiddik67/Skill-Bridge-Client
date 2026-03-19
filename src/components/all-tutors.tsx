"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Shield,
  Info,
  Star,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { deleteTutorProfile, updateTutorProfile } from "@/services/tutors";
import Link from "next/link";

export interface ITutor {
  id: string;
  userId: string;
  aboutTutor: string;
  sessionPrice: number;
  experienceYears: number;
  education: string;
  averageRating: number;
  totalReviews: number;
  totalEarnings: number;
  status: "AVAILABLE" | "UNAVAILABLE" | "BUSY";
  createdAt: string;
  updatedAt: string;
}

export default function TutorManagement({
  initialTutors,
}: {
  initialTutors: ITutor[];
}) {
  const [tutors, setTutors] = useState<ITutor[]>(initialTutors);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<ITutor | null>(null);
  const [editForm, setEditForm] = useState<Partial<ITutor>>({});

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.aboutTutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const currentData = filteredTutors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdate = async () => {
    if (!selectedTutor) return;
    try {
        const res = await updateTutorProfile(selectedTutor.id, editForm);
      if (res.success) {
        setTutors(
          tutors.map((t) =>
            t.id === selectedTutor.id ? { ...t, ...editForm } : t,
          ),
        );
        toast.success("Tutor updated successfully.");
        setIsEditSheetOpen(false);
      } else {
        toast.error("Update failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    if (!selectedTutor) return;
    try {
      const res = await deleteTutorProfile(selectedTutor.id);
      if (res.success) {
        setTutors(tutors.filter((t) => t.id !== selectedTutor.id));
        toast.success("Tutor deleted successfully.");
        setIsDeleteDialogOpen(false);
      } else {
        toast.error("Delete failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const statusVariant = (
    status: string,
  ): "secondary" | "outline" | "destructive" => {
    if (status === "AVAILABLE") return "secondary";
    if (status === "BUSY") return "outline";
    return "destructive";
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Tutor Control Center
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage tutor profiles, availability, pricing, and performance.
        </p>
      </div>
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by education, about, or user ID..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Tutor Info</TableHead>
              <TableHead>Session & Experience</TableHead>
              <TableHead>Rating & Earnings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((tutor) => (
                <TableRow
                  key={tutor.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {/* Tutor Info */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">
                        {tutor.education}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                        {tutor.aboutTutor}
                      </p>
                      <p className="flex gap-1 text-[10px] text-muted-foreground/60 font-mono">
                        {/* here link to user with tutor */}
                        {tutor.userId.slice(0, 8)}...
                      </p>
                    </div>
                  </TableCell>

                  {/* Session & Experience */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                        {tutor.sessionPrice}
                        <span className="text-xs font-normal text-muted-foreground">
                          / session
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {tutor.experienceYears} yrs experience
                      </p>
                    </div>
                  </TableCell>

                  {/* Rating & Earnings */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <Star className="h-3.5 w-3.5 text-muted-foreground" />
                        {tutor.averageRating.toFixed(1)}
                        <span className="text-xs font-normal text-muted-foreground">
                          ({tutor.totalReviews})
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ${tutor.totalEarnings.toLocaleString()} earned
                      </p>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={statusVariant(tutor.status)}
                      className="text-[10px]"
                    >
                      {tutor.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTutor(tutor);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTutor(tutor);
                          setEditForm(tutor);
                          setIsEditSheetOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTutor(tutor);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No tutors found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20 text-sm">
          <p className="text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredTutors.length)} of{" "}
            {filteredTutors.length} tutors
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      {/* VIEW DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-semibold">
              <Info className="h-4 w-4 text-muted-foreground" /> Tutor
              Information
            </DialogTitle>
          </DialogHeader>
          {selectedTutor && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-lg border border-border">
                <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center border border-border">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {selectedTutor.education}
                  </p>
                  <Badge
                    variant={statusVariant(selectedTutor.status)}
                    className="text-[10px]"
                  >
                    {selectedTutor.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  {
                    label: "Session Price",
                    value: `$${selectedTutor.sessionPrice}`,
                  },
                  {
                    label: "Experience",
                    value: `${selectedTutor.experienceYears} years`,
                  },
                  {
                    label: "Avg Rating",
                    value: `${selectedTutor.averageRating.toFixed(1)} (${selectedTutor.totalReviews} reviews)`,
                  },
                  {
                    label: "Total Earnings",
                    value: `$${selectedTutor.totalEarnings.toLocaleString()}`,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-0.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                      {label}
                    </p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                ))}
                <div className="col-span-2 space-y-0.5">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                    User ID
                  </p>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {selectedTutor.userId}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-1">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                  About
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedTutor.aboutTutor || "No description provided."}
                </p>
              </div>

              <div className="flex gap-6 text-[11px] text-muted-foreground pt-1">
                <span>
                  Created:{" "}
                  {new Date(selectedTutor.createdAt).toLocaleDateString()}
                </span>
                <span>
                  Updated:{" "}
                  {new Date(selectedTutor.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* EDIT SHEET */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:!max-w-none sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] overflow-y-auto p-8"
          key={selectedTutor?.id}
        >
          <SheetHeader className="border-b pb-4 mb-6">
            <SheetTitle className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" /> Edit Tutor
            </SheetTitle>
          </SheetHeader>

          {selectedTutor && (
            <div className="flex flex-col gap-8">
              {/* Profile Details */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Profile Details
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Education</Label>
                    <Input
                      value={editForm.education ?? ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, education: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Session Price ($)</Label>
                    <Input
                      type="number"
                      value={editForm.sessionPrice ?? ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          sessionPrice: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Experience (Years)</Label>
                    <Input
                      type="number"
                      value={editForm.experienceYears ?? ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          experienceYears: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1.5 lg:col-span-3">
                    <Label className="text-sm">About Tutor</Label>
                    <Input
                      value={editForm.aboutTutor ?? ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, aboutTutor: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Performance Stats (read-only) */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Performance Stats
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { label: "Average Rating", value: editForm.averageRating },
                    { label: "Total Reviews", value: editForm.totalReviews },
                    {
                      label: "Total Earnings ($)",
                      value: editForm.totalEarnings,
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="space-y-1.5">
                      <Label className="text-sm text-muted-foreground">
                        {label}
                      </Label>
                      <Input
                        value={value ?? ""}
                        disabled
                        className="bg-muted/40 cursor-not-allowed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-muted/30 p-5 rounded-lg border border-border space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Availability Status
                </p>
                <div className="max-w-xs space-y-1.5">
                  <Label className="text-sm">Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(val) =>
                      setEditForm({
                        ...editForm,
                        status: val as ITutor["status"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AVAILABLE">Available</SelectItem>
                      <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                      <SelectItem value="BUSY">Busy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="sticky bottom-0 bg-background pt-2 pb-1">
                <Button onClick={handleUpdate} className="w-full" size="lg">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      {/* DELETE DIALOG */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader className="flex flex-col items-center gap-3 pt-2">
            <div className="h-11 w-11 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Delete Tutor?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-sm">
            You are about to delete tutor{" "}
            <span className="font-medium text-foreground">
              {selectedTutor?.education}
            </span>
            . This may cause data inconsistencies.
          </DialogDescription>
          <DialogFooter className="flex gap-2 sm:justify-center mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

