import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Routes from "./routes";
import { theme } from "./theme";
require("dotenv").config();
console.log(process.env.BASENAME);
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter
        basename={process.env.BASENAME ? process.env.BASENAME : "/"}
      >
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
