import FilterListIcon from "@mui/icons-material/FilterList";
import {
  autocompleteClasses,
  Button,
  CircularProgress,
  Collapse,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/styles";
import React, { FC, useEffect, useState } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { getCoins, getCoinSimple } from "../api/CoinGeckoApi";
import CoinFilter from "../components/CoinFilter";
import CoinList from "../components/CoinList";
import NavBar from "../components/NavBar";
import "./styles/Home.css";

const Home: FC = () => {
  const theme = useTheme();
  const [coins, setCoins] = useState<Array<any>>([]);
  const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [allCoins, setAllCoins] = useState<Array<any>>([]);
  const [isLoadingCoinSymbols, setIsLoadingCoinSymbols] = useState(false);
  const [pageState, setPageState] = useState<{
    currentPage: number;
    coinFilters: Array<string>;
  }>({
    currentPage: 1,
    coinFilters: [],
  });

  useEffect(() => {
    setIsLoadingCoins(true);
    getCoins(pageState.currentPage, pageState.coinFilters)
      .then((res) => {
        setCoins([...coins, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingCoins(false);
      });
  }, [pageState]);

  useEffect(() => {
    // Get a list of coin symbols to use in autocomplete filter
    setIsLoadingCoinSymbols(true);
    getCoinSimple()
      .then((res) => {
        setAllCoins(res.data.sort((e1: any, e2: any) => e1.name > e2.name));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingCoinSymbols(false);
      });
  }, []);

  function handleClickMore() {
    setPageState({ ...pageState, currentPage: pageState.currentPage + 1 });
  }

  function handleReturnTop() {
    window.location.reload();
  }

  function handleFilterClick() {
    setShowFilter(!showFilter);
  }

  function handleFilterApply(coinFilters: Array<string>) {
    setCoins([]);
    setPageState({ currentPage: 1, coinFilters: coinFilters });
  }

  return (
    <div className="main">
      <NavBar />
      <div className="main-text">
        <Typography variant="h1">
          <span style={{ color: theme.palette.secondary.main }}>
            Cryptocurrency Info
          </span>{" "}
        </Typography>
      </div>
      <div className="main-text">
        <Button variant="outlined" color="primary" onClick={handleFilterClick}>
          <FilterListIcon />
          <div>Filter</div>
        </Button>
        <Collapse in={showFilter}>
          <Paper style={{ padding: 20 }}>
            <CoinFilter
              coins={allCoins}
              isLoadingCoins={isLoadingCoinSymbols}
              handleFilterApply={handleFilterApply}
            />
          </Paper>
        </Collapse>
        <CoinList coins={coins} />
        {isLoadingCoins ? (
          <CircularProgress
            color="secondary"
            style={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickMore}
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          >
            Load more
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleReturnTop}
          style={{ marginTop: 10, marginBottom: 10, float: "right" }}
        >
          {"<- Return to top 100"}
        </Button>
      </div>
    </div>
  );
};

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].name}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactChild[] = [];
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactChild) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export default Home;
