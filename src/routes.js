import React from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import BaseComponent from "./modules/baseComponent";
import { history } from "./managers/history";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Login } from "./modules/loginPage/signIn";

class Routes extends BaseComponent {
  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          <Switch>
            <Route exact path={"/"} component={Login} />
            {/* <Route path="/profile" component={Profile} />
            <Route path="/spaces" component={Spaces} />
            <Route path="/manage-your-bookings" component={ManageBookings} /> */}
            {/* <Route path="/manage-bookings/:eventId" component={ManageEvent} />
            <Route path="/past-event" component={ManagePastEvent} />
            <Route path="/about" component={About} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-and-conditions" component={TermsAndCondition} />
            <Route path="/support" component={Support} />
            <Route path="/solutionfor/:pages" component={SolutionFor} />
            <Route path="/email-verified" component={EmailVerified} /> */}
            <Redirect exact from="*" to="/" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
