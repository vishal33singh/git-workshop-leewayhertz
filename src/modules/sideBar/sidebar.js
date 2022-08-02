import React from "react";
import { history } from "../../managers/history";
import { NavLink } from "react-router-dom";

function sidebar() {
  return (
    <div className="min-h-screen h-full mobile:hidden tablet:hidden">
      <div className="w-64 min-h-screen h-full bg-grey-100 ">
        <div className="">
          <img
            className="mx-auto w-40 pt-9"
            alt=""
            src="./images/img-logo.png"
          />
        </div>
        <NavLink
          activeClassName="bg-white w-64 h-15 border-l-8 border-blue-25"
          to="/dash-board"
          className="flex w-full mt-25.5 justify-start items-center cursor-pointer"
        >
          <img className="w-5 ml-15" alt="" src="./images/ic-statistics.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            Dashboard
          </p>
        </NavLink>
        <NavLink
          activeClassName="bg-white w-64 h-15 border-l-8 border-blue-25"
          to="/events"
          className="flex w-full mt-10 justify-start items-center cursor-pointer"
        >
          <img className="w-5 ml-15 " alt="" src="./images/ic-events.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            events
          </p>
        </NavLink>
        <NavLink
          activeClassName="bg-white w-64 h-15 border-l-8 border-blue-25"
          to="/white-list"
          className="flex w-full mt-10 justify-start items-center cursor-pointer"
        >
          <img
            className="w-5 ml-15"
            alt=""
            src="./images/ic-usermanagement.svg"
          />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            Whitelist
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default sidebar;
