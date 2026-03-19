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
  Tag,
  Info,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { deleteCategory, updateCategory } from "@/services/category";

export interface ICategory {
  id: string;
  name: string;
  status: "ACTIVE" | "COMING_SOON";
  createdAt: string;
  updatedAt: string;
}

export default function CategoryManagement({
  initialCategories,
}: {
  initialCategories: ICategory[];
}) {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [editForm, setEditForm] = useState<Partial<ICategory>>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentData = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdate = async () => {
    if (!selectedCategory) return;
    setIsLoading(true);
    try {
      const res = await updateCategory(selectedCategory.id, editForm);
      if (res.success) {
        setCategories(
          categories.map((c) =>
            c.id === selectedCategory.id ? { ...c, ...editForm } : c,
          ),
        );
        toast.success("Category updated successfully.");
        setIsEditSheetOpen(false);
      } else {
        toast.error("Update failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    setIsLoading(true);
    try {
      const res = await deleteCategory(selectedCategory.id);
      if (res.success) {
        setCategories(categories.filter((c) => c.id !== selectedCategory.id));
        toast.success("Category deleted successfully.");
        setIsDeleteDialogOpen(false);
      } else {
        toast.error("Delete failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Category Management
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage and organize all categories.
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {/* Name */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {cat.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={
                        cat.status === "ACTIVE" ? "secondary" : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {cat.status}
                    </Badge>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(cat.updatedAt).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setEditForm(cat);
                          setIsEditSheetOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(cat);
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
                  No categories found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20 text-sm">
          <p className="text-muted-foreground">
            Showing{" "}
            {filteredCategories.length === 0
              ? 0
              : (currentPage - 1) * itemsPerPage + 1}
            –{Math.min(currentPage * itemsPerPage, filteredCategories.length)}{" "}
            of {filteredCategories.length} categories
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
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-semibold">
              <Info className="h-4 w-4 text-muted-foreground" /> Category
              Details
            </DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-lg border border-border">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center border border-border">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {selectedCategory.name}
                  </p>
                  <Badge
                    variant={
                      selectedCategory.status === "ACTIVE"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-[10px]"
                  >
                    {selectedCategory.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="space-y-0.5">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                    ID
                  </p>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {selectedCategory.id}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                      Created
                    </p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedCategory.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                      Updated
                    </p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedCategory.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT SHEET */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-8 overflow-y-auto"
          key={selectedCategory?.id}
        >
          <SheetHeader className="border-b pb-4 mb-6">
            <SheetTitle className="text-lg font-semibold flex items-center gap-2">
              <Tag className="h-5 w-5 text-muted-foreground" /> Edit Category
            </SheetTitle>
          </SheetHeader>

          {selectedCategory && (
            <div className="flex flex-col gap-6">
              <div className="space-y-1.5">
                <Label className="text-sm">Category Name</Label>
                <Input
                  value={editForm.name ?? ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="e.g. Mechatronics"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(val) =>
                    setEditForm({
                      ...editForm,
                      status: val as ICategory["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="COMING_SOON">COMING_SOON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sticky bottom-0 bg-background pt-2 pb-1">
                <Button
                  onClick={handleUpdate}
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
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
              Delete Category?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-sm">
            You are about to delete{" "}
            <span className="font-medium text-foreground">
              {selectedCategory?.name}
            </span>
            . This action cannot be undone.
          </DialogDescription>
          <DialogFooter className="flex gap-2 sm:justify-center mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
