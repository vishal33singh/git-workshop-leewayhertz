export class BuyersModel {
  constructor(data) {
    this.buyer = {
      _id: "",
      name: "",
      email: "",
      image: "",
      phone: "",
    };
    this.event = {
      _id: "",
      name: "",
      image: "",
    };
    this.numberOfTickets = 0;
    this.ticket = {
      _id: "",
      type: "",
      price: "",
    };
    if (data) {
      return this.setData(data);
    }
  }
  setData(data) {
    this.buyer = data.buyer ? data.buyer : this.buyer;
    this.ticket = data.ticket ? data.ticket : this.ticket;
    this.event = data.event ? data.event : this.event;
    this.numberOfTickets = data.numberOfTickets
      ? data.numberOfTickets
      : this.numberOfTickets;
  }
}
