import React, { useEffect } from "react";
import BaseComponent from "../baseComponent";
import UserManagement from "./userManagement";
import { connect } from "react-redux";
import {
  eventConstants,
  genericConstants,
  RoleConstant,
} from "../../constants";
import { getBuyersList, blockUser } from "../../services/event";
import { BuyersModel } from "../../models/buyers";
import Utils, { dispatchAction } from "../../utility";
import {
  addAdminUser,
  deleteUser,
  getSubOrganisers,
} from "../../services/user";
import { UserModel } from "../../models/user";

class User extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortingKey: "",
      limit: 5,
      total: 0,
      buyers: [],
      admins: [],
      skip: 0,
      searchQuery: "",
      openConfimation: false,
      selectedTab: "USERS",
      selectedUser: {},
      selectedSubOrganiser: {},
      showEditAddModel: false,
      loading:false,

    };
  }

  componentDidMount() {
    this.getBuyersList();
  }

  searchUser = async (event) => {
    event.preventDefault();
    await this.getBuyersList();
  };

  handleChange = async (name, value) => {
    const splitRes = name.split(".");
    if (splitRes.length > 1) {
      if (splitRes[0] === genericConstants.SELECTED_SUB_ORGANISER) {
        let selectedSubOrganiser = this.state.selectedSubOrganiser;
        selectedSubOrganiser[splitRes[1]] = value;
        this.setState({ selectedSubOrganiser });
      }
      return;
    }
    this.setState({ [name]: value });
    if (name === "selectedUser") {
      this.setState({ openConfimation: true });
    }
    if (
      name === "selectedTab" ||
      (name === "sortingKey" && this.state.buyers && this.state.buyers.length)
    ) {
      await this.setState({ skip: 0 });
      switch (this.state.selectedTab) {
        case "USERS":
          this.getBuyersList(0);
          break;
        case "ADMINS":
          this.getSubOrganisers(0);
          break;
      }
    }
    if (name === "searchQuery") {
      switch (this.state.selectedTab) {
        case "USERS":
          setTimeout(() => {
            this.getBuyersList(this.state.skip, value);
          }, 50);
          break;
        case "ADMINS":
          setTimeout(() => {
            this.getSubOrganisers(this.state.skip, value);
          }, 50)
          break;
      }
    }
  };

  getListByPage = async (page) => {
    this.setState({loading:true})
    this.setState({ skip: page * this.state.limit });
    await this.getBuyersList(page * this.state.limit);
  };

  getBuyersList = async (skip) => {
    this.setState({loading:true})
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const userId =
      this.props.user?.userDetails?.role === RoleConstant.ORGANISER
        ? this.props.user?.userDetails?.userId
        : this.props.user?.userDetails?.organization?.id;
    const [error, buyers] = await Utils.parseResponse(
      getBuyersList(
        userId,
        this.state.searchQuery,
        skip,
        this.state.limit,
        this.state.sortingKey
      )
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !buyers || !buyers.data || !buyers.data.length) {
      this.setState({ buyers: [], total: 0, skip: 0,loading:false });
      return;
    }
    this.setState({
      buyers: buyers.data.map((item) => new BuyersModel(item)),
      total: buyers.total,
      loading:false
    });
  };

  getSubOrganisers = async (skip) => {
    this.setState({loading:true})
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const userId =
      this.props.user?.userDetails?.role === RoleConstant.ORGANISER
        ? this.props.user?.userDetails?.userId
        : this.props.user?.userDetails?.organization?.id;
    const [error, admins] = await Utils.parseResponse(
      getSubOrganisers(
        userId,
        skip,
        this.state.limit,
        this.state.searchQuery,
        this.state.sortingKey,
      )
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !admins || !admins.data || !admins.data.length) {
      this.setState({ buyers: [], total: 0, skip: 0,loading:false });
      return;
    }
    this.setState({
      admins: admins.data.map((item) => new UserModel(item)),

      total: admins.total,
      loading:false
    });

  };
  blockUser = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const request = {
      reportedBy: this.props.user.userDetails.userId,
      reportedUser: this.state.selectedUser._id,
    };
    const [error, blockResponse] = await Utils.parseResponse(
      blockUser(request)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, blockResponse);
    if (error) {
      return;
    }
    this.setState({ openConfimation: false });
    this.componentDidMount();
  };

  sortByName = (sortedData) => {
    this.setState({ buyers: sortedData });
  };

  deleteUser = async (userId) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, user] = await Utils.parseResponse(deleteUser(userId));
    this.props.dispatchAction(eventConstants.HIDE_LOADER, user);
    if (error) return;
    this.getSubOrganisers();
  };

  addAdminUser = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, user] = await Utils.parseResponse(
      addAdminUser({
        ...this.state.selectedSubOrganiser,
        role: RoleConstant.SUB_ORGANISER,
        organization: {
          ...this.props.user.userDetails.organization,
          id: this.props.user.userDetails.userId,
        },
        addedBy: this.props.user.userDetails.userId,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !user) {
      Utils.apiFailureToast(error);
      return;
    }
    this.props.dispatchAction(eventConstants.USER_ADDED, user);
    this.setState({ showEditAddModel: false, successToast: true });
    this.getSubOrganisers();
  };

  onEditClick = (selectedUser) => {
    this.setState({
      showEditAddModel: true,
      isEdit: true,
    });
    this.state.selectedTab === "ADMIN"
      ? this.setState({ selectedSubOrganiser: { ...selectedUser } })
      : this.setState({ selectedUser: { ...selectedUser } });
  };

  render() {
    return (
      <UserManagement
        blockUser={this.blockUser}
        state={this.state}
        user={this.props.user?.userDetails}
        handleChange={this.handleChange}
        searchUser={this.searchUser}
        deleteUser={this.deleteUser}
        onEditClick={this.onEditClick}
        getListByPage={this.getListByPage}
        sortByName={this.sortByName}
        addAdminUser={this.addAdminUser}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(User);
