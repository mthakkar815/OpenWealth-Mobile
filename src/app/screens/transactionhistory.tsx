import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

// Store & Reducers
import { RootState } from "@store/store";

// Components
import TransactionAssetCard from "@app/components/TransactionAssetCard";

// Models
import { Transaction } from "../models/Transaction";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// Main
const TransactionHistory = ({ navigation }: any) => {
  const { i18n } = useTranslation();

  const transactions: Transaction[] = useSelector(
    (state: RootState) => state.transactionReducer.transactions
  );

  const reversedTransactions = transactions.slice().reverse();

  // Function to fetch crypto assets
  useEffect(() => {
    navigation.setOptions({
      title: i18n.t("transaction_history"),
    });
  }, []);

  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionAssetCard key={item.id} transaction={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reversedTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});
