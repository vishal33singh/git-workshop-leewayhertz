import React from "react";
import Jazzicon from "react-jazzicon";

function sidebar() {
  return (
    <div className="flex">
      <div className="w-64 flex flex-col h-1500 bg-grey-100">
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
      <div className="flex w-full h-25.5 shadow-inner bg-grey-100 ml-1">
        <div>
          <img
            className="ml-13 mt-10 my-0 w-5 h-4 cursor-pointer"
            alt=""
            src="/images/ic_menu.svg"
          />
        </div>
        <div className="flex ml-auto">
          <div className="mt-9 mr-3">
            <Jazzicon
              diameter={35}
              seed={Math.round(Math.random() * 10000000)}
            />
          </div>
          <p className="text-ft3 font-OpenSansSemiBold text-darkGrey-100 mt-11 mr-2">
            User name
          </p>
          <img
            className=" mt-12 w-3 h-3 mr-15 cursor-pointer"
            alt=""
            src="images/down-arrow.svg"
          />
          <img
            className="ml-auto mt-10 w-7 h-7 mr-14 cursor-pointer"
            alt=""
            src="/images/ic-notification.png"
          />
        </div>
      </div>
    </div>
  );
}

export default sidebar;
