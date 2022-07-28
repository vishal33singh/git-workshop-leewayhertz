import { eventConstants } from "../constants";

const initialState = {
  showSidebar: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case eventConstants.SET_SIDEBAR:
      return { ...state, showSidebar: action.payload };
    default:
      return state;
  }
}
