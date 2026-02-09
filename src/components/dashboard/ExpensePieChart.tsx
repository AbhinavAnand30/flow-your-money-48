import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import type { Expense } from "@/hooks/useExpenses";
import { useCurrencySymbol } from "@/hooks/useSettings";

const COLORS = [
  "hsl(158, 64%, 40%)",
  "hsl(28, 80%, 56%)",
  "hsl(220, 70%, 55%)",
  "hsl(0, 72%, 51%)",
  "hsl(280, 60%, 55%)",
  "hsl(45, 90%, 50%)",
  "hsl(190, 70%, 45%)",
  "hsl(340, 65%, 50%)",
];

type Props = { expenses: Expense[] };

export function ExpensePieChart({ expenses }: Props) {
  const symbol = useCurrencySymbol();
  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }));

  if (!data.length) {
    return (
      <Card className="flex h-64 items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">No expense data yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="mb-3 font-display font-semibold text-sm">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={40}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `${symbol}${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            {d.name}
          </div>
        ))}
      </div>
    </Card>
  );
}
