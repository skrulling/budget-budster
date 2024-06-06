import { Expense } from "@/types/expense";
import { View, Text, useTheme } from "tamagui";

interface ExpenseItemProps {
  expense: Expense;
  index: number;
}

const ExpenseItem = ({ expense, index }: ExpenseItemProps) => {
  function colorPicker(index: number): string {
    const theme = useTheme();

    if (index % 4 === 0) return theme.green10.get();
    if (index % 4 === 1) return theme.orange10.get();
    if (index % 4 === 2) return theme.red10.get();
    if (index % 4 === 2) return theme.pink10.get();

    return theme.pink10.get();
  }
  return (
    <View
      key={index}
      padding="$4"
      marginVertical="$2"
      backgroundColor="$black2"
      borderRadius="$3"
      maxWidth={300}
      width="90%"
      alignSelf="center"
      alignItems="flex-start"
    >
      <Text fontSize="$7" fontWeight="bold" color={colorPicker(index)}>
        {expense.name}
      </Text>
      <Text fontSize="$5" color="$textSecondary">
        {expense.amount}kr
      </Text>
      <Text fontSize="$4" color="$white8">
        {new Date(expense.created_at).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default ExpenseItem;
