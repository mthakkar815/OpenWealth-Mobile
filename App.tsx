// React
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { I18nextProvider } from "react-i18next";

// Localization
import i18n from "./i18n";

// Styles
import { theme } from "./src/app/styles/theme";

// Axios & 3rd Party
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/app/store/store";

// Pages
import DashboardPage from "./src/app/screens/dashboard";
import TransactionHistory from "./src/app/screens/transactionhistory";
import AddTransaction from "./src/app/screens/addtransaction";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

// Main Page component
const Page = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen
                  name="Dashboard"
                  options={{ title: "OpenWealth" }}
                  component={DashboardPage}
                />
                <Stack.Screen
                  name="TransactionHistory"
                  options={{ title: "Transaction History" }}
                  component={TransactionHistory}
                />
                <Stack.Screen
                  name="AddTransaction"
                  options={{ title: "Add Transaction" }}
                  component={AddTransaction}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </I18nextProvider>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};
export default Page;
