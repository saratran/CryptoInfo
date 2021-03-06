import { render, screen, fireEvent, getByText } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import CoinList from "../CoinList";
import renderer from "react-test-renderer";

const COINS_MOCK: Coin[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 60810,
    market_cap: 1146941048948,
    market_cap_rank: 1,
    fully_diluted_valuation: 1277236303348,
    total_volume: 49295786836,
    high_24h: 62393,
    low_24h: 59041,
    price_change_24h: 599.83,
    price_change_percentage_24h: 0.99622,
    market_cap_change_24h: 15152874137,
    market_cap_change_percentage_24h: 1.33884,
    circulating_supply: 18857718.0,
    total_supply: 21000000.0,
    max_supply: 21000000.0,
    ath: 67277,
    ath_change_percentage: -9.62148,
    ath_date: "2021-10-20T14:54:17.702Z",
    atl: 67.81,
    atl_change_percentage: 89569.1717,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2021-10-29T08:42:33.539Z",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    current_price: 4321.0,
    market_cap: 510632823504,
    market_cap_rank: 2,
    fully_diluted_valuation: null,
    total_volume: 29912522986,
    high_24h: 4416.05,
    low_24h: 4116.45,
    price_change_24h: 198.79,
    price_change_percentage_24h: 4.82238,
    market_cap_change_24h: 25968706565,
    market_cap_change_percentage_24h: 5.35808,
    circulating_supply: 118122032.999,
    total_supply: null,
    max_supply: null,
    ath: 4416.05,
    ath_change_percentage: -2.17073,
    ath_date: "2021-10-29T01:34:32.208Z",
    atl: 0.432979,
    atl_change_percentage: 997683.10353,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: {
      times: 93.9351734827081,
      currency: "btc",
      percentage: 9393.517348270809,
    },
    last_updated: "2021-10-29T08:42:56.986Z",
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "Binance Coin",
    image:
      "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
    current_price: 494.81,
    market_cap: 83187309373,
    market_cap_rank: 3,
    fully_diluted_valuation: 83187309373,
    total_volume: 2560985064,
    high_24h: 501.56,
    low_24h: 477.67,
    price_change_24h: 16.93,
    price_change_percentage_24h: 3.5427,
    market_cap_change_24h: 3020675022,
    market_cap_change_percentage_24h: 3.768,
    circulating_supply: 168137035.9,
    total_supply: 168137035.9,
    max_supply: 168137035.9,
    ath: 686.31,
    ath_change_percentage: -27.91248,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 0.0398177,
    atl_change_percentage: 1242416.44256,
    atl_date: "2017-10-19T00:00:00.000Z",
    roi: null,
    last_updated: "2021-10-29T08:42:48.898Z",
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image:
      "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
    current_price: 1.0,
    market_cap: 71030646340,
    market_cap_rank: 4,
    fully_diluted_valuation: null,
    total_volume: 103878652454,
    high_24h: 1.02,
    low_24h: 0.980857,
    price_change_24h: -0.009995473862,
    price_change_percentage_24h: -0.98831,
    market_cap_change_24h: -493174843.6403351,
    market_cap_change_percentage_24h: -0.68953,
    circulating_supply: 70932110814.7574,
    total_supply: 70932110814.7574,
    max_supply: null,
    ath: 1.32,
    ath_change_percentage: -24.31466,
    ath_date: "2018-07-24T00:00:00.000Z",
    atl: 0.572521,
    atl_change_percentage: 74.90872,
    atl_date: "2015-03-02T00:00:00.000Z",
    roi: null,
    last_updated: "2021-10-29T08:41:32.875Z",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
    current_price: 2.0,
    market_cap: 64013397550,
    market_cap_rank: 5,
    fully_diluted_valuation: 89832464138,
    total_volume: 3011760013,
    high_24h: 2.06,
    low_24h: 1.96,
    price_change_24h: -0.023464908051,
    price_change_percentage_24h: -1.16195,
    market_cap_change_24h: -285812426.5689163,
    market_cap_change_percentage_24h: -0.4445,
    circulating_supply: 32066390668.4135,
    total_supply: 45000000000.0,
    max_supply: 45000000000.0,
    ath: 3.09,
    ath_change_percentage: -35.38564,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 10260.01627,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: "2021-10-29T08:43:26.256Z",
  },
];

test("Renders <CoinList/> in DOM without errors", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDOM.render(<CoinList coins={COINS_MOCK} />, div);
  });
});

test("Renders <CoinList/> correctly against snapshot", () => {
  const tree = renderer.create(<CoinList coins={COINS_MOCK} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("<CoinList/> should render coin names", async () => {
  render(<CoinList coins={COINS_MOCK} />);
  COINS_MOCK.forEach((coin) => {
    const coinName = screen.getByText(coin.name);
    expect(coinName).toBeInTheDocument();
  });
});
