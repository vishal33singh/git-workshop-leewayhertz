import React from "react";
import BaseComponent from "../baseComponent";
import LoginComponent from "./loginComponent";

import Utils, { dispatchAction } from "../../utility";
import { history } from "../../managers/history";
import { eventConstants, Pages } from "../../constants";
import AuthService from "../../services/auth0Service";
import { sessionManager } from "../../managers/sessionManager";
import { connect } from "react-redux";
import { checkIfVerified, resendEmailVerification } from "../../services/user";

class Login extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      forgotEmail: "",
      forgotEmailError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      isPasswordVisible: false,
      modal: false,
      isLoading:false,
      rememberMe: sessionManager.getDataFromCookies(eventConstants.REMEMBER_ME)
      ? true
      : false,
    };
  }

  
  componentDidMount() {
    if (sessionManager.getDataFromCookies(eventConstants.REMEMBER_ME)) {
    let userDetails = sessionManager.getDataFromCookies(
      eventConstants.USER_DETAILS
    );
    const accessToken = sessionManager.getDataFromCookies(
      eventConstants.USER_DETAILS
    );
    if (!userDetails || !accessToken) {
      sessionManager.removeAllData();
      return;
    }
    userDetails = JSON.parse(userDetails);
    this.props.dispatchAction(eventConstants.LOGIN_SUCCESS, {
      userDetails,
      accessToken,
    });
    history.push(Pages.DASHBOARD);
  }
  }
  validateLoginForm = () => {
    if (!this.state.email.length) {
      this.setState({
        emailError: "Please enter the email address",
      });
    } else {
      this.setState({
        emailError: Utils.validateEmail(this.state.email)
          ? ""
          : "Please enter the valid email address",
      });
    }

    if (!this.state.password.length) {
      this.setState({
        passwordError: "Please enter your password",
      });
    } else {
      this.setState({
        passwordError: Utils.isPasswordValid(this.state.password)
          ? ""
          : "Please enter the valid password",
      });
    }

    return (
      Utils.validateEmail(this.state.email) &&
      Utils.isPasswordValid(this.state.password)
    );
  };

  

  reSendVerificationMail = async () => {
    const [error, response] = await Utils.parseResponse(
      resendEmailVerification({
        email: this.state.email,
      })
    );
    if (error) {
      return;
    }
    if (error || !response) return;
    this.setState({ modal: false });
  };

  checkVerificatioStatus = async (email) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);

    const [error, response] = await Utils.parseResponse(
      checkIfVerified({
        email,
      })
    );
    if (error) {
      return;
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !response) return true;
    this.setState({ modal: !response.verified });
    return response.verified;
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
    if (this.state.passwordError) {
      this.setState({ passwordError: "" });
    }
    if(this.state.emailError) {
      this.setState({emailError: ""})
    }
  };
  handleRememberMe = (value) => {
    if (value) {
      sessionManager.setDataInCookies(value, eventConstants.REMEMBER_ME);
    } else sessionManager.setDataInCookies("", eventConstants.REMEMBER_ME);
    this.setState({ rememberMe: value });
  };

  onLoginClicked = async (event) => {
    event.preventDefault();
    if (!this.validateLoginForm()) return;
    this.setState({isLoading: true})
    let status = await this.checkVerificatioStatus(this.state.email,this.state.password);
    if (!status) {
      return;
    }
    this.authObject = new AuthService();
    let [error, res] = await Utils.parseResponse(
      this.authObject.signin(this.state.email, this.state.password)
    );
    if (!res || error) {

      this.setState({isLoading: false})
      this.setState({ 
            emailError:"User doesn't exist"  });
      return;
    }
    if (res) {
      this.props.dispatchAction(eventConstants.LOGIN_SUCCESS, res);
      this.setState({isLoading: false})
      return history.push(Pages.DASHBOARD);
    }
  };

  render() {
    return (
      <LoginComponent
        state={this.state}
        reSendVerificationMail={this.reSendVerificationMail}
        onChangeEvent={this.handleChange}
        onLoginClicked={this.onLoginClicked}
        handleRememberMe={this.handleRememberMe}

      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(Login);
