import React from "react";
import BaseComponent from "../baseComponent";
import EventComponent from "./component";
import { StatusConstatnts, eventConstants, Pages } from "../../constants";
import Utils, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import {
  getTicketAnalyticsForEvent,
  getContributorRevenue,
  getSalesByTicketType,
  getOrdersForAEvent,
  getEventDetail,
} from "../../services/event";
import { OrderModel } from "../../models/orders";
import { SalesByTicketTypeModel } from "../../models/salesByTicketType";
import { history } from "../../managers/history";
class EventDetails extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      contributorRevenue: [],
      orders: [],
      salesByTicketType: [],
      total: 0,
      skip: 0,
      limit: 5,
      status: StatusConstatnts.PUBLISHED,
      searchQuery: "",
      type: "",
      sortingKey: "",
      revenue: "",
      attendees: "",
      ticketSold: "",
      eventDetail: "",
    };
  }

  componentDidMount() {
    const pathName = window.location.pathname;
    if (pathName.split("/").length < 3) {
      history.push(Pages.EVENTS);
      return;
    }
    const eventId = pathName.split("/")[3];
    this.getEventDetail(eventId);
    this.getTicketAnalytics(eventId);
    this.getContributorRevenue(eventId);
    this.salesByTicketType(eventId);
    this.getOrders(eventId, this.state.skip);
  }

  getTicketAnalytics = async (eventId) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, analytics] = await Utils.parseResponse(
      getTicketAnalyticsForEvent(eventId)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !analytics) return;
    this.setState({
      ticketSold: analytics.soldTicket,
      attendees: analytics.attendees ? analytics.attendees : 0,
      revenue: analytics.totalRevenue,
    });
  };
  getEventDetail = async (eventId) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, eventDetail] = await Utils.parseResponse(
      getEventDetail(eventId)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !eventDetail) return;
    this.setState({ eventDetail });
  };

  getContributorRevenue = async (eventId) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, contributorRevenue] = await Utils.parseResponse(
      getContributorRevenue(eventId)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !contributorRevenue) {
      this.setState({ contributorRevenue: [] });
      return;
    }
    this.setState({ contributorRevenue });
  };
  salesByTicketType = async (eventId) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, salesByTicketType] = await Utils.parseResponse(
      getSalesByTicketType(eventId)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !salesByTicketType) {
      this.setState({ salesByTicketType: [] });
      return;
    }
    this.setState({
      salesByTicketType: salesByTicketType.map(
        (item) => new SalesByTicketTypeModel(item)
      ),
    });
  };

  getListByPage = async (page) => {
    this.setState({ skip: page * this.state.limit });
    await this.getEvents(this.state.status, page * this.state.limit);
  };
  handleChange = async (name, value) => {
    this.setState({ [name]: value });
    if (name === "sortingKey") {
      this.getEvents(this.state.skip);
    }
  };

  getOrders = async (eventId, skip) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, events] = await Utils.parseResponse(
      getOrdersForAEvent(
        eventId,
        this.state.searchQuery,
        skip ? skip : this.state.skip,
        this.state.limit,
        this.state.sortingKey
      )
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !events || !events.data || !events.data.length) {
      this.setState({ orders: [], total: 0, skip: 0 });
      return;
    }
    this.setState({
      orders: events.data.map((item) => new OrderModel(item)),
      total: events.total,
    });
  };

  render() {
    return (
      <EventComponent
        state={this.state}
        handleChange={this.handleChange}
        getListByPage={this.getListByPage}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(EventDetails);
