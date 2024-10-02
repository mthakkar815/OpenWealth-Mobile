import { DefaultTheme } from "react-native-paper";

export const colors = {
  primary: "#0070f3",
  secondary: "#1db954",
  background: "#f5f5f5",
  green: "#4CAF50",
  red: "#F44336",
  accent: "#3557b7",
  surface: "#ffffff",
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    secondary: colors.secondary,
  },
};
