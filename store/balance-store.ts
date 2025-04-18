import { create } from "zustand";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export interface BalanceState {
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

export const useBalanceStore = create<BalanceState>((set, get) => ({
  transactions: [],
  runTransaction: (transaction: Transaction) => {
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    }));
  },
  balance: () =>
    get().transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      1000
    ),
  clearTransactions: () => {
    set({ transactions: [] });
  },
}));
