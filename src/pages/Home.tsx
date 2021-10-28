import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Collapse,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { getCoins, getCoinSimple } from "../api/CoinGeckoApi";
import CoinList from "../components/CoinList";
import NavBar from "../components/NavBar";
import "./styles/Home.css";

const Home: FC = () => {
  const theme = useTheme();
  const [coins, setCoins] = useState<Array<any>>([]);
  const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [coinFilters, setCoinFilters] = useState<Array<string>>([]);
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

  function handleFilterApply() {
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
            <Autocomplete
              multiple
              id="tags-standard"
              options={allCoins}
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event: any, newValue: Array<any>) => {
                if (newValue) setCoinFilters(newValue.map((value) => value.id));
              }}
              loading={isLoadingCoinSymbols}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Coin names"
                  placeholder="e.g. bitcoin"
                />
              )}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterApply}
              style={{
                marginTop: 20,
              }}
            >
              Apply
            </Button>
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

export default Home;
