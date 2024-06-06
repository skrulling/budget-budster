import { View, Text, Spinner, ScrollView } from "tamagui";
import { Expense } from "@/types/expense";
import ExpenseItem from "./ExpenseItem";

interface ExpensesListProps {
    loading: boolean;
    expenses: Expense[];
}

const ExpensesList = ({loading, expenses}: ExpensesListProps) => {

  if (loading) {
    return (
      <View alignItems="center" justifyContent="center" flex={1} margin="$5">
        <Spinner size="large" color="$green10" />
      </View>
    );
  }

  return (
    <ScrollView marginTop="$4">
      {expenses.map((expense, index) => (
        <ExpenseItem expense={expense} index={index} key={index} />
      ))}
    </ScrollView>
  );
};

export default ExpensesList;
