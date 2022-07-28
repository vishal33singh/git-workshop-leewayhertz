import React from "react";
import BaseComponent from "../baseComponent";
import AccountSetting from "./component";
import { UserModel } from "../../models/user";
import { updateUser, changePassword } from "../../services/user";
import { connect } from "react-redux";
import Utils, { dispatchAction } from "../../utility";
import { eventConstants, genericConstants } from "../../constants";
import { history } from "../../managers/history";

class Account extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: new UserModel(),
      error: "",
      newPassword: "",
      temperaryPassword: "",
      dummyPassword: "*****",
      isChangePassword: false,
      organizationImage: undefined,
      userImage: undefined,
      isChanged: false,
      isLoading: false,
      isPasswordChanged: false,
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  uploadFile = async () => {
    let formdata = new FormData();
    if (this.state.organizationImage) {
      const ext =
        this.state.organizationImage.name.split(".")[
          this.state.organizationImage.name.split(".").length - 1
        ];
      const newFile = new File(
        [this.state.organizationImage],
        `${genericConstants.ORGANIZATION}_${Date.now()}.${ext}`
      );
      formdata.append("images", newFile);
    }
    if (this.state.userImage) {
      const ext =
        this.state.userImage.name.split(".")[
          this.state.userImage.name.split(".").length - 1
        ];
      const newFile = new File(
        [this.state.userImage],
        `${genericConstants.USER}_${Date.now()}.${ext}`
      );
      formdata.append("images", newFile);
    }
    try {
      let userDetails = this.state.userDetails;
      let uploadRes = await Utils.uploadImage(formdata);
      if (uploadRes.length) {
        for (let index = 0; index < uploadRes.length; index++) {
          if (!uploadRes[index].name || !uploadRes[index].unSignedUrl) {
            continue;
          }
          if (
            uploadRes[index].name.split("_")[0] ===
            genericConstants.ORGANIZATION
          ) {
            userDetails.organization.image = uploadRes[index].unSignedUrl;
          }
          if (uploadRes[index].name.split("_")[0] === genericConstants.USER) {
            userDetails.image = uploadRes[index].unSignedUrl;
          }
        }
      }
      this.setState({ userDetails, userImage: null, organizationImage: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  getUserDetails = async () => {
    this.setState({ userDetails: this.props.user.userDetails });
    // this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    // const [error, user] = await Utils.parseResponse(
    //   getUserInfo(this.props.user.userDetails.userId)
    // );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    // if (error) {
    //   this.setState({ userDetails: new UserModel() });
    //   return;
    // }

    // this.setState({ userDetails: new UserModel(user) });
  };

  handleChange = (name, value) => {
    this.setState({ isChanged: true });
    if (this.state.error) {
      this.setState({ error: "" });
    }
    let userDetails = this.state.userDetails;
    const splitRes = name.split(".");
    if (splitRes.length > 1) {
      if (splitRes[0] === genericConstants.ORGANIZATION) {
        userDetails.organization[splitRes[1]] = value;
      }
      if (splitRes[0] === genericConstants.STATE) {
        const _this = this;
        if (
          splitRes[1] === genericConstants.ORGANIZATION_IMAGE ||
          splitRes[1] === genericConstants.USER_IMAGE
        ) {
          let fileReader = new FileReader();
          fileReader.readAsDataURL(value);
          fileReader.onload = (event) => {
            let userDetails = _this.state.userDetails;
            if (splitRes[1] === genericConstants.USER_IMAGE) {
              userDetails["image"] = event.target.result;
            } else {
              userDetails.organization.image = event.target.result;
            }
            _this.setState({
              userDetails,
            });
          };
        }

        this.setState({ [splitRes[1]]: value });
        return;
      }
    }
    userDetails[name] = value;
    this.setState({ userDetails });
  };

  handleSetState = (key, value) => {
    this.setState({ [key]: value })
  }

  redirectToLogout = () => {
    localStorage.removeItem("USER_DETAILS");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("KAIKAS");
    history.replace("/");
  };

  updateUser = async () => {
    if (!this.state.isChanged) return;
    if (!this.validateUser(this.state.userDetails)) return;

    this.setState({ isLoading: true });
    if (this.state.organizationImage || this.state.userImage)
      await this.uploadFile();
    if (this.state.isPasswordChanged) await this.changePassword();

    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, user] = await Utils.parseResponse(
      updateUser(this.state.userDetails)
    );
    this.setState({ isLoading: false });
    if (Object.keys(user || {}).length !== 0) {
      this.redirectToLogout()
    }
    Utils.apiSuccessToast("Profile Updated");
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    this.props.dispatchAction(eventConstants.USER_UPDATED, user);
    this.setState({ isChanged: false });
    if (error) this.setState({ error });
  };

  changePassword = async () => {
    if (!this.state.temperaryPassword) return;
    const request = {
      userId: this.state.userDetails.userId,
      newPassword: this.state.newPassword,
      temperaryPassword: this.state.temperaryPassword,
    };
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, user] = await Utils.parseResponse(changePassword(request));
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    this.props.dispatchAction(eventConstants.PASSWORD_UPDATED, user);
    if (error) {
      this.setState({ error });
    }
    this.redirectToLogout()
    this.setState({ isChangePassword: false });
  };

  validateUser = (user) => {
    if (!user.name) {
      this.setState({ error: "Full name is required field" });
    }
    return true;
  };

  render() {
    return (
      <AccountSetting
        state={this.state}
        handleChange={this.handleChange}
        updateUser={this.updateUser}
        handleSetState={this.handleSetState}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(Account);