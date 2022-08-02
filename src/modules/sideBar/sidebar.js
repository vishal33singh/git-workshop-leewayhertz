import React from "react";
import Jazzicon from "react-jazzicon";

function sidebar() {
  return (
    <div className="min-h-screen h-full">
      <div className="w-64 min-h-screen h-full bg-grey-100">
        <div>
          <img
            className="mx-auto mt-15 w-40"
            alt=""
            src="./images/img-logo.png"
          />
        </div>
        <div className="flex w-full mt-25.5 justify-start ml-15 ">
          <img className="w-5 " alt="" src="./images/ic-statistics.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            Dashboard
          </p>
        </div>
        <div className="flex w-full mt-10 justify-start ml-15">
          <img className="w-5 " alt="" src="./images/ic-events.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            events
          </p>
        </div>
        <div className="flex w-full mt-10 justify-start ml-15">
          <img className="w-5 " alt="" src="./images/ic-usermanagement.svg" />
          <p className="ml-5 font-OpenSansRegular text-ft3 text-black-25">
            Whitelist
          </p>
        </div>
      </div>
    </div>
  );
}

export default sidebar;
