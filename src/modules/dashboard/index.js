import React from "react";
import BaseComponent from "../baseComponent";
import DashboardScreen from "./component";
import { connect } from "react-redux";
import Utils, { dispatchAction } from "../../utility";
import {
  getTicketAnalytics,
  getContibutorsAmount,
  getSalesByEvent,
} from "../../services/event";
import {
  StatusConstatnts,
  eventConstants,
  AdminPermissions,
  Pages, RoleConstant,
} from "../../constants";
import Utility from "../../utility";
import { history } from "../../managers/history";

class Dashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      endTime: 0,
      status: "",
      type: "",
      typeTitle: "",
      timeTitle: "",
      revenue: 0,
      realizedRevenue: 0,
      attendees: 0,
      ticketSold: 0,
      totalTicket: 0,
      chartData: [],
      legends: [],
      salesByEvents: [],
      totalSalesByEvents: 0,
      limit: 10,
      skip: 0,
      sortingKey: "",
      loading:false,
    };
  }

  handleChange = async (name, value, title) => {
    await this.setState({ [name]: value });
    if (name === "status") {
      this.setState({ skip: 0 });
      this.getAnalyticsData();
    }
    if (name === "type") {
      this.setState({ typeTitle: title, skip: 0 });
      this.getAnalyticsData();
    }
    if (name === "startTime") {
      await this.setState({ endTime: Date.now(), timeTitle: title, skip: 0 });
      this.getAnalyticsData();
    }
    if (name === "sortingKey") {
      await this.getSalesByEvent();
    }
  };

  getAnalyticsData = async () => {
    await this.getTicketAnalytics();
    await this.getContibutorsAmount();
    await this.getSalesByEvent();
  };

  getTicketAnalytics = async () => {
    this.setState({loading:true})
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const data = {
      creator: this.props.user.userDetails.role === RoleConstant.ORGANISER
          ? this.props.user.userDetails.userId
          : this.props.user.userDetails.organization.id,
      endTime: this.state.endTime,
      startTime: this.state.startTime,
      status: this.state.status,
      type: this.state.type,
    };
    const [error, analytics] = await Utils.parseResponse(
      getTicketAnalytics(data)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !analytics) return;
    this.setState({
      ticketSold: analytics.ticketSold,
      attendees: analytics.attendees ? analytics.attendees : 0,
      revenue: analytics.revenue,
      realizedRevenue: analytics.realizedRevenue,
      totalTicket: analytics.totalTicket,
      loading:false,
    });
  };

  getContibutorsAmount = async () => {
    this.setState({loading:true})
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const data = {
      creator: this.props.user.userDetails.role === RoleConstant.ORGANISER
          ? this.props.user.userDetails.userId
          : this.props.user.userDetails.organization.id,
      endTime: this.state.endTime,
      startTime: this.state.startTime,
      status: this.state.status,
      type: this.state.type,
    };
    const [error, analytics] = await Utils.parseResponse(
      getContibutorsAmount(data)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !analytics || !analytics.data || !analytics.data.length) {
      this.setState({ chartData: [], legends: [], loading:false });
      return;
    }
    let chartData = [],
      legends = [];
    let analyticsData = analytics.data;
    analyticsData.sort(function(a, b) {
      let keyA = a.contributor;
      let keyB = b.contributor;

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    analyticsData.map((item) => {
      legends.push({
        name: item.contributor,
        amount: item.amount,
        loading:false
      });
      const percentage = (item.amount / analytics.amount) * 100;
      chartData.push({ section: percentage });
      return item;
    });
    this.setState({ chartData, legends,loading:false,});
  };

  getSalesByEvent = async (update = false, skip = 0) => {
    this.setState({loading:true})
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const data = {
      creator: this.props.user.userDetails.role === RoleConstant.ORGANISER
          ? this.props.user.userDetails.userId
          : this.props.user.userDetails.organization.id,
      endTime: this.state.endTime,
      startTime: this.state.startTime,
      status: this.state.status,
      type: this.state.type,
      skip: 0, //skip ? skip : this.state.skip,
      limit: 0, //this.state.limit,
      sortingKey: this.state.sortingKey,
    };
    const [error, analytics] = await Utils.parseResponse(getSalesByEvent(data));
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (skip) {
      this.setState({ skip,loading:false });
    }
    if (error || !analytics || !analytics.data) {
      this.setState({
        salesByEvents: [],
        totalSalesByEvents: 0,
        loading:false
      });
      return;
    }
    this.setState({
      salesByEvents: update
        ? [...this.state.salesByEvents, ...analytics.data]
        : analytics.data,
      totalSalesByEvents: analytics.total,
      loading:false
    });
  };

  componentDidMount() {
    this.getAnalyticsData();
  }

  sortByName = (value) => {
    this.setState({ salesByEvents: value });
  };

  render() {
    if (
      !Utility.checkPermission(
        AdminPermissions.DASHBOARD,
        this.props.user?.userDetails
      )
    ) {
      history.replace(Pages.USER_MANAGEMENT);
    }
    return (
      <DashboardScreen
        handleChange={this.handleChange}
        state={this.state}
        getSalesByEvent={this.getSalesByEvent}
        sortByName={this.sortByName}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(Dashboard);
