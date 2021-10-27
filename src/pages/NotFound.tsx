import { Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      height: "100vh",
      left: 0,
      right: 0,
    }}
  >
    <Typography variant="h2">404: Page not found</Typography>
    <Link to="/" style={{ textDecoration: "none", paddingTop: 10 }}>
      <Typography color="primary">Return home</Typography>
    </Link>
  </div>
);

export default NotFound;
