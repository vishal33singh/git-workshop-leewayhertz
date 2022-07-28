import React from "react";
import { history } from "../../managers/history";
import BaseComponent from "../baseComponent";
import ForgetPasswordComponent from "./forgetPasswordComponent";
import { connect } from "react-redux";
import { forgetPassword } from "../../services/user";
import Utils, { dispatchAction } from "../../utility";
import { eventConstants } from "../../constants";
class ForgetPassword extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: false,
      error: "",
      emailError: "",

    };
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

    return (
      Utils.validateEmail(this.state.email)     );
  };
  handleChange = (name, value) => {
    this.setState({ [name]: value });
    if (name === "success" && !value) {
      history.push("/");
    }
    if(this.state.emailError) {
      this.setState({emailError: ""})
    }
  };


  sendForgetPasswordRequest = async () => {
    if (!this.validateLoginForm()) 
      // this.setState({ error: "Please provide required field" });
      return;
    
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const data = {
      email: this.state.email,
    };

    const [error, response] = await Utils.parseResponse(forgetPassword(data));
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (!response || error) {
      this.setState({ error: "Failed to update password" });
      return;
    }
    this.setState({ success: true });
  };

  render() {
    return (
      <ForgetPasswordComponent
        state={this.state}
        handleChange={this.handleChange}
        sendForgetPasswordRequest={this.sendForgetPasswordRequest}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(ForgetPassword);
