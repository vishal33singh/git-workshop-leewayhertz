import { httpConstants } from "../constants";

export const httpService = (method, headers, data, url) => {
  const requestOptions = {
    method: method,
    headers: headers || { "Content-Type": "application/json" },
  };

  if (method !== httpConstants.METHOD_TYPE.GET)
    requestOptions.body = JSON.stringify(data);

  return fetch(url, requestOptions)
    .then(function handleResponse(response) {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!data.success) {
          const error =
            data.responseCode === 404
              ? data
              : (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        return data;
      });
    })
    .catch(function (err) {
      return err;
    });
};
