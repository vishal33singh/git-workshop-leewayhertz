import { NotificationType } from "../constants";
export class NotificationModel {
  constructor(data) {
    this.title = "";
    this.description = "";
    this.payload = {
      type: NotificationType.EVENT,
    };
    this.isRead = false;
    this.isCleared = false;
    this.id = "";
    if (data) {
      return this.setData(data);
    }
  }
  setData(notification) {
    this.title = notification.title ? notification.title : "";
    this.isRead = notification.isRead ? notification.isRead : false;
    this.isCleared = notification.isCleared ? notification.isCleared : false;
    this.description = notification.description ? notification.description : "";
    this.id = notification._id ? notification._id : "";
    this.payload = notification.payload
      ? notification.payload
      : {
          type: NotificationType.EVENT,
        };
  }
}
