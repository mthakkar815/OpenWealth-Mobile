import { Transaction } from "@app/models/Transaction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
interface PortfolioState {
  transactions: Transaction[];
  error: string | null;
}

// Initial States
const initialState: PortfolioState = {
  transactions: [],
  error: null,
};

// Main
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index === -1) {
        state.transactions.push(action.payload);
      }
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
