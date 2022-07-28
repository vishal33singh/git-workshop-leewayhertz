import React from "react";
import { eventConstants } from "../../constants";
import Utils, { dispatchAction } from "../../utility";
import BaseComponent from "../baseComponent";
import UpdatePasswordComponent from "./updatePasswordComponent";
import { changePassword } from "../../services/user";
import { connect } from "react-redux";
import { history } from "../../managers/history";

class UpdatePassword extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      temperaryPassword: "",
      newPassword: "",
      confirmPassword: "",
      userId: "",
      success: false,
      error: "",
    };
  }

  componentDidMount() {
    const pathName = window.location.pathname;
    if (pathName.split("/").length < 3) {
      history.push("/");
      return;
    }
    this.setState({ userId: pathName.split("/")[2] });
  }

  handleChange = (name, value) => {
    if (this.state.error) {
      this.setState({ error: "" });
    }
    this.setState({ [name]: value });
  };

  updatePassword = async () => {
    if (
      !this.state.confirmPassword ||
      !this.state.newPassword ||
      !this.state.temperaryPassword
    ) {
      this.setState({ error: "Please provide required field" });
      return;
    }
    if (this.state.confirmPassword !== this.state.newPassword) {
      this.setState({ error: "Confirm and new password did not match" });
      return;
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const data = {
      temperaryPassword: this.state.temperaryPassword,
      newPassword: this.state.newPassword,
      userId: this.state.userId,
    };

    const [error, response] = await Utils.parseResponse(changePassword(data));
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (!response || error) {
      this.setState({ error: "Failed to update password" });
      return;
    }
    this.setState({ success: true });
  };

  render() {
    return (
      <UpdatePasswordComponent
        handleChange={this.handleChange}
        updatePassword={this.updatePassword}
        state={this.state}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(UpdatePassword);
