import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// Components
import CryptoAssetCard from "@components/CryptoAssetCard";
import PortfolioSummary from "@components/PortfolioSummary";
import LanguageSwitcher from "@components/LanguageSwitcher";
import MyButton from "../components/Button";

// Models
import { Coin } from "@models/Coin";
import { Asset } from "@models/Asset";

// Axios & 3rd Party
import { getMyPortfolioData } from "@api/ApiService";
import Icon from "react-native-vector-icons/MaterialIcons";

// Store & Reducers
import { RootState } from "@store/store";
import { addAsset } from "@store/portfolioSlice";
import { handleError } from "@api/handleError";

import Routes from "@constants/routes";

// Main
const DashboardPage = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const [isLanguageSwitcherVisible, setLanguageSwitcherVisible] =
    useState(false);

  const assets: Asset[] = useSelector(
    (state: RootState) => state.portfolioReducer.assets
  );
  const appLanguage: string = useSelector(
    (state: RootState) => state.languageReducer.appLanguage
  );

  // Function to fetch crypto assets
  useEffect(() => {
    const fetchCryptoAssets = async () => {
      try {
        const response = await getMyPortfolioData("bitcoin,ethereum");
        if (response?.status && response?.data) {
          const data: Coin[] = response?.data.data;

          const assets: Asset[] = data.map((coin: Coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price,
            change: coin.price_change_percentage_24h,
            holdings: 1,
          }));

          assets.forEach((item: Asset) => {
            dispatch(addAsset(item));
          });
        } else {
          handleError(response.error);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchCryptoAssets();

    i18n.changeLanguage(appLanguage);

    navigation.setOptions({
      headerLeft: () => (
        <>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              openLanguageSwitcher();
            }}
          >
            <Icon name="language" size={24} color="#000" />
          </TouchableOpacity>
        </>
      ),
    });
  }, [dispatch, appLanguage, i18n]);

  const buttonPressTransactionHistory = () => {
    navigation.navigate(Routes.TransactionHistory);
  };

  const renderItem = ({ item }: { item: Asset }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(Routes.AddTransaction, { item });
      }}
    >
      <CryptoAssetCard
        key={item.id}
        name={item.name}
        symbol={item.symbol}
        price={item.price}
        change={item.change}
        holdings={item.holdings}
      />
    </TouchableOpacity>
  );

  const openLanguageSwitcher = () => {
    setLanguageSwitcherVisible(true);
  };

  const closeLanguageSwitcher = () => {
    setLanguageSwitcherVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <PortfolioSummary />
        <FlatList
          data={assets} // The data prop takes in the array of assets
          renderItem={renderItem} // Each asset item is rendered using this function
          keyExtractor={(item) => item.id.toString()} // Unique key for each item
          contentContainerStyle={styles.listContent}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          title={i18n.t("transaction_history")}
          onPress={buttonPressTransactionHistory}
        />
      </View>
      <LanguageSwitcher
        visible={isLanguageSwitcherVisible}
        onClose={closeLanguageSwitcher}
      />
    </View>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  listContent: {
    paddingBottom: 20,
  },
});
