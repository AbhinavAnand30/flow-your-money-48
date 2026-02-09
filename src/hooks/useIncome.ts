import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Income = {
  id: string;
  amount: number;
  source: string;
  date: string;
  note: string;
  created_at: string;
};

export function useIncome() {
  return useQuery({
    queryKey: ["income"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("income")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      return data as Income[];
    },
  });
}

export function useAddIncome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (income: Omit<Income, "id" | "created_at">) => {
      const { error } = await supabase.from("income").insert(income);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["income"] });
      toast.success("Income added!");
    },
    onError: () => toast.error("Failed to add income"),
  });
}
