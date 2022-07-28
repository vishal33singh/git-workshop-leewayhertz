import { httpService } from "../utility/httpService";
import { eventConstants, httpConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "Access-Control-Allow-Origin": "*",
    authorization: `Bearer ${sessionManager.getDataFromCookies(
      eventConstants.ACCESS_TOKEN
    )}`,
  };
}

export async function getUnreadNotifications(
  userId,
  currentPage = 0,
  currentSize = 0
) {
  let url =
    process.env.REACT_APP_NOTIFICATION_SERVICE_URL +
    `${httpConstants.API_END_POINT.GET_UNREAD_NOTIFICATIONS}/${userId}?currentPage=${currentPage}&currentSize=${currentSize}`;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function getAllNotifications(
  userId,
  currentPage = 0,
  currentSize = 0
) {
  let url =
    process.env.REACT_APP_NOTIFICATION_SERVICE_URL +
    `${httpConstants.API_END_POINT.GET_NOTIFICATIONS_LIST}/${userId}?currentPage=${currentPage}&currentSize=${currentSize}`;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function markNotificationRead(requestData) {
  let url =
    process.env.REACT_APP_NOTIFICATION_SERVICE_URL +
    httpConstants.API_END_POINT.MARK_NOTIFICATION_READ;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    getHeaders(),
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function clearNotifications(requestData) {
  let url =
    process.env.REACT_APP_NOTIFICATION_SERVICE_URL +
    httpConstants.API_END_POINT.CLEAR_NOTIFICATION;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    getHeaders(),
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
