import { ExpenseDialog } from "@/components/ExpenseDialog";
import ExpensesList from "@/components/ExpensesList";
import { Expense } from "@/types/expense";
import { useEffect, useState } from "react";
import {  H1, View } from "tamagui";
import { supabase } from "@/scripts/supabase";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data, error } = await supabase
          .from('expenses')
          .select('*');

        if (error) {
          console.error(error);
        } else {
          setExpenses(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  function addExpense(e: Expense): void {
    setExpenses([...expenses, e]);
  }

  return (
    <View>
      <H1 alignSelf="center" margin="$5">budgetbudster</H1>
      <ExpenseDialog addExpense={addExpense} />
      <ExpensesList loading={loading} expenses={expenses} />
    </View>
  );
}
