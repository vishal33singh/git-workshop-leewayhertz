import React from "react";
import Jazzicon from "react-jazzicon";

function sidebar() {
  return (
    <div className="flex">
      <div className="header flex w-full h-25.5 shadow-inner bg-white ml-1">
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
