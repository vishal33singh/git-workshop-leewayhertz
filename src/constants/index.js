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
};

export const eventConstants = {};

export const AdminRoles = {
  MESSAGE: "MESSAGE",
  USER_MANAGEMENT: "USER_MANAGEMENT",
  EVENTS: "EVENTS",
  DASHBOARD: "DASHBOARD",
};
