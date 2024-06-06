import React, { useState } from "react";
import { X } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Sheet,
  Unspaced,
  XStack,
} from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { supabase } from "../scripts/supabase";
import { Expense } from "@/types/expense";

interface ExpenseDialogProps {
  addExpense: (e: Expense) => void;
}
export function ExpenseDialog({addExpense}: ExpenseDialogProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const saveExpense = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert([{ name, amount }])
        .select();

      if (error) {
        console.error(error);
      } else {
        console.log("Expense added:", data);
        const e = data[0] as Expense;
        addExpense(e);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button alignSelf="center" icon={Plus} size="$6">
          Add expense
        </Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Add expense</Dialog.Title>
          <Dialog.Description>Information about expense</Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>
            <Input
              flex={1}
              id="name"
              value={name}
              onChangeText={setName}
              placeholder="Expense name"
            />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="amount">
              Amount
            </Label>
            <Input
              flex={1}
              id="amount"
              value={amount}
              onChangeText={setAmount}
              inputMode="numeric"
              placeholder="Amount"
            />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close" onPress={saveExpense}>
                Add expense
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
