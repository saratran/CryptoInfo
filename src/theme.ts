import { responsiveFontSizes, createTheme } from "@mui/material";
import "./index.css";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#4e46b4",
      },
      secondary: {
        main: "#ff7878",
      },
    },
    typography: {
      h1: {
        fontSize: 60,
        fontWeight: 800,
      },
      h2: {
        fontSize: 44,
        fontWeight: 800,
      },
      h3: {
        fontSize: 36,
        fontWeight: 600,
      },
      body1: {
        fontSize: 24,
        color: "#777777",
      },
      body2: {
        fontSize: 14,
        color: "#777777",
      },
      fontFamily: [
        "Nunito",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  })
);
