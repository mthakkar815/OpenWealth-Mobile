// React
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

// Theme
import { theme } from "@app/styles/theme";

// Paper
import { Button } from "react-native-paper";

// Interfaces
interface MyButtonProps {
  onPress: () => void;
  title: string;
  mode?: "text" | "outlined" | "contained";
  buttonStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

// Main
const MyButton: React.FC<MyButtonProps> = ({
  onPress,
  title,
  mode = "contained",
  buttonStyle,
  contentStyle,
}) => {
  return (
    <Button
      mode={mode}
      contentStyle={[
        { height: 50, backgroundColor: theme.colors.primary },
        contentStyle,
      ]} // Customize content height
      style={[{ borderRadius: 0 }, buttonStyle]} // No rounded corners, can override with buttonStyle prop
      onPress={onPress}
    >
      {title}
    </Button>
  );
};

export default MyButton;
