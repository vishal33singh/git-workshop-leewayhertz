import { DisplayConstatnts } from "../constants";

export class EventModel {
  constructor(data) {
    this.creator = {
      name: "",
      email: "",
      image: "",
    };
    this.image = "";
    this.venueLocation = {
      country: "",
      state: "",
      city: "",
      venue: "",
    };
    this.name = "";
    this.location = "";
    this.addedOn = 0;
    this.status = "";
    this.category = "";
    this.ticketSold = 0;
    this.revenue = 0;
    this.totalTicket = 0;
    this.startTime = 0;
    this.eventTimezone = "";
    this.contractAbi = "";
    this.contractAddress = "";
    this.ownerWalletAddress = "";
    this.network = "";
    if (data) {
      return this.setData(data);
    }
  }
  setData(event) {
    this.eventId = event._id ? event._id : "";
    this.image = event.image ? event.image : "";
    this.creator = event.creator ? event.creator : this.creator;
    this.venueLocation = event.venueLocation
      ? event.venueLocation
      : this.venueLocation;
    this.name = event.name ? event.name : "";
    this.location = event.location ? DisplayConstatnts[event.location] : "";
    this.addedOn = event.addedOn ? event.addedOn : "";
    this.status = event.status ? DisplayConstatnts[event.status] : "";
    this.category = event.category ? event.category : "";
    this.ticketSold = event.ticketSold ? event.ticketSold : 0;
    this.totalTicket = event.totalTicket ? event.totalTicket : 0;
    this.revenue = event.revenue ? `$${event.revenue}` : 0;
    this.eventTimezone = event.eventTimezone ? event.eventTimezone : "";
    this.startTime = event.startTime || 0;
    this.contractAbi = event.contractAbi ? event.contractAbi : "";
    this.contractAddress = event.contractAddress ? event.contractAddress : "";
    this.ownerWalletAddress = event.ownerWalletAddress ? event.ownerWalletAddress : "";
    this.network = event.network ? event.network : "";
  }
}
