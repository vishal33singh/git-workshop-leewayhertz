import React from "react";
import BaseComponent from "../baseComponent";
import SidebarComponent from "./sidebarComponent";
import { UserModel } from "../../models/user";
import { connect } from "react-redux";
import { dispatchAction } from "../../utility";
class Sidebar extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: new UserModel(),
    };
  }

  componentDidMount() {
    const userDetails =
      this.props.user.userDetails &&
      Object.keys(this.props.user.userDetails).length
        ? this.props.user.userDetails
        : this.state.userDetails;
    this.setState({ userDetails });
  }

  render() {
    return (
      <SidebarComponent
        state={this.state}
        showSidebar={this.props.showSidebar}
      />
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { dispatchAction })(Sidebar);
