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
import { Checkbox } from "@/components/ui/checkbox";
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
  Lock,
} from "lucide-react";
import { IUser } from "@/types";
import { deleteUserProfile, updateStudentProfile } from "@/services/auth";
import { toast } from "sonner";

export default function DeletedUserManagement({
  initialUsers,
}: {
  initialUsers: IUser[];
}) {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [editForm, setEditForm] = useState<Partial<IUser>>({});

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdate = async () => {
    if (!selectedUser) return;
    try {
      const res = await updateStudentProfile(selectedUser.id, editForm);
      if (res.success) {
        setUsers(
          users.map((u) =>
            u.id === selectedUser.id ? { ...u, ...editForm } : u,
          ),
        );
        toast.success("User updated successfully.");
        setIsEditSheetOpen(false);
      } else {
        toast.error("Update failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    const res = await deleteUserProfile(selectedUser.id);
    if (res.success) {
      toast.success("User permanently deleted successfully.");
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Deleted User Control Center
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage user profiles, roles, and security settings.
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
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
              <TableHead>User</TableHead>
              <TableHead>Role & Status</TableHead>
              <TableHead>Safety</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.imageLink || "https://github.com/shadcn.png"}
                        className="h-9 w-9 rounded-full object-cover border border-border"
                        alt={user.name}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <Badge
                        variant="outline"
                        className="w-fit text-[10px] font-semibold uppercase tracking-wide"
                      >
                        {user.role}
                      </Badge>
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "secondary" : "destructive"
                        }
                        className="w-fit text-[10px]"
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${user.emailVerified ? "bg-foreground" : "bg-muted-foreground/40"}`}
                        />
                        Verified:{" "}
                        <span className="font-medium text-foreground">
                          {user.emailVerified ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${user.isDeleted ? "bg-destructive" : "bg-muted-foreground/40"}`}
                        />
                        Deleted:{" "}
                        <span className="font-medium text-foreground">
                          {user.isDeleted ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setEditForm(user);
                          setIsEditSheetOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
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
                  colSpan={4}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20 text-sm">
          <p className="text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
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
              <Info className="h-4 w-4 text-muted-foreground" /> User
              Information
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-lg border border-border">
                <img
                  src={
                    selectedUser.imageLink || "https://github.com/shadcn.png"
                  }
                  className="h-14 w-14 rounded-lg object-cover border border-border"
                  alt=""
                />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {selectedUser.name}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-semibold tracking-wide"
                  >
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Email", value: selectedUser.email },
                  { label: "Phone", value: selectedUser.phone || "N/A" },
                  { label: "Address", value: selectedUser.address || "N/A" },
                  { label: "Status", value: selectedUser.status },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-0.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                      {label}
                    </p>
                    <p className="font-medium text-foreground break-all">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-1">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                  Biography
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedUser.bio || "No bio added yet."}
                </p>
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
          key={selectedUser?.id}
        >
          <SheetHeader className="border-b pb-4 mb-6">
            <SheetTitle className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" /> Edit User
            </SheetTitle>
          </SheetHeader>

          {selectedUser && (
            <div className="flex flex-col gap-8">
              {/* Identity */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Profile Identity
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { label: "Full Name", key: "name" as const },
                    { label: "Email Address", key: "email" as const },
                    { label: "Phone Number", key: "phone" as const },
                    { label: "Image URL", key: "imageLink" as const },
                  ].map(({ label, key }) => (
                    <div key={key} className="space-y-1.5">
                      <Label className="text-sm">{label}</Label>
                      <Input
                        value={editForm[key] ?? ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, [key]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                  <div className="space-y-1.5 lg:col-span-2">
                    <Label className="text-sm">Address</Label>
                    <Input
                      value={editForm.address ?? ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* About & Security */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  About & Security
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Biography</Label>
                    <Input
                      value={editForm.bio ?? ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, bio: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm flex items-center gap-1 text-destructive">
                      <Lock className="h-3 w-3" /> Force Password Reset
                    </Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              {/* System Privileges */}
              <div className="bg-muted/30 p-5 rounded-lg border border-border space-y-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  System Privileges
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Role</Label>
                    <Select
                      value={editForm.role}
                      onValueChange={(val) =>
                        setEditForm({ ...editForm, role: val as IUser["role"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="TUTOR">Tutor</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Account Status</Label>
                    <Select
                      value={editForm.status}
                      onValueChange={(val) =>
                        setEditForm({
                          ...editForm,
                          status: val as IUser["status"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="BLOCKED">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-8 pt-4 border-t border-border">
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      id="verified"
                      checked={editForm.emailVerified ?? false}
                      onCheckedChange={(val) =>
                        setEditForm({ ...editForm, emailVerified: !!val })
                      }
                    />
                    <Label
                      htmlFor="verified"
                      className="text-sm cursor-pointer"
                    >
                      Email Verified
                    </Label>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      id="deleted"
                      checked={editForm.isDeleted ?? false}
                      onCheckedChange={(val) =>
                        setEditForm({ ...editForm, isDeleted: !!val })
                      }
                    />
                    <Label
                      htmlFor="deleted"
                      className="text-sm text-destructive cursor-pointer"
                    >
                      Mark as Deleted
                    </Label>
                  </div>
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
              Delete User?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-sm">
            You are about to delete{" "}
            <span className="font-medium text-foreground">
              {selectedUser?.name}
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
