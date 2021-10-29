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

const Home: FC = () => {
  const theme = useTheme();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [allCoins, setAllCoins] = useState<CoinSimple[]>([]);
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
        setCoins([...coins, ...res]);
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
        setAllCoins(
          res.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        );
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
          <CoinFilter
            coins={allCoins}
            isLoadingCoins={isLoadingCoinSymbols}
            handleFilterApply={handleFilterApply}
          />
        </Collapse>
        <CoinList coins={coins} />
        {isLoadingCoins ? (
          <CircularProgress
            color="secondary"
            sx={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          />
        ) : (
          <Button
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
            variant="contained"
            color="primary"
            onClick={handleClickMore}
          >
            Load more
          </Button>
        )}
        <Button
          sx={{ marginTop: 5, float: "right" }}
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

export default Home;
