// React
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// Models
import { Asset } from '@models/Asset'; 

// Store
import { RootState } from '@store/store';

// Theme
import { theme } from '@app/styles/theme';

// Main
const PortfolioSummary = () => {
  const { t } = useTranslation();
  const assets: Asset[] = useSelector(
    (state: RootState) => state.portfolioReducer.assets
  );

  // Calculate total portfolio value
  const totalValue = assets.reduce((acc, asset) => {
    return acc + asset.price * asset.holdings;
  }, 0);

  return (
    <View style={styles.summary}>
      <View style={styles.summaryContent}>
        <Text style={styles.title}>{t('portfolio_value')}</Text>
        <Text style={styles.totalValue}>${totalValue.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default PortfolioSummary;

const styles = StyleSheet.create({
  summary: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});