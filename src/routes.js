import React, { Suspense, lazy } from "react";
import { Router, Route, withRouter } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import BaseComponent from "./modules/baseComponent";
import { history } from "./managers/history";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import accountSetting from "./modules/accountSetting";
import { sessionManager } from "./managers/sessionManager";
import { eventConstants } from "./constants";
import { CircularProgress } from "@material-ui/core";

const DashBoard = withRouter(lazy(() => import("./modules/handler")));

const LoginComponent = withRouter(lazy(() => import("./modules/login")));

const UpdatePassword = withRouter(
  lazy(() => import("./modules/updatePassword"))
);

const ForgetPassword = withRouter(
  lazy(() => import("./modules/forgetPassword"))
);

const CreateAccount = withRouter(
  lazy(() => import("./modules/login/createAccount"))
);
class Routes extends BaseComponent {
  componentDidMount() {
    if (!sessionManager.getDataFromCookies(eventConstants.ACCESS_TOKEN)) {
      history.push("/");
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          <Suspense
            fallback={
              <div className="screenloader ring-blue-50">
                <CircularProgress  />
              </div>
            }
          >
            <Switch>
              <Route exact path={"/"} component={LoginComponent} />
              {/*<Route exact path={"/create-account"} component={CreateAccount} />*/}
              <Route exact path={"/dashboard/:menu"} component={DashBoard} />
              <Route
                exact
                path={"/dashboard/events/:eventId"}
                component={DashBoard}
              />
              <Route
                exact
                path={"/update-password/:userId"}
                component={UpdatePassword}
              />
              <Route
                exact
                path={"/forget-password"}
                component={ForgetPassword}
              />
              <Route
                exact
                path={"/account-setting"}
                component={accountSetting}
              />
              <Redirect exact from="*" to="/" />
            </Switch>
          </Suspense>
        </Router>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
