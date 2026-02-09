import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useExpenses, useDeleteExpense, useUpdateExpense, CATEGORIES, type Expense } from "@/hooks/useExpenses";
import { useCurrencySymbol } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Expenses() {
  const { data: expenses = [], isLoading } = useExpenses();
  const deleteExpense = useDeleteExpense();
  const updateExpense = useUpdateExpense();
  const symbol = useCurrencySymbol();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [editing, setEditing] = useState<Expense | null>(null);

  // Edit form state
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editNote, setEditNote] = useState("");

  const openEdit = (e: Expense) => {
    setEditing(e);
    setEditAmount(String(e.amount));
    setEditCategory(e.category);
    setEditDate(e.date);
    setEditNote(e.note || "");
  };

  const handleUpdate = () => {
    if (!editing) return;
    updateExpense.mutate(
      { id: editing.id, amount: parseFloat(editAmount), category: editCategory, date: editDate, note: editNote },
      { onSuccess: () => setEditing(null) }
    );
  };

  let filtered = expenses.filter((e) => {
    const matchSearch = e.category.toLowerCase().includes(search.toLowerCase()) || (e.note || "").toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "all" || e.category === filterCategory;
    return matchSearch && matchCategory;
  });

  filtered.sort((a, b) =>
    sortBy === "date"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : Number(b.amount) - Number(a.amount)
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16" />)}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Expenses</h1>
        <Button asChild size="sm">
          <Link to="/expenses/add"><Plus className="mr-1 h-4 w-4" /> Add</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as "date" | "amount")}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="date">By Date</SelectItem>
            <SelectItem value="amount">By Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      {!filtered.length ? (
        <Card className="flex h-32 items-center justify-center">
          <p className="text-sm text-muted-foreground">No expenses found</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((e) => (
            <Card key={e.id} className="flex items-center justify-between p-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium">{e.category}</span>
                  <span className="text-xs text-muted-foreground">{format(new Date(e.date), "MMM d, yyyy")}</span>
                </div>
                {e.note && <p className="mt-0.5 truncate text-xs text-muted-foreground">{e.note}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-expense">
                  -{symbol}{Number(e.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(e)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete expense?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteExpense.mutate(e.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Expense</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Amount</Label>
              <Input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} min="0.01" step="0.01" />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
            </div>
            <div>
              <Label>Note</Label>
              <Textarea value={editNote} onChange={(e) => setEditNote(e.target.value)} />
            </div>
            <Button onClick={handleUpdate} disabled={updateExpense.isPending} className="w-full">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
