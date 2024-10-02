import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Transaction } from "@app/models/Transaction";

type CryptoAssetCardProps = {
  transaction: Transaction;
};

const TransactionAssetCard = ({ transaction }: CryptoAssetCardProps) => {
  const { i18n } = useTranslation();

  const priceColor = transaction.type == "buy" ? "green" : "red";

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>
          {transaction?.asset?.name} ({transaction?.asset?.symbol.toUpperCase()})
        </Text>
        <Text style={styles.holdings}>
          {transaction?.date}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={{ color: priceColor }}>{i18n.t(transaction.type.toLowerCase())}</Text>
        <Text style={styles.totalValue}>
          {`${i18n.t('qty')}: ${transaction?.amount?.toFixed(2)}`}
        </Text>
      </View>
    </View>
  );
};

export default TransactionAssetCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  holdings: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    flex: 1,
    alignItems: "flex-end",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 14,
    color: "#555",
  },
});
