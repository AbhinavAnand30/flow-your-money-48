import { useExpenses } from "@/hooks/useExpenses";
import { useIncome } from "@/hooks/useIncome";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { QuickAddExpense } from "@/components/dashboard/QuickAddExpense";
import { QuickAddIncome } from "@/components/dashboard/QuickAddIncome";
import { ExpensePieChart } from "@/components/dashboard/ExpensePieChart";
import { MonthlyBarChart } from "@/components/dashboard/MonthlyBarChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: expenses = [], isLoading: le } = useExpenses();
  const { data: income = [], isLoading: li } = useIncome();

  const totalIncome = income.reduce((s, i) => s + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);

  if (le || li) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>

      <SummaryCards totalIncome={totalIncome} totalExpenses={totalExpenses} />

      <div className="space-y-2">
        <h2 className="font-display text-sm font-semibold text-muted-foreground">Quick Add</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <QuickAddExpense />
          <QuickAddIncome />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ExpensePieChart expenses={expenses} />
        <MonthlyBarChart expenses={expenses} />
      </div>

      <RecentTransactions expenses={expenses} income={income} />
    </div>
  );
}
