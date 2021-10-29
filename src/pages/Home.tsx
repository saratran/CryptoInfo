import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  CircularProgress,
  Collapse,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useState } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { getCoins, getCoinSimple } from "../api/CoinGeckoApi";
import CoinFilter from "../components/CoinFilter";
import CoinList from "../components/CoinList";
import NavBar from "../components/NavBar";
import "./styles/Home.css";

const useStyles = makeStyles({
  loadingIcon: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  buttonMore: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  buttonReturn: { marginTop: 10, marginBottom: 10, float: "right" },
});

const Home: FC = () => {
  const theme = useTheme();
  const classes = useStyles();
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
          <CircularProgress color="secondary" className={classes.loadingIcon} />
        ) : (
          <Button
            className={classes.buttonMore}
            variant="contained"
            color="primary"
            onClick={handleClickMore}
          >
            Load more
          </Button>
        )}
        <Button
          className={classes.buttonReturn}
          variant="outlined"
          color="primary"
          onClick={handleReturnTop}
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

export default Home;
