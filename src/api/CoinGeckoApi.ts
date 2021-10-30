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
export const getCoinSimple = async (): Promise<CoinSimple[]> => {
  // return (await coinGeckoApiBase.get("/coins/list")).data;
  return coinGeckoApiBase
    .get("/coins/list")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getCoins = async (
  page: number = 1,
  coinIds: string[] = []
): Promise<Coin[]> => {
  return coinGeckoApiBase
    .get(`/coins/markets`, {
      params: {
        vs_currency: "usd",
        page,
        ids: coinIds.join(","),
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
