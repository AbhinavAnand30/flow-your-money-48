import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddIncome } from "@/hooks/useIncome";

export function QuickAddIncome() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const addIncome = useAddIncome();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !source) return;
    addIncome.mutate(
      { amount: parseFloat(amount), source, date: new Date().toISOString().split("T")[0], note: "" },
      { onSuccess: () => { setAmount(""); setSource(""); } }
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
      <Input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="w-36"
        required
      />
      <Button type="submit" size="sm" variant="outline" disabled={addIncome.isPending}>
        + Income
      </Button>
    </form>
  );
}
