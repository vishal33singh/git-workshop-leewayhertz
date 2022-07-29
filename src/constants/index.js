/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

import moment from "moment";

export const httpConstants = {
  METHOD_TYPE: {
    POST: "POST",
    PUT: "PUT",
    GET: "GET",
    DELETE: "DELETE",
  },
  CONTENT_TYPE: {
    APPLICATION_JSON: "application/json",
    MULTIPART_FORM_DATA: "multipart/form-data",
    APPLICATION_FORM_URLENCODED: "application/x-www-form-urlencoded",
    IMAGE_PNG: "image/png",
  },
  DEVICE_TYPE: {
    WEB: "web",
  },
  API_END_POINT: {
    EVENTS: "/events",
    BUYERS: "/buyers",
    GET_TICKET_ANALYTICS: "/get-ticket-analytics",
    EVENT_REVENUE_DATA: "/event-revenue-data",
    CONTRIBUTORS_REVENUE_DATA: "/contibutors-revenue",
    GET_SALES_BY_TICKET_TYPE: "/sales-by-ticket-type",
    GET_SALES_BY_CONTIBUTORS_ANALYTICS: "/get-sales-by-contributors",
    GET_SALES_BY_EVENTS: "/get-sales-by-events",
    USERS: "/users",
    ORDERS: "/orders",
    ADMIN_USERS: "/admin-users",
    BLOCK_USER: "/block-user",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFICATION_STATUS: "/verification-status",
    CONVERSATION: "/conversation",
    SEND_VERIFICATION_MAIL: "/send-verify-email",
    ACCESS_TOKEN: "/access-token",
    VERIFY_AND_CHANGE_PASSWORD: "/verify-and-reset-password",
    UPLOAD_FILE: "/upload-file",
    GET_UNREAD_NOTIFICATIONS: "/list-of-unread-notifications",
    GET_READ_NOTIFICATIONS: "/list-of-read-notifications",
    GET_NOTIFICATIONS_LIST: "/list-of-notifications",
    MARK_NOTIFICATION_READ: "/mark-notification-read",
    UPDATE_EVENT: "/update-event",
    UPLOAD_EVENT_IMAGE: "/upload-to-s3",
    UPLOAD_TO_IPFS: "/upload-to-ipfs",
    DELETE_EVENT: "/events",
    CATEGORIES: "/categories",
    GET_TICKET_TYPES: "/ticket-types",
    GET_BUYER_WALLET_ADDRESS: "/orders/wallet",
    UPDATE_TICKET: "/ticket",
    GIFTS: "/gifts",
    GET_SUB_ORGANISERS: "/sub-organisers",
  },
};

export const AdminPermissions = {
  MESSAGE: "MESSAGE",
  USER_MANAGEMENT: "USER_MANAGEMENT",
  EVENTS: "EVENTS",
  DASHBOARD: "DASHBOARD",
};

export const eventConstants = {
  SET_SIDEBAR: "SET_SIDEBAR",
  KAIKAS: "KAIKAS",
  SHOW_LOADER: "SHOW_LOADER",
  HIDE_LOADER: "HIDE_LOADER",
  PASSWORD_UPDATED: "PASSWORD_UPDATED",
  USER_UPDATED: "USER_UPDATED",
  USER_ADDED: "USER_ADDED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  USER_DETAILS: "USER_DETAILS",
  LOGOUT: "LOGOUT",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  TWILIO_ACCESS_TOKEN: "TWILIO_ACCESS_TOKEN",
  FCM_TOKEN: "FCM_TOKEN",
  UPDATE_KAIKAS_DETAILS: "UPDATE_KAIKAS_DETAILS",
  REMEMBER_ME: "REMEMBER_ME",
};

export const genericConstants = {
  ORGANIZATION: "organization",
  USER: "user",
  SELECTED_USER: "selectedUser",
  SELECTED_SUB_ORGANISER: "selectedSubOrganiser",
  STATE: "state",
  ORGANIZATION_IMAGE: "organizationImage",
  USER_IMAGE: "userImage",
};

export const StatusConstatnts = {
  PAST: "PAST",
  OFFLINE: "OFFLINE",
  VENUE: "VENUE",
  ONLINE: "ONLINE",
  PUBLISHED: "PUBLISHED",
  UPCOMING: "UPCOMING",
  DEPLOYED: "DEPLOYED",
};

export const CookieConstants = {
  KAIKAS: "kaikasDetails",
};

export const DisplayConstatnts = {
  PAST: "Previous",
  PUBLISHED: "Current",
  UPCOMING: "Upcoming",
  OFFLINE: "Offline",
  ONLINE: "Online",
};

export const RoleConstant = {
  ORGANISER: "ORGANISER",
  SUB_ORGANISER: "SUB_ORGANISER",
  PUBLISHED: "PUBLISHED",
  UPCOMING: "UPCOMING",
  SUPER_ADMIN: "SUPER_ADMIN",
};

export const Pages = {
  DASHBOARD: "/dashboard/analytics",
  EVENT_DETAIL: "/dashboard/event-details",
  EVENTS: "/dashboard/events",
  CREATE_EVENTS: "/dashboard/create-event",
  WHITELIST: "/dashboard/whitelist",
  ACCOUNT_SETTING: "/dashboard/account-setting",
  USER_MANAGEMENT: "/dashboard/user-management",
  CREATE_EVENT: "/dashboard/create-event",
  MESSAGE: "/dashboard/messages",
  TICKETS: "/tickets",
  UPDATE_PASSWORD: "/update-password",
};

export const TimeConstants = [
  {
    name: "All Time",
    value: moment().subtract(100, "years").valueOf(),
  },
  {
    name: "Last 3 months",
    value: moment().subtract(3, "months").valueOf(),
  },
  {
    name: "Last 6 months",
    value: moment().subtract(6, "months").valueOf(),
  },
  {
    name: "Last 1 year",
    value: moment().subtract(1, "year").valueOf(),
  },
];

export const EventType = [
  { name: "All Locations", value: "" },
  { name: "Physical Events", value: StatusConstatnts.VENUE },
  { name: "Online Events", value: StatusConstatnts.ONLINE },
];

export const StatusOptions = [
  { name: "All Events", value: "" },
  { name: "Current", value: StatusConstatnts.PUBLISHED },
  { name: "Upcoming", value: StatusConstatnts.UPCOMING },
  { name: "Previous", value: StatusConstatnts.PAST },
];

export const NotificationType = {
  ALL: "ALL",
  EVENT: "EVENT",
  READ: "READ",
  UNREAD: "UNREAD",
};

export const CreateEventConstants = {
  BASIC_INFO: "BASIC_INFO",
  TICKETS: "TICKETS",
  ADD_TICKET: "ADD_TICKETS",
  SPLITS: "SPLITS",
};
export const validationsMessages = {
  MAIL_NOT_SENT: "Mail not sent",
  RESET_MAIL: "Reset Mail has been sent to you",
};

export const AdminRoles = {
  MESSAGE: "MESSAGE",
  USER_MANAGEMENT: "USER_MANAGEMENT",
  EVENTS: "EVENTS",
  DASHBOARD: "DASHBOARD",
};
export const cookiesConstants = {
  IS_LOGGED_IN: "isLoggedIn",
  ACCOUNT: "accout",
  PROFILE_DETAILS: "profileDetails",
};
