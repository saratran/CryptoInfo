import { Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { routeLookup } from "../routes";
import "./styles/NavBar.css";

const NavBar: FC = () => {
  const theme = useTheme();

  return (
    <div className="top-bar">
      {/* <Link to="/">
        <div>HOME</div>
      </Link> */}
      <nav>
        <div className="links">
          {routeLookup.map((r, i) => (
            <NavLink
              exact
              to={r.pathname}
              className="link"
              key={i}
              activeClassName="link-active"
            >
              <Typography variant="body1">{r.title}</Typography>
              <div
                className="underline"
                style={{ backgroundColor: theme.palette.primary.main }}
              />
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
