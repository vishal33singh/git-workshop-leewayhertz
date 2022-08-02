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
          activeClassName="bg-Slate-100 w-260px h-50px"
          to="/dash-board"
          className="flex w-full mt-25.5 justify-start ml-15 "
        >
          <img className="w-5 " alt="" src="./images/ic-statistics.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            Dashboard
          </p>
        </NavLink>
        <NavLink
          activeClassName="bg-Slate-100 w-260px h-50px"
          to="/events"
          className="flex w-full mt-10 justify-start ml-15"
        >
          <img className="w-5 " alt="" src="./images/ic-events.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            events
          </p>
        </NavLink>
        <NavLink
          activeClassName="bg-Slate-100 w-260px h-50px"
          to="/white-list"
          className="flex w-full mt-10 justify-start ml-15"
        >
          <img className="w-5 " alt="" src="./images/ic-usermanagement.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            Whitelist
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default sidebar;
