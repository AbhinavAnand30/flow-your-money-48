import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useCurrencySymbol } from "@/hooks/useSettings";
import type { Expense } from "@/hooks/useExpenses";
import type { Income } from "@/hooks/useIncome";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  label: string;
  date: string;
};

type Props = { expenses: Expense[]; income: Income[] };

export function RecentTransactions({ expenses, income }: Props) {
  const symbol = useCurrencySymbol();

  const transactions: Transaction[] = [
    ...expenses.map((e) => ({ id: e.id, type: "expense" as const, amount: e.amount, label: e.category, date: e.date })),
    ...income.map((i) => ({ id: i.id, type: "income" as const, amount: i.amount, label: i.source, date: i.date })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  if (!transactions.length) {
    return (
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">No transactions yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="mb-3 font-display font-semibold text-sm">Recent Transactions</h3>
      <div className="space-y-2">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5">
            <div>
              <p className="text-sm font-medium">{t.label}</p>
              <p className="text-xs text-muted-foreground">{format(new Date(t.date), "MMM d, yyyy")}</p>
            </div>
            <span className={`font-display font-semibold text-sm ${t.type === "income" ? "text-income" : "text-expense"}`}>
              {t.type === "income" ? "+" : "-"}{symbol}{Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
