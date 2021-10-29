import { render, screen, fireEvent, getByText } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import CoinList from "../CoinList";
import renderer from "react-test-renderer";
import CoinFilter from "../CoinFilter";
import userEvent from "@testing-library/user-event";

const COINS_MOCK: CoinSimple[] = [
  {
    id: "dinoswap",
    symbol: "dino",
    name: "DinoSwap",
  },
  {
    id: "dinox",
    symbol: "dnxc",
    name: "DinoX",
  },
  {
    id: "dint-token",
    symbol: "dint",
    name: "DINT Token",
  },
  {
    id: "dionpay",
    symbol: "dion",
    name: "Dionpay",
  },
  {
    id: "dipper",
    symbol: "dip",
    name: "Dipper",
  },
];

test("Renders <CoinFilter/> in DOM without errors", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <CoinFilter
        coins={COINS_MOCK}
        isLoadingCoins={false}
        handleFilterApply={(coins) => {}}
      />,
      div
    );
  });
});

test("Renders <CoinFilter/> correctly against snapshot", () => {
  const tree = renderer
    .create(
      <CoinFilter
        coins={COINS_MOCK}
        isLoadingCoins={false}
        handleFilterApply={(coins) => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("<CoinFilter/> autocomplete should render list of coin names", async () => {
  render(
    <CoinFilter
      coins={COINS_MOCK}
      isLoadingCoins={false}
      handleFilterApply={(coins) => {}}
    />
  );

  const openButton = screen.getByRole("button", { name: "Open" });
  expect(openButton).toBeInTheDocument();
  userEvent.click(openButton);
  COINS_MOCK.forEach((coin) => {
    const coinName = screen.getByText(coin.name);
    expect(coinName).toBeInTheDocument();
  });
});

test("<CoinFilter/> select and apply filter", async () => {
  let selectedCoins;
  render(
    <CoinFilter
      coins={COINS_MOCK}
      isLoadingCoins={false}
      handleFilterApply={(coins) => {
        selectedCoins = coins;
      }}
    />
  );

  const textInput = screen.getByTestId("coin-names-input");
  expect(textInput).toBeInTheDocument();
  userEvent.type(textInput, "dinoswap");
  userEvent.click(screen.getByText("DinoSwap"));
  const applyButton = screen.getByText("Apply");
  userEvent.click(applyButton);
  expect(selectedCoins).toEqual(["dinoswap"]);
});
