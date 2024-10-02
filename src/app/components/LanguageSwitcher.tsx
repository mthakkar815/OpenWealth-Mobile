// LanguageSwitcher.tsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

// Redux
import { useDispatch } from "react-redux";
import { setAppLanguage } from "@store/languageSlice";

// Paper
import { Dialog, List, Portal } from "react-native-paper";
import { ScrollView } from "react-native";

// Props
interface LanguageSwitcherProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  visible,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  // Dynamically get the available languages from i18next
  const availableLanguages = Object.keys(i18n.options.resources ?? {});

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    dispatch(setAppLanguage(selectedLanguage));
    i18n.changeLanguage(selectedLanguage);
    onClose(); // Close the dialog after language change
  };

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "#ffffff" }}
        onDismiss={onClose}
        visible={visible}
        dismissable={true}
      >
        <Dialog.Title>{i18n.t("language")}</Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: 500 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <List.Section>
              {availableLanguages.map((lang) => (
                <List.Item
                  key={lang}
                  title={i18n.t(`${lang}`)} // Adjust the translation label as needed
                  onPress={() => handleLanguageChange(lang)}
                />
              ))}
            </List.Section>
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

export default LanguageSwitcher;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
