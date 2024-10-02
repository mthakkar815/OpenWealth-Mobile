// React
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

// 3rd Party
import AsyncStorage from '@react-native-async-storage/async-storage';

// Slices
import portfolioSlice from "@store/portfolioSlice";
import languageSlice from "@store/languageSlice";
import transactionSlice from "@store/transactionSlice";

// Config
const portfolioConfig = {
  key: "portfolio",
  storage: AsyncStorage,
};

const languageConfig = {
  key: "language",
  storage: AsyncStorage,
};

const transactionConfig = {
  key: "transaction",
  storage: AsyncStorage,
};

// Main
const persistedPortfolioReducer = persistReducer(portfolioConfig, portfolioSlice);
const persistedLanguageReducer = persistReducer(languageConfig, languageSlice);
const persistedTransactionReducer = persistReducer(transactionConfig, transactionSlice);

const store = configureStore({
  reducer: {
    portfolioReducer: persistedPortfolioReducer,
    languageReducer: persistedLanguageReducer,
    transactionReducer: persistedTransactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore these actions
        ignoredPaths: ['register'], // Ignore the 'register' path in actions
      },
    }),
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
