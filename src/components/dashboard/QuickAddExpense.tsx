import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddExpense, CATEGORIES } from "@/hooks/useExpenses";

export function QuickAddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const addExpense = useAddExpense();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;
    addExpense.mutate(
      { amount: parseFloat(amount), category, date: new Date().toISOString().split("T")[0], note: "" },
      { onSuccess: () => { setAmount(""); setCategory(""); } }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-28"
        min="0.01"
        step="0.01"
        required
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" size="sm" disabled={addExpense.isPending}>
        + Expense
      </Button>
    </form>
  );
}
