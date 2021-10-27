import { Button, CircularProgress, Typography, useTheme } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { getCoins } from "../api/CoinGeckoApi";
import CoinList from "../components/CoinList";
import NavBar from "../components/NavBar";
import "./styles/Home.css";
const Home: FC = () => {
  const theme = useTheme();
  const [coins, setCoins] = useState<Array<any>>([]);
  const [coinPage, setCoinPage] = useState(1);

  const [isLoadingCoins, setIsLoadingCoins] = useState(false);

  useEffect(() => {
    setIsLoadingCoins(true);
    getCoins(coinPage)
      .then((res) => {
        console.log(res.data);
        setCoins([...coins, ...res.data]);
        setIsLoadingCoins(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingCoins(false);
      });
  }, [coinPage]);

  function handleClickMore() {
    setCoinPage(coinPage + 1);
  }

  function handleReturnTop() {
    setCoins([]);
    setCoinPage(1);
  }

  return (
    <div className="main" style={{ display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ height: "100%" }}>
        <div className="main-text">
          <Typography variant="h1">
            <span style={{ color: theme.palette.secondary.main }}>
              Cryptocurrency Info
            </span>{" "}
          </Typography>
        </div>
        <div className="main-text">
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
    </div>
  );
};

export default Home;
