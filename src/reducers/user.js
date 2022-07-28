import { eventConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";
import { UserModel } from "../models/user";

let initialState = {
  isLoggedIn: false,
  deviceId: null,
  accessToken: sessionManager.getDataFromCookies(eventConstants.ACCESS_TOKEN)
    ? sessionManager.getDataFromCookies(eventConstants.ACCESS_TOKEN)
    : "",
  twilioAccessToken: sessionManager.getDataFromCookies(
    eventConstants.TWILIO_ACCESS_TOKEN
  )
    ? sessionManager.getDataFromCookies(eventConstants.TWILIO_ACCESS_TOKEN)
    : "",
  fcmToken: sessionManager.getDataFromCookies(eventConstants.FCM_TOKEN)
    ? sessionManager.getDataFromCookies(eventConstants.FCM_TOKEN)
    : "",
  userDetails: sessionManager.getDataFromCookies(eventConstants.USER_DETAILS)
    ? JSON.parse(sessionManager.getDataFromCookies(eventConstants.USER_DETAILS))
    : {},
  loading: false,
  kaikasWalletDetails: (sessionManager.getDataFromCookies(eventConstants.KAIKAS) !== "undefined")
      ? JSON.parse(sessionManager.getDataFromCookies(eventConstants.KAIKAS))
      : null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case eventConstants.LOGIN_SUCCESS:
      sessionManager.setDataInCookies(
        JSON.stringify(action.data.userDetails),
        eventConstants.USER_DETAILS
      );
      sessionManager.setDataInCookies(
        action.data.accessToken,
        eventConstants.ACCESS_TOKEN
      );
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.data.accessToken,
        userDetails: action.data.userDetails,
      };
    case eventConstants.LOGOUT:
      sessionManager.removeAllData();
      return {
        ...state,
        isLoggedIn: false,
        accessToken: "",
        userDetails: {},
      };
    case eventConstants.USER_UPDATED:
      sessionManager.setDataInCookies(
        JSON.stringify(new UserModel(action.data)),
        eventConstants.USER_DETAILS
      );
      return {
        ...state,
        userDetails: action.data,
      };
    case eventConstants.UPDATE_KAIKAS_DETAILS:
      sessionManager.setDataInCookies(JSON.stringify(action.payload), eventConstants.KAIKAS);
      return {
        ...state,
        kaikasWalletDetails: action.payload
      };
    case eventConstants.TWILIO_ACCESS_TOKEN:
      sessionManager.setDataInCookies(
        action.data,
        eventConstants.TWILIO_ACCESS_TOKEN
      );
      return {
        ...state,
        twilioAccessToken: action.data,
      };
    default:
      return state;
  }
}
