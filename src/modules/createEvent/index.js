import React from "react";
import BaseComponent from "../baseComponent";
import CreateEventComponent from "./createEventComponent";
import {
  AdminPermissions,
  CreateEventConstants,
  eventConstants,
  Pages,
  StatusConstatnts,
} from "../../constants";
import ListOfTickets from "./listOfTickets";
import AddTickets from "./addTickets";
import SplitsComponents from "./publish";
import {
  createEvent,
  getCategories,
  updateEvent,
  uploadEventImage,
} from "../../services/event";
import Utils from "../../utility";
import { connect } from "react-redux";
import { sessionManager } from "../../managers/sessionManager";
import { history } from "../../managers/history";
import moment from "moment-timezone";
import ct from "countries-and-timezones";
import Utility from "../../utility";
import PublishModal from "./publishModal";
class CreateEvent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: CreateEventConstants.BASIC_INFO,
      basicDetailsFilled: true,
      creatorId: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      image: "",
      eventImageFile: {},
      tickets: [],
      splits: [],
      royaltyPercentage: "",
      royaltyWalletAddress: "",
      location: "VENUE",
      category: "",
      venueLocation: {
        country: "",
        state: "",
        pincode: "",
        city: "",
        venue: "",
      },
      videoConferenceLink: "",
      walletAddress:
        JSON.parse(
          sessionManager.getDataFromCookies(eventConstants.USER_DETAILS)
        ) || "",
      isValidDate: false,
      ticketNumberToBeEdited: null,
      isPublishing: false,
      eventTimezone: "",
      categoryList: [],
    };
  }

  updateActivePage = (activePage) => {
    if(activePage === CreateEventConstants.TICKETS){
      this.setState({ticketNumberToBeEdited: null})
    }
    this.setState({ activePage: activePage,  isPublishing: false});
  };

  createEvent = async (splitsArray) => {
    if(!window.caver?.currentProvider?.selectedAddress){
      Utils.apiFailureToast("You are not connected to your Kaikas wallet!")
      return;
    }
    await this.setState({ splits: splitsArray, isPublishing: true });

    let tickets = this.state.tickets;

    for (let i = 0; i < tickets.length; i++) {
      tickets[i].ticketNftTokenId = i + 1;
      tickets[i].gifts.giftNftTokenId = parseInt(i + 1 + "1");
    }

    let timeZoneDetails = ct.getTimezone(this.state.eventTimezone)

    let requestData = {
      creatorId: this.props?.user?.userDetails?.userId,
      name: this.state.name,
      description: this.state.description,
      startTime: Number(
          new Date(this.state.startDate + " " + this.state.startTime + " " + (moment().tz(this.state.eventTimezone).isDST() ? timeZoneDetails.dstOffsetStr : timeZoneDetails.utcOffsetStr))
      ),
      endTime: Number(
          new Date(this.state.endDate + " " + this.state.endTime + " " + (moment().tz(this.state.eventTimezone).isDST() ? timeZoneDetails.dstOffsetStr : timeZoneDetails.utcOffsetStr))
      ),
      image: this.state.image,
      tickets: tickets,
      ownerWalletAddress: window.caver.utils.toChecksumAddress(
        window.caver?.currentProvider?.selectedAddress
      ),
      splits: this.state.splits,
      royaltyPercentage: parseInt(this.state.royaltyPercentage),
      royaltyWalletAddress: window.caver.utils.toChecksumAddress(
        this.state.royaltyWalletAddress
      ),
      category: this.state.category,
      location: this.state.location,
      videoConferenceLink: this.state.videoConferenceLink,
      venueLocation: this.state.venueLocation,
      eventTimezone: this.state.eventTimezone,
      network:
        window.caver?.currentProvider?.networkVersion === 8217
          ? "Cypress"
          : "Baobab",
    };

    let [err, eventRes] = await Utils.parseResponse(createEvent(requestData));

    if (!err && eventRes) {
      await this.deployEventSmartContract(eventRes);
    } else {
      this.setState({ isPublishing: false });
      Utils.apiFailureToast("Contract creation failed!");
      Utils.apiFailureToast("Check the details on the Splits page");
    }
  };

  deployEventSmartContract = async (eventRes) => {
    window.caver.currentProvider.enable();

    const gasPrice = await window.caver.klay.getGasPrice();

    let bytecode = eventRes.contractByteCode;

    let transaction = {
      from: window.caver?.currentProvider?.selectedAddress, //this.props?.user?.kaikasWalletDetails?.address,
      gas: 7920000,
      gasPrice: gasPrice,
      data: bytecode,
    };

    await window.caver.klay
      .sendTransaction(transaction)
      .on("transactionHash", function (hash) {})
      .on("error", function (error) {})
      .on(
        "receipt",
        async function (receipt) {
          let updateRequest = {
            id: eventRes._id,
            contractAddress: receipt.contractAddress,
            transactionHash: receipt.transactionHash,
            contractDeploymentStatus: StatusConstatnts.DEPLOYED,
          };
          await this.updateEventAfterDeployment(updateRequest);
        }.bind(this)
      );
  };

  updateEventAfterDeployment = async (request) => {
    let [err, updateEventRes] = await Utils.parseResponse(updateEvent(request));
    this.setState({ isPublishing: false });
    if (updateEventRes) {
      Utils.apiSuccessToast("Event created successfully");
      history.push(Pages.EVENTS);
    } else {
      Utils.apiFailureToast("Could not create the Event");
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  updateVenueLocation = (location) => {
    this.setState({
      venueLocation: location,
    });
  };

  addNewTicket = (newTicket) => {
    let currentTickets = this.state.tickets;
    if (this.state.ticketNumberToBeEdited !== null) {
      currentTickets[this.state.ticketNumberToBeEdited] = newTicket;
    } else {
      currentTickets.push(newTicket);
    }
    this.setState({ tickets: currentTickets, ticketNumberToBeEdited: null });
  };

  checkBasicInfo = () => {
    const startDateTime = Utils.dateConstructer(
      this.state.startDate,
      this.state.startTime
    );
    const endDateTime = Utils.dateConstructer(
      this.state.endDate,
      this.state.endTime
    );
    if (
      this.state.name === "" ||
      this.state.description === "" ||
      this.state.startDate === 0 ||
      this.state.endDate === 0 ||
      this.state.startTime === 0 ||
      this.state.endTime === 0 ||
      this.state.image === "" ||
      (this.state.venueLocation.venue === "" &&
      this.state.videoConferenceLink === "") ||
      this.state.category === "" ||
      this.state.eventTimezone === ""
    ) {
      this.setState({ basicDetailsFilled: false });
      return false;
    }
    if (startDateTime >= endDateTime) {
      this.setState({ isValidDate: true });
      return;
    }
    if(new Date() >= startDateTime){
      this.setState({isValidDate: true})
      return;
    }
    this.setState({isValidDate: false})
    this.setState({ basicDetailsFilled: true });
    return true;
  };

  uploadEventImage = async (file) => {
    const imageData = new FormData();
    imageData.append("image", file[0]);
    let [err, updateEventRes] = await Utils.parseResponse(
      uploadEventImage(imageData)
    );

    if (updateEventRes) {
      this.setState({ image: updateEventRes.responseData, eventImageFile: file[0]});
      // Utils.apiSuccessToast("Image Uploaded");
    } else {
      Utils.apiFailureToast("Image upload failed");
    }
  };

  updateTicketNumberToBeEdited = async (index) => {
    this.setState({ ticketNumberToBeEdited: index });
  };

  deleteTicket = async (index) => {
    let currentTickets = this.state.tickets;
    currentTickets.splice(index, 1);
    this.setState({ tickets: currentTickets });
  };

  updateLocationType = async (location) => {
    this.setState({ location: location });
  };

  getCategories = async () => {
    let [err, categoriesRes] = await Utils.parseResponse(getCategories());
    if (categoriesRes && !err) {
      this.setState({ categoryList: categoriesRes });
    }
  };

  deleteEventImage = () => {
    this.setState({ image: "", eventImageFile: {}});
  }

  async componentDidMount() {
    await this.getCategories();
  }

  render() {
    if (
      !Utility.checkPermission(
        AdminPermissions.EVENTS,
        this.props.user?.userDetails
      )
    ) {
      history.replace(Pages.USER_MANAGEMENT);
    }
    switch (this.state.activePage) {
      case CreateEventConstants.BASIC_INFO:
        return (
          <>
            <CreateEventComponent
              handleChange={this.handleChange}
              updateActivePage={this.updateActivePage}
              updateVenueLocation={this.updateVenueLocation}
              checkBasicInfo={this.checkBasicInfo}
              uploadEventImage={this.uploadEventImage}
              updateLocationType={this.updateLocationType}
              deleteEventImage={this.deleteEventImage}
              state={this.state}
            />
          </>
        );

      case CreateEventConstants.TICKETS:
        return (
          <ListOfTickets
            updateActivePage={this.updateActivePage}
            updateTicketNumberToBeEdited={this.updateTicketNumberToBeEdited}
            deleteTicket={this.deleteTicket}
            state={this.state}
          />
        );

      case CreateEventConstants.ADD_TICKET:
        return (
          <AddTickets
            addNewTicket={this.addNewTicket}
            updateActivePage={this.updateActivePage}
            state={this.state}
          />
        );

      case CreateEventConstants.SPLITS:
        return (
            <>
              <SplitsComponents
                  updateActivePage={this.updateActivePage}
                  createEvent={this.createEvent}
                  handleChange={this.handleChange}
                  state={this.state}
              />

              <PublishModal
                  isLoading={this.state.isPublishing}
                  eventName={this.state.name}
              />

            </>
        );

      default:
        return;
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CreateEvent);
