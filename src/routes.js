import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Redirect, Switch} from "react-router";
import {connect} from "react-redux";
import Main from "./modules/main/index"
import {history} from "./managers/history";

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={'/'} component={Main}/>
                <Redirect exact from='*' to="/"/>
            </Switch>
        </Router>);
}

const mapStateToProps = (state) => {
    return {user: state.user}
};
export default connect(mapStateToProps)(Routes);
