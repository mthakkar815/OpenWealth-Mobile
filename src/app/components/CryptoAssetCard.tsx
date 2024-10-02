// React
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

// Types
type CryptoAssetCardProps = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  holdings: number;
};

// Main
const CryptoAssetCard = ({
  name,
  symbol,
  price,
  change,
  holdings,
}: CryptoAssetCardProps) => {
  const { i18n } = useTranslation();

  const priceColor = change > 0 ? 'green' : 'red';

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>
          {name} ({symbol.toUpperCase()})
        </Text>
        <Text style={styles.holdings}>
          {i18n.t('holdings')}: {holdings} {symbol.toUpperCase()}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceValue}>${price.toFixed(2)}</Text>
        <Text style={{ color: priceColor }}>
          {i18n.t('change')}: {change.toFixed(2)}%
        </Text>
        <Text style={styles.totalValue}>
          {i18n.t('total_value')}: ${(holdings * price).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CryptoAssetCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  holdings: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    flex: 1,
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 14,
    color: '#555',
  },
});