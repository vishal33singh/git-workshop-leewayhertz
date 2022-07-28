import {combineReducers} from "redux";
import user from "./user";
import sidebarReducer from "./sidebarReducer"

export default combineReducers({
    user,
    sideBar: sidebarReducer,
});