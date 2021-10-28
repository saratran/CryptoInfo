import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import "./styles/NavBar.css";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableContainer: {},
  table: {},
  list: {},
  thead: {},
  tbody: {},
  row: {
    height: 40,
  },
  headerRow: {},
  headerCell: {
    fontWeight: "bold",
  },
  cell: {},
  expandingCell: {},
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
            <TableRow className={classes.headerRow}>
              <TableCell className={classes.headerCell} width={4}>
                Rank
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="left"
                width={200}
              >
                Name
              </TableCell>
              <TableCell className={classes.headerCell} align="left">
                Symbol
              </TableCell>
              <TableCell className={classes.headerCell} align="right">
                Current Price (USD)
              </TableCell>
              <TableCell className={classes.headerCell} align="right">
                Market Cap (USD)
              </TableCell>
              <TableCell className={classes.headerCell} align="right">
                Circulating Supply
              </TableCell>
              <TableCell className={classes.headerCell} align="right">
                %24h
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {coins.map((item, i) => (
              <TableRow className={classes.row} key={i}>
                <TableCell
                  scope="row"
                  component="th"
                  style={{ height: "100%" }}
                  className={classes.headerCell}
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
