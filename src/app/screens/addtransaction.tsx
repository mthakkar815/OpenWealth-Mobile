import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// Models
import { Asset } from "@models/Asset";
import { Transaction } from "@models/Transaction";

// Axios & 3rd Party
import { TextInput } from "react-native-paper";
import moment from 'moment';

// Store & Reducers
import { RootState } from "@store/store";
import { addTransaction } from "@store/transactionSlice";
import {
  updateAsset,
} from "@store/portfolioSlice";

import { colors, theme } from "@styles/theme";

// Components
import MyButton from "@components/Button";

const AddTransaction = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const [item, setItem] = useState<Asset | undefined>(undefined);
  const [amount, setAmount] = useState("");

  const assets: Asset[] = useSelector(
    (state: RootState) => state.portfolioReducer.assets
  );
  const appLanguage: string = useSelector(
    (state: RootState) => state.languageReducer.appLanguage
  );

  useEffect(() => {
    if (route?.params && route?.params?.item) {
      setItem(route?.params?.item);
      navigation.setOptions({
        title: `${i18n.t('add_transaction')} - ${route?.params?.item?.name}`,
      });
    }
  }, []);

  const buttonPressBuy = () => {
    manageTransaction("buy");
  };

  const buttonPressSell = () => {
    manageTransaction("sell");
  };

  const manageTransaction = (type: string) => {
    if (item) {
      let transaction: Transaction;

      transaction = {
        amount: parseFloat(amount),
        asset: item,
        id: generateRandomNumber(),
        type: type,
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      dispatch(addTransaction(transaction));

      let newHoldings: number = transaction.amount;
      if (type === "buy") {
        newHoldings = item.holdings + transaction.amount;
      } else {
        newHoldings = item.holdings - transaction.amount;
      }
      
      let newAsset = { ...item }; ;
      newAsset.holdings = newHoldings;
      dispatch(updateAsset(newAsset));
    }
    navigation.goBack();
  };

  const generateRandomNumber = (): string => {
    return Math.floor(Math.random() * 1000000).toString(); // Generates a random number
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
            <TextInput
              label={i18n.t('amount')}
              value={amount}
              mode="outlined"
              keyboardType="decimal-pad"
              onChangeText={(text) => setAmount(text)}
              style={styles.input}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <MyButton
                title={i18n.t('sell')}
                buttonStyle={{ borderRadius: 10 }}
                contentStyle={{ backgroundColor: colors.red }}
                onPress={buttonPressSell}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <MyButton
                title={i18n.t('buy')}
                buttonStyle={{ borderRadius: 10 }}
                contentStyle={{ backgroundColor: colors.green }}
                onPress={buttonPressBuy}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 30,
    left: 0,
    right: 0,
  },
  input: {
    marginBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});
