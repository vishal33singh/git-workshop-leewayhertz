import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import axios from "axios";

export async function getEvents(
  searchQuery = "",
  type = "",
  startTime = 0,
  endTime = 0,
  skip,
  limit,
  status,
  sortingKey = "",
  creatorId
) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    httpConstants.API_END_POINT.EVENTS +
    `?isAdmin=true&searchQuery=${searchQuery}&sortingKey=${sortingKey}&creatorId=${creatorId}`;
  if (!isNaN(Number(skip))) {
    url = `${url}&skip=${skip}&limit=${limit}`;
  }
  if (status) {
    url = `${url}&status=${status}`;
  }
  if (type) {
    url = `${url}&type=${type}`;
  }
  if (startTime && endTime) {
    url = `${url}&startTime=${startTime}&endTime=${endTime}`;
  }
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getBuyersList(
  userId,
  searchQuery = "",
  skip = 0,
  limit = 0,
  sortingKey = ""
) {
  let url =
    process.env.REACT_APP_ORDER_SERVICE_URL +
    // "http://localhost:3001" +
    httpConstants.API_END_POINT.BUYERS +
    `/${userId}?searchQuery=${searchQuery}&sortingKey=${sortingKey}&skip=${skip}&limit=${limit}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getTicketAnalytics(request) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    httpConstants.API_END_POINT.GET_TICKET_ANALYTICS;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    request,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getTicketAnalyticsForEvent(event) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    `${httpConstants.API_END_POINT.EVENT_REVENUE_DATA}/${event}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getContributorRevenue(event) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    `${httpConstants.API_END_POINT.CONTRIBUTORS_REVENUE_DATA}/${event}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getSalesByTicketType(event) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    `${httpConstants.API_END_POINT.GET_SALES_BY_TICKET_TYPE}/${event}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getOrdersForAEvent(event) {
  let url =
    process.env.REACT_APP_ORDER_SERVICE_URL +
    `${httpConstants.API_END_POINT.ORDERS}/${event}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getEventDetail(event) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    `${httpConstants.API_END_POINT.EVENTS}/${event}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getContibutorsAmount(request) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    httpConstants.API_END_POINT.GET_SALES_BY_CONTIBUTORS_ANALYTICS;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    request,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function blockUser(request) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    httpConstants.API_END_POINT.BLOCK_USER;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    request,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getSalesByEvent(request) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    httpConstants.API_END_POINT.GET_SALES_BY_EVENTS;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    request,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function createEvent(request) {
  let url =
    process.env.REACT_APP_EVENT_SERVICE_URL +
    httpConstants.API_END_POINT.EVENTS;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    request,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function updateEvent(request){
    let url =
        process.env.REACT_APP_EVENT_SERVICE_URL +
        httpConstants.API_END_POINT.UPDATE_EVENT;
    return httpService(
        httpConstants.METHOD_TYPE.PUT,
        { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
        request,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}

export async function uploadEventImage(request){
    let uploadResponse;
    let url =
        process.env.REACT_APP_EVENT_SERVICE_URL +
        httpConstants.API_END_POINT.UPLOAD_EVENT_IMAGE;

    await axios
        .post(url, request)
        .then((response) => {
            if (
                !response.data.success ||
                response.data.responseCode !== 200 ||
                !response.data.responseData ||
                response.data.responseData.length === 0
            )
                uploadResponse = response.data;
            uploadResponse = response.data;
        })
        .catch(function (err) {
            return Promise.reject(err);
        });

    return uploadResponse;
}


export async function uploadFileToIPFS(request){
    let uploadResponse;
    let url =
        process.env.REACT_APP_EVENT_SERVICE_URL +
        httpConstants.API_END_POINT.UPLOAD_TO_IPFS;

    await axios
        .post(url, request)
        .then((response) => {
            if (
                !response.data.success ||
                response.data.responseCode !== 200 ||
                !response.data.responseData ||
                response.data.responseData.length === 0
            )
                uploadResponse = response.data;
            uploadResponse = response.data;
        })
        .catch(function (err) {
            return Promise.reject(err);
        });

    return uploadResponse;
}

export async function deleteEvent(eventId){
    let url =
        process.env.REACT_APP_EVENT_SERVICE_URL +
        `${httpConstants.API_END_POINT.DELETE_EVENT}/${eventId}`;

    return httpService(
        httpConstants.METHOD_TYPE.DELETE,
        { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {},
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}

export async function getCategories() {
    let url =
        process.env.REACT_APP_EVENT_SERVICE_URL +
        httpConstants.API_END_POINT.CATEGORIES;
    return httpService(
        httpConstants.METHOD_TYPE.GET,
        { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
        {},
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}

export async function getTicketTypes(eventId){
    let url =
        process.env.REACT_APP_EVENT_SERVICE_URL +
        `${httpConstants.API_END_POINT.GET_TICKET_TYPES}/${eventId}`;

    return httpService(
        httpConstants.METHOD_TYPE.GET,
        { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {},
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}


export async function getBuyersAddress(ticketId){
    let url =
        process.env.REACT_APP_ORDER_SERVICE_URL +
        `${httpConstants.API_END_POINT.GET_BUYER_WALLET_ADDRESS}/${ticketId}`;

    return httpService(
        httpConstants.METHOD_TYPE.GET,
        { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {},
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}

export async function updateTicket(request, ticketId){
    let url =
        process.env.REACT_APP_EVENT_SERVICE_URL +
        `${httpConstants.API_END_POINT.UPDATE_TICKET}/${ticketId}`
    return httpService(
        httpConstants.METHOD_TYPE.PUT,
        { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
        request,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}

export async function addNewGifts(request) {
    let url =
        process.env.REACT_APP_ORDER_SERVICE_URL +
        httpConstants.API_END_POINT.GIFTS;
    return httpService(
        httpConstants.METHOD_TYPE.POST,
        { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
        request,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}
