import React, { lazy, Suspense } from "react";
import { Router, Route, withRouter } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import Main from "./modules/main/index";
import { history } from "./managers/history";
const DashBoardContainer = withRouter(
  lazy(() => import("./modules/common/componentHandler"))
);

const Routes = () => {
  return (
    <Router history={history}>
      <Suspense fallback={"..."}>
        <Switch>
          <Route exact path={"/:menu"} component={DashBoardContainer} />
          <Route exact path={"/"} component={Main} />
          <Redirect exact from="*" to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
