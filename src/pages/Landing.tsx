import { Link } from "react-router-dom";
import { TrendingUp, PieChart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: TrendingUp, title: "Track Expenses", desc: "Log every transaction with categories and notes" },
  { icon: PieChart, title: "Visualize Spending", desc: "Charts and breakdowns to see where money goes" },
  { icon: Shield, title: "Stay on Budget", desc: "Monitor your balance and income at a glance" },
];

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold">
            E
          </div>
          <span className="font-display text-xl font-bold">ExpenseFlow</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/dashboard">Open App</Link>
        </Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in max-w-xl">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your money,{" "}
            <span className="text-primary">simplified</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A clean, no-fuss personal finance tracker. Log expenses, track income, and visualize your spending — all in one place.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg" className="font-display font-semibold">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid w-full max-w-2xl gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="animate-fade-in rounded-xl border bg-card p-5 text-left"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        ExpenseFlow — Simple personal finance
      </footer>
    </div>
  );
}
