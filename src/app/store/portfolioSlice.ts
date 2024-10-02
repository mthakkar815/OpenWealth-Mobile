import { Asset } from "@models/Asset";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
interface PortfolioState {
  assets: Asset[];
  error: string | null;
}

// Initial State
const initialState: PortfolioState = {
  assets: [],
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index === -1) {
        state.assets.push(action.payload);
      }
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    }
  },
});

export const { addAsset, updateAsset } = portfolioSlice.actions;

export default portfolioSlice.reducer;
