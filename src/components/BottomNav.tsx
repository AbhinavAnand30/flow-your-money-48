import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, PlusCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/expenses", icon: Receipt, label: "Expenses" },
  { to: "/expenses/add", icon: PlusCircle, label: "Add" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/80 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        {links.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to) && to !== "/expenses/add");
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", to === "/expenses/add" && "h-6 w-6")} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
