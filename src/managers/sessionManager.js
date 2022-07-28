// import Cookies from "universal-cookie";

// const cookies = new Cookies();

export const sessionManager = {
  setDataInCookies,
  getDataFromCookies,
  removeDataFromCookies,
  removeAllData,
};

function setDataInCookies(data, key) {
  localStorage.setItem(key, data);
}

function getDataFromCookies(key) {
  return localStorage.getItem(key);
}

function removeDataFromCookies(key) {
  localStorage.removeItem(key);
}

function removeAllData(key) {
  localStorage.clear();
}
