import _axios from "axios";
import axiosRetry from "axios-retry";

const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};
export const coinGeckoApiBase = _axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
});
axiosRetry(_axios.create(), {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
});
export const getCoinList = () => {
  return coinGeckoApiBase.get("/coins/list");
};

export const getCoinData = (coinId: string) => {
  return coinGeckoApiBase.get(`/coins/${coinId}`);
};

export const getCoinsData = (coinIds: string[]) => {
  return coinGeckoApiBase.get(`/coins/markets`, {
    params: {
      ids: coinIds.join(","),
      vs_currency: "usd",
      order: "id_asc",
    },
  });
};

export const getCoins = (page: number = 1) => {
  return coinGeckoApiBase.get(`/coins/markets`, {
    params: {
      vs_currency: "usd",
      page,
    },
  });
};
