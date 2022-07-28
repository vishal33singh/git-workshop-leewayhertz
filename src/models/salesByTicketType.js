import moment from "moment";

export class SalesByTicketTypeModel {
  constructor(data) {
    this.type = "";
    this.price = "";
    this.soldTickets = "";
    this.status = "";
    this.saleEndDate = "";
    if (data) {
      this.setData(data);
    }
  }

  setData(data) {
    this.type = data.type ? data.type : "";
    this.price = data.price ? data.price : "";
    this.soldTickets = data.soldTickets
      ? `${data.soldTickets}/${data.totalTicket ? data.totalTicket : 0}`
      : "0/0";
    this.status = data.status ? data.status : "";
    this.saleEndDate = data.saleEndDate
      ? moment(data.saleEndDate).format("D/MM/YY HH:mm A")
      : "";
  }
}
