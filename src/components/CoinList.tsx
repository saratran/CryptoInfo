import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import "./styles/NavBar.css";

const useStyles = makeStyles({
  root: {
    // display: "block",
    // flex: 1,
    // height: 400,
    marginTop: 20,
    marginBottom: 20,
    overflow: "auto",
  },
  tableContainer: {
    // height: "100%",
    // width: "100%",
  },
  table: {
    // height: "100%",
    // width: "100%",
  },
  list: {},
  thead: {
    position: "sticky",
    top: 0,
  },
  tbody: {
    // width: "100%",
  },
  row: {
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "nowrap",
    // alignItems: "center",
    // boxSizing: "border-box",
    // minWidth: "100%",
    // width: "100%",
    height: 40,
  },
  headerRow: {},
  cell: {
    // display: "block",
    // flexGrow: 0,
    // flexShrink: 0,
  },
  expandingCell: {
    // flex: 1,
  },
  column: {},
});

interface CoinListProp {
  coins: Array<any>;
}

const CoinList: FC<CoinListProp> = ({ coins }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader>
          <TableHead className={classes.thead} component={Paper}>
            <TableRow>
              <TableCell width={4}>Rank</TableCell>
              <TableCell align="left" width={200}>
                Name
              </TableCell>
              <TableCell align="left">Symbol</TableCell>
              <TableCell align="right">Current Price (USD)</TableCell>
              <TableCell align="right">Market Cap (USD)</TableCell>
              <TableCell align="right">Circulating Supply</TableCell>
              <TableCell align="right">%24h</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {coins.map((item) => (
              <TableRow className={classes.row} key={item.symbol}>
                <TableCell
                  scope="row"
                  component="th"
                  style={{ height: "100%" }}
                >
                  {item.market_cap_rank}
                </TableCell>
                <TableCell>
                  <img
                    src={item.image}
                    style={{ height: 20, width: 20, marginRight: 10 }}
                  />
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.symbol.toUpperCase()}</TableCell>
                <TableCell align="right">
                  ${item.current_price.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ${item.market_cap.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {item.circulating_supply.toLocaleString()}{" "}
                  {item.symbol.toUpperCase()}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color:
                      item.price_change_percentage_24h < 0 ? "red" : "green",
                  }}
                >
                  {item.price_change_percentage_24h}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinList;
