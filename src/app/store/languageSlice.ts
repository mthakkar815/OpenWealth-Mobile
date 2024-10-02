import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
interface LanguageState {
  appLanguage: string;
}

// Initial State
const initialState: LanguageState = {
  appLanguage: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setAppLanguage: (state, action: PayloadAction<string>) => {
      state.appLanguage = action.payload;
    },
  },
});

export const { setAppLanguage } = languageSlice.actions;
export default languageSlice.reducer;
