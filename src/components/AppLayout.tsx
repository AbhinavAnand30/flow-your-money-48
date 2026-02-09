import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, PlusCircle, Settings } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/expenses", icon: Receipt, label: "Expenses" },
  { to: "/expenses/add", icon: PlusCircle, label: "Add Expense" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function AppLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-56 border-r bg-card md:flex md:flex-col">
        <Link to="/" className="flex items-center gap-2 border-b px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm">
            E
          </div>
          <span className="font-display text-lg font-bold">ExpenseFlow</span>
        </Link>
        <nav className="flex flex-col gap-1 p-3">
          {links.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pb-20 md:ml-56 md:pb-0">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
