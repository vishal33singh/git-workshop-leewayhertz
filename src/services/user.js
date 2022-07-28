import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

function getUserServiceUrl() {
  return process.env.REACT_APP_USER_SERVICE_URL;
  // return "http://localhost:3002";
}

export async function getUserInfo(userId) {
  let url =
    getUserServiceUrl() + httpConstants.API_END_POINT.USERS + `/${userId}`;
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

export async function updateUser(request) {
  let url =
    getUserServiceUrl() +
    httpConstants.API_END_POINT.USERS +
    `/${request.userId}`;
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

export async function deleteUser(userId) {
  let url =
    getUserServiceUrl() + `${httpConstants.API_END_POINT.USERS}/${userId}`;
  return httpService(
    httpConstants.METHOD_TYPE.DELETE,
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
export async function getSubOrganisers(
  organiserId,
  skip = 0,
  limit = 0,
  searchQuery = "",
  sortingKey = ""
) {
  let url =
    getUserServiceUrl() +
    `${httpConstants.API_END_POINT.GET_SUB_ORGANISERS}?organiserId=${organiserId}&skip=${skip}&limit=${limit}&sortingKey=${sortingKey}`;
  if (searchQuery) {
    url = `${url}&searchQuery=${encodeURIComponent(searchQuery)}`;
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

export async function changePassword(request) {
  let url =
    getUserServiceUrl() +
    httpConstants.API_END_POINT.VERIFY_AND_CHANGE_PASSWORD;
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

export async function forgetPassword(request) {
  let url = getUserServiceUrl() + httpConstants.API_END_POINT.FORGOT_PASSWORD;
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

export async function signUp(request) {
  let url = getUserServiceUrl() + httpConstants.API_END_POINT.USERS;
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
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function resendEmailVerification(request) {
  let url =
    getUserServiceUrl() + httpConstants.API_END_POINT.SEND_VERIFICATION_MAIL;
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

export async function getAccessToken(userId) {
  // let url = `http://aws-blum-dev-1472606041.us-east-1.elb.amazonaws.com:3000/twilio-access-token/6274cadb6cfe90003567494f`;
  let url =
    getUserServiceUrl() +
    `${httpConstants.API_END_POINT.ACCESS_TOKEN}/${userId}`;
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

export async function checkIfVerified(request) {
  let url =
    getUserServiceUrl() + httpConstants.API_END_POINT.VERIFICATION_STATUS;
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

export async function deleteConversation(identity) {
  let url =
    getUserServiceUrl() +
    `${httpConstants.API_END_POINT.CONVERSATION}/${identity}`;

  return httpService(
    httpConstants.METHOD_TYPE.DELETE,
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

export async function getWhiteListUsers(
  userId,
  skip = 0,
  limit = 0,
  searchQuery = "",
  sortingKey = ""
) {
  let url =
    getUserServiceUrl() +
    `${httpConstants.API_END_POINT.ADMIN_USERS}/${userId}?skip=${skip}&limit=${limit}&sortingKey=${sortingKey}`;
  if (searchQuery) {
    url = `${url}&searchQuery=${encodeURIComponent(searchQuery)}`;
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

export async function addAdminUser(request) {
  let url = getUserServiceUrl() + httpConstants.API_END_POINT.ADMIN_USERS;
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
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function uploadFile(requestData) {
  let url =
    process.env.REACT_APP_FILE_UPLOADER_SERVICE_URL +
    httpConstants.API_END_POINT.UPLOAD_FILE;

  // let header = new Headers();
  // header.append("Authorization", "Bearer " + jwtToken);

  let requestOptions = {
    method: httpConstants.METHOD_TYPE.POST,
    body: requestData,
    // headers: header,
    redirect: "follow",
  };
  return new Promise((resolve, reject) => {
    fetch(url, requestOptions)
      .then(function handleResponse(response) {
        if (!response || !response.ok) reject("Unable to fetch data");

        return response.text().then((responseText) => {
          if (!responseText) reject(responseText);

          let data;
          try {
            data = JSON.parse(responseText);
            if (data && !data.success) return reject(data);
          } catch (err) {
            return Promise.reject(err);
          }
          resolve(data);
        });
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  });
}
