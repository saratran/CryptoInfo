import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  CircularProgress,
  Collapse,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState, useRef } from "react";
import { getCoins, getCoinSimple } from "../api/CoinGeckoApi";
import CoinFilter from "../components/CoinFilter";
import CoinList from "../components/CoinList";
import NavBar from "../components/NavBar";
import "./styles/Home.css";

const Home: FC = () => {
  const theme = useTheme();
  const [coins, setCoins] = useState<Coin[]>([]);
  // const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [loading, setLoading] = useState({
    isLoading: false,
    error: false,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [allCoins, setAllCoins] = useState<CoinSimple[]>([]);
  const [isLoadingAllCoins, setIsLoadingAllCoins] = useState(false);
  const pageState = useRef<{
    currentPage: number;
    coinFilters: Array<string>;
  }>({
    currentPage: 1,
    coinFilters: [],
  });

  const getCoinsData = async (pageState: {
    currentPage: number;
    coinFilters: Array<string>;
  }) => {
    setLoading({
      isLoading: true,
      error: false,
    });

    return getCoins(pageState.currentPage, pageState.coinFilters)
      .then((res) => {
        setCoins((coins) => [...coins, ...res]);
        setLoading({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        setLoading({
          isLoading: false,
          error: true,
        });
        throw err;
      });
  };

  useEffect(() => {
    getCoinsData(pageState.current);
  }, []);

  useEffect(() => {
    // Get a list of coin symbols to use in autocomplete filter
    setIsLoadingAllCoins(true);
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
        setIsLoadingAllCoins(false);
      });
  }, []);

  function handleClickMore() {
    pageState.current = {
      ...pageState.current,
      currentPage: pageState.current.currentPage + 1,
    };

    getCoinsData(pageState.current).catch((err) => {
      pageState.current = {
        ...pageState.current,
        currentPage: pageState.current.currentPage - 1,
      };
    });
  }

  function handleRetry() {
    getCoinsData(pageState.current);
  }

  function handleReturnTop() {
    window.location.reload();
  }

  function handleFilterClick() {
    setShowFilter((showFilter) => !showFilter);
  }

  function handleFilterApply(coinFilters: Array<string>) {
    setCoins([]);
    pageState.current = { currentPage: 1, coinFilters: coinFilters };
    console.log(pageState.current);
    getCoinsData(pageState.current);
  }

  const pageContent = () => {
    if (loading.error) {
      return (
        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" align="center">
            <div>Something went wrong. Please try again.</div>
          </Typography>
          <Button
            sx={{
              marginTop: 3,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
            variant="contained"
            color="primary"
            onClick={handleRetry}
          >
            Retry
          </Button>
        </div>
      );
    }

    if (loading.isLoading) {
      return (
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
      );
    } else {
      return (
        <>
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
          <Button
            sx={{ marginTop: 5, float: "right" }}
            variant="outlined"
            color="primary"
            onClick={handleReturnTop}
          >
            {"<- Return to top 100"}
          </Button>
        </>
      );
    }
  };

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
            isLoadingCoins={isLoadingAllCoins}
            handleFilterApply={handleFilterApply}
          />
        </Collapse>
        <CoinList coins={coins} />
        {pageContent()}
      </div>
    </div>
  );
};

export default Home;
