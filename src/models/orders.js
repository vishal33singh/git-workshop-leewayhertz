export class OrderModel {
  constructor(data) {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.ticketType = "";
    if (data) {
      return this.setData(data);
    }
  }

  setData(data) {
    this.name = data.buyer && data.buyer.name ? data.buyer.name : "";
    this.email = data.buyer && data.buyer.email ? data.buyer.email : "";
    this.phone = data.buyer && data.buyer.phone ? data.buyer.phone : "";
    this.ticketType = data.ticket && data.ticket.type ? data.ticket.type : "";
  }
}
