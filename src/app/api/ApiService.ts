// Constants
import { Coin } from "@models/Coin";
import apiClient from "./API";

import { API_BASE_URL } from '@env';

export const getMyPortfolioData = async (payload: string) => {
  try {
    const response = await apiClient.get<Coin[]>(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&ids=${payload}`
    );
    return { status: true, data: response };
  } catch (error) {
    return { status: false, error: error };
  }
};
