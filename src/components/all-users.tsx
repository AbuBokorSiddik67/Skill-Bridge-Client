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

export default function UserManagement({
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

  const handleDelete = () => {
    // set delete logic..
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-4 bg-background min-h-screen">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Admin: User Control Center
        </h2>
        <p className="text-sm text-muted-foreground">
          Advanced management for user profiles, roles, and security settings.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold">User Information</TableHead>
              <TableHead className="font-bold">Role & Status</TableHead>
              <TableHead className="font-bold">Safety Checks</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.imageLink || "https://github.com/shadcn.png"}
                        className="h-10 w-10 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                        alt={user.name}
                      />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit">
                        {user.role}
                      </span>
                      <span
                        className={`text-[10px] w-fit px-2 py-0.5 rounded-full border font-medium ${user.status === "ACTIVE" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-[10px] space-y-1">
                      <div className="flex items-center gap-1">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${user.emailVerified ? "bg-green-500" : "bg-amber-500"}`}
                        />
                        Verified:{" "}
                        <span className="font-bold">
                          {user.emailVerified ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${user.isDeleted ? "bg-red-500" : "bg-slate-300"}`}
                        />
                        Deleted:{" "}
                        <span className="font-bold">
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
                        <Eye className="h-4 w-4 text-emerald-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditSheetOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 text-indigo-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  No users found match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between p-4 border-t bg-slate-50/50 text-sm">
          <p className="text-slate-500 font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} Users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* VIEW MODAL - Clean & Minimal */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Info className="h-5 w-5 text-blue-600" /> User Information
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <img
                  src={
                    selectedUser.imageLink || "https://github.com/shadcn.png"
                  }
                  className="h-20 w-20 rounded-2xl object-cover shadow-md border-2 border-white"
                  alt=""
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    {selectedUser.name}
                  </h3>
                  <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-tighter">
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Email
                  </p>
                  <p className="font-medium break-all">{selectedUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Phone
                  </p>
                  <p className="font-medium">{selectedUser.phone || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Address
                  </p>
                  <p className="font-medium">{selectedUser.address || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Status
                  </p>
                  <p className="font-medium">{selectedUser.status}</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  Biography
                </p>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  {selectedUser.bio || "This user hasn't added a bio yet."}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT SHEET - BIG WIDTH & ORGANIZED GRID */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:!max-w-none sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] overflow-y-auto pt-10 p-8"
          key={selectedUser?.id}
        >
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-2xl font-black flex items-center gap-2 text-indigo-700 uppercase italic">
              <Shield className="h-6 w-6" /> Control Panel
            </SheetTitle>
          </SheetHeader>

          {selectedUser && (
            <div className="flex flex-col gap-8 py-8">
              {/* Group 1: Identity */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Profile Identity
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      defaultValue={selectedUser.name}
                      className="h-11 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      defaultValue={selectedUser.email}
                      className="h-11 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      defaultValue={selectedUser.phone}
                      className="h-11 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      defaultValue={selectedUser.imageLink || ""}
                      className="h-11 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Address</Label>
                    <Input
                      defaultValue={selectedUser.address}
                      className="h-11 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: About User */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  About & Security
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Biography</Label>
                    <Input
                      defaultValue={selectedUser.bio ?? ""}
                      className="h-11 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-rose-600 flex items-center gap-1 font-bold">
                      <Lock className="h-3 w-3" /> Force Password Reset
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="h-11 shadow-sm border-rose-100 focus-visible:ring-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Group 3: System Access */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  System Privileges
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Access Level (Role)</Label>
                    <Select defaultValue={selectedUser.role}>
                      <SelectTrigger className="h-11 bg-white shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">STUDENT</SelectItem>
                        <SelectItem value="TUTOR">TUTOR</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Account Life-cycle</Label>
                    <Select defaultValue={selectedUser.status}>
                      <SelectTrigger className="h-11 bg-white shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-10 pt-2 border-t border-slate-200 mt-2 pt-6">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="verified"
                      defaultChecked={selectedUser.emailVerified}
                      className="h-5 w-5 border-slate-300"
                    />
                    <Label
                      htmlFor="verified"
                      className="text-sm font-bold cursor-pointer"
                    >
                      Email Verified
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="deleted"
                      defaultChecked={selectedUser.isDeleted}
                      className="h-5 w-5 border-rose-300 data-[state=checked]:bg-rose-500"
                    />
                    <Label
                      htmlFor="deleted"
                      className="text-sm font-bold text-rose-600 cursor-pointer"
                    >
                      Is Account Deleted?
                    </Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 sticky bottom-0 bg-background pb-2">
                <Button className="w-full h-12 text-md font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl transition-all active:scale-95">
                  {/* set onclick to update data */}
                  Confirm & Sync All Records
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* DELETE DIALOG */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-2">
              <Trash2 className="h-6 w-6 text-rose-600" />
            </div>
            <DialogTitle className="text-xl">Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center">
            You are about to delete user <strong>{selectedUser?.name}</strong>.
            This record will be moved to the archive and can cause data
            inconsistencies.
          </DialogDescription>
          <DialogFooter className="flex gap-2 sm:justify-center w-full mt-4">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Keep User
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDelete}
            >
              Delete Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
