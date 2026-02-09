import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCurrencySymbol } from "@/hooks/useSettings";

type Props = {
  totalIncome: number;
  totalExpenses: number;
};

export function SummaryCards({ totalIncome, totalExpenses }: Props) {
  const symbol = useCurrencySymbol();
  const balance = totalIncome - totalExpenses;

  const cards = [
    { label: "Income", value: totalIncome, icon: TrendingUp, color: "text-income" },
    { label: "Expenses", value: totalExpenses, icon: TrendingDown, color: "text-expense" },
    { label: "Balance", value: balance, icon: Wallet, color: "text-balance" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} className="flex items-center gap-4 p-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-display text-xl font-bold">
              {symbol}{Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
