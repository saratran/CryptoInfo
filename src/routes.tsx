import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const routeLookup = [
  {
    pathname: "/",
    component: Home,
    title: "Home",
  },
];

const Routes = () => {
  return (
    <Switch>
      {routeLookup.map((r, i) => (
        <Route key={i} exact path={r.pathname} component={r.component} />
      ))}
      <Route exact path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
