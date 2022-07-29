import React from "react";
import BaseComponent from "../baseComponent";
import EventComponent from "./eventComponent";
import {
  StatusConstatnts,
  eventConstants,
  Pages,
  AdminPermissions,
  RoleConstant,
} from "../../constants";
import Utils, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import {
  addNewGifts,
  deleteEvent,
  getBuyersAddress,
  getEvents,
  getTicketTypes,
  updateTicket,
} from "../../services/event";
import { EventModel } from "../../models/event";
import TicketSelectionModal from "./ticketSelectionModal";
import Utility from "../../utility";
import { history } from "../../managers/history";

class Event extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading:false,
      total: 0,
      skip: 0,
      limit: 3,
      status: StatusConstatnts.PUBLISHED,
      searchQuery: "",
      type: "",
      typeTitle: "",
      startTime: 0,
      endTime: 0,
      sortingKey: "",
      tickets: [],
      isSelectTicketModalOpen: false,
      distributeGiftEvent: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getEvents(StatusConstatnts.PUBLISHED, this.state.skip);
  }

  getListByPage = async (page) => {
    this.setState({ skip: page * this.state.limit });
    await this.getEvents(this.state.status, page * this.state.limit);
  };
  handleChange = async (name, value, title) => {
    await this.setState({ [name]: value });
    if (name === "status") {
      await this.getEvents(value, this.state.skip);
    }
    if (name === "sortingKey") {
      await this.getEvents(this.state.status, this.state.skip);
    }
    if (name === "type") {
      this.setState({ typeTitle: title });
      await this.getEvents(this.state.status, this.state.skip);
    }
    if (name === "startTime") {
      this.setState({ endTime: Date.now(), timeTitle: title });
      await this.getEvents(this.state.status, this.state.skip);
    }
    if (name === "searchQuery") {
      this.setState({ searchQuery: value });
      this.getEvents(this.state.status, this.state.skip);
    }
  };

  getEvents = async (status, skip) => {
    this.setState({loading:true})
    this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, events] = await Utils.parseResponse(
      getEvents(
        this.state.searchQuery,
        this.state.type,
        this.state.startTime,
        this.state.endTime,
        skip,
        this.state.limit,
        status,
        this.state.sortingKey,
        this.props.user.userDetails.role === RoleConstant.ORGANISER
          ? this.props.user.userDetails.userId
          : this.props.user.userDetails.organization.id
      )
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !events || !events.data || !events.data.length) {
      this.setState({ events: [], total: 0, skip: 0,loading:false });
      return;
    }
    this.setState({
      events: events.data.map((item) => new EventModel(item)),
      total: events.total,
      loading:false,
      isLoading:false
    });
  };

  searchEvent = async (event) => {
    event.preventDefault();
    await this.getEvents(this.state.status, this.state.skip);
  };

  deleteEvent = async (eventId) => {
    const [err, deleteEventRes] = await Utils.parseResponse(
      deleteEvent(eventId)
    );
    if (deleteEventRes) {
      Utils.apiSuccessToast("Event deleted successfully");
      await this.getEvents(this.state.status, this.state.skip);
    } else {
      Utils.apiFailureToast("Could not delete the Event");
    }
  };

  checkWalletConnection = async () => {
    if (window.caver?.currentProvider?.selectedAddress) {
      return true;
    } else {
      Utils.apiFailureToast("Please Connect to Kaikas Wallet");
      return false;
    }
  };

  setDistributeEventDetails = async (
    eventId,
    abi,
    contractAddress,
    ownerWalletAddress,
    contractNetwork,
    creatorEmail
  ) => {
    let eventDetails = {
      eventId: eventId,
      abi: abi,
      contractAddress: contractAddress,
      ownerWalletAddress: ownerWalletAddress,
      contractNetwork: contractNetwork,
      creatorEmail: creatorEmail,
    };

    await this.setState({ distributeGiftEvent: eventDetails });

    const [err, ticketsTypeRes] = await Utils.parseResponse(
      getTicketTypes(eventId)
    );

    if (ticketsTypeRes) {
      await this.setState({
        tickets: ticketsTypeRes.data.filter((obj) => !obj.giftsDistributed),
        isSelectTicketModalOpen: true,
      });
    } else {
      Utils.apiFailureToast("Could not get tickets for this event");
    }
  };

  distributeGifts = async (ticketDetails) => {
    if (await this.checkWalletConnection()) {
      let currentNetwork =
        window.caver?.currentProvider?.networkVersion === 8217
          ? "Cypress"
          : "Baobab";
      if (
        this.state.distributeGiftEvent.ownerWalletAddress !==
        window.caver.utils.toChecksumAddress(
          window.caver?.currentProvider?.selectedAddress
        )
      ) {
        Utils.apiFailureToast("Current wallet address didn't match");
        return;
      }
      if (this.state.distributeGiftEvent.contractNetwork !== currentNetwork) {
        Utils.apiFailureToast(
          `Please switch to ${this.state.distributeGiftEvent.contractNetwork} network`
        );
        return;
      }
      await this.setState({ isLoading: true });
      const [err, buyerAddressRes] = await Utils.parseResponse(
        getBuyersAddress(ticketDetails._id)
      );

      if (buyerAddressRes) {
        if (buyerAddressRes.length > 0) {
          let randomAddresses = await this.selectRandomAddresses(
            buyerAddressRes,
            ticketDetails.gifts.totalGiftsAvailable
          );

          await this.transferGiftNFTs(
            this.state.distributeGiftEvent.abi,
            this.state.distributeGiftEvent.contractAddress,
            ticketDetails.gifts.giftNftTokenId,
            randomAddresses,
            ticketDetails._id,
            ticketDetails.gifts.giftImages,
            ticketDetails.name
          );
        } else {
          await this.setState({ isLoading: false });
          Utils.apiFailureToast("No Buyers exist for this event");
        }
      } else {
        await this.setState({ isLoading: false });
        Utils.apiFailureToast("No Buyers exist for this event");
      }
    }
  };

  transferGiftNFTs = async (
    abi,
    contractAddress,
    giftNFTTokenId,
    receiverAddressArr,
    ticketId,
    giftImages,
    ticketName
  ) => {
    let jsonAbi = JSON.parse(abi);
    let contractInstance = new window.caver.klay.Contract(
      jsonAbi,
      contractAddress
    );

    const gasPrice = await window.caver.klay.getGasPrice();

    let amountArr = [];

    receiverAddressArr.forEach((address) => {
      amountArr.push(1);
    });

    let transaction = {
      from: window.caver.currentProvider.selectedAddress,
      to: contractAddress,
      gas: 7920000,
      gasPrice: gasPrice,
      data: contractInstance.methods
        .giftSafeTransfer(giftNFTTokenId, receiverAddressArr, amountArr)
        .encodeABI(),
    };

    await window.caver.klay
      .sendTransaction(transaction)
      .on("transactionHash", function (hash) {})

      .on(
        "error",
        async function (error) {
          await this.setState({ isLoading: false });
          Utils.apiFailureToast("Gift distribution failed");
        }.bind(this)
      )

      .on(
        "receipt",
        async function (receipt) {
          await this.saveGiftNFTDetailsForReceivers(
            receiverAddressArr,
            ticketId,
            giftNFTTokenId,
            giftImages,
            ticketName
          );

          let request = {
            giftsDistributed: true,
          };

          const [err, ticketsTypeRes] = await Utils.parseResponse(
            updateTicket(request, ticketId)
          );

          if (ticketsTypeRes && !err) {
            await this.setState({
              isLoading: false,
              isSelectTicketModalOpen: false,
            });
            Utils.apiSuccessToast("Gift NFTs distributed successfully");
          }
        }.bind(this)
      );
  };

  saveGiftNFTDetailsForReceivers = async (
    receiverAddressArr,
    ticketId,
    giftNFTTokenId,
    giftImages,
    ticketName
  ) => {
    let giftDetailsArr = [];
    receiverAddressArr.forEach((address) => {
      giftDetailsArr.push({
        ticket: ticketId,
        event: this.state.distributeGiftEvent.eventId,
        creator: this.state.distributeGiftEvent.creatorEmail,
        buyerWalletAddress: address,
        giftNFTImageIPFS: giftImages[0],
        giftNFTImageS3: giftImages[1],
        nftTokenId: giftNFTTokenId,
        ticketName: ticketName,
      });
    });

    let request = {
      gifts: giftDetailsArr,
    };

    await Utils.parseResponse(addNewGifts(request));
  };

  selectRandomAddresses = async (buyerAddressRes, numberOfGifts) => {
    if (buyerAddressRes.length >= numberOfGifts) {
      let randomAddressArr = [];
      while (randomAddressArr.length < numberOfGifts) {
        let randomAddress = Math.floor(Math.random() * buyerAddressRes.length);
        if (!randomAddressArr.includes(buyerAddressRes[randomAddress])) {
          randomAddressArr.push(buyerAddressRes[randomAddress]);
        }
      }
      return randomAddressArr;
    } else {
      return buyerAddressRes;
    }
  };

  closeSelectTicketPopup = async () => {
    this.setState({ isSelectTicketModalOpen: false });
  };

  sortByName = (eventData) => {
    this.setState({ events: eventData });
  };

  render() {
    if (
      !Utility.checkPermission(
        AdminPermissions.EVENTS,
        this.props.user?.userDetails
      )
    ) {
      history.replace(Pages.USER_MANAGEMENT);
    }
    return (
      <>
        <EventComponent
          state={this.state}
          handleChange={this.handleChange}
          getListByPage={this.getListByPage}
          searchEvent={this.searchEvent}
          deleteEvent={this.deleteEvent}
          setDistributeEventDetails={this.setDistributeEventDetails}
          sortByName={this.sortByName}
        />
        <TicketSelectionModal
          isLoading={this.state.isLoading}
          open={this.state.isSelectTicketModalOpen}
          tickets={this.state.tickets}
          distributeGifts={this.distributeGifts}
          closeSelectTicketPopup={this.closeSelectTicketPopup}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(Event);
