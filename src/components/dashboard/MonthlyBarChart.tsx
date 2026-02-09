import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import type { Expense } from "@/hooks/useExpenses";
import { useCurrencySymbol } from "@/hooks/useSettings";

type Props = { expenses: Expense[] };

export function MonthlyBarChart({ expenses }: Props) {
  const symbol = useCurrencySymbol();
  const now = new Date();

  const data = Array.from({ length: 6 }, (_, i) => {
    const month = subMonths(now, 5 - i);
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const total = expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      })
      .reduce((sum, e) => sum + Number(e.amount), 0);
    return { month: format(month, "MMM"), total };
  });

  return (
    <Card className="p-4">
      <h3 className="mb-3 font-display font-semibold text-sm">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={50} />
          <Tooltip formatter={(v: number) => `${symbol}${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          <Bar dataKey="total" fill="hsl(158, 64%, 40%)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
