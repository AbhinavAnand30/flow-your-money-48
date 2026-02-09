import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useSettings, useUpdateSettings, CURRENCIES } from "@/hooks/useSettings";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const qc = useQueryClient();

  const resetAll = async () => {
    await supabase.from("expenses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("income").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    qc.invalidateQueries({ queryKey: ["expenses"] });
    qc.invalidateQueries({ queryKey: ["income"] });
    toast.success("All data reset!");
  };

  if (isLoading || !settings) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <Card className="space-y-5 p-5">
        <div>
          <Label>Currency</Label>
          <Select
            value={settings.currency}
            onValueChange={(v) => updateSettings.mutate({ currency: v })}
          >
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.symbol} {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Theme</Label>
          <div className="mt-1 flex gap-2">
            <Button
              variant={settings.theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => updateSettings.mutate({ theme: "light" })}
            >
              <Sun className="mr-1 h-4 w-4" /> Light
            </Button>
            <Button
              variant={settings.theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => updateSettings.mutate({ theme: "dark" })}
            >
              <Moon className="mr-1 h-4 w-4" /> Dark
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-destructive">Danger Zone</Label>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="mt-1">Reset All Data</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all expenses and income entries. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetAll}>Reset Everything</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  );
}
