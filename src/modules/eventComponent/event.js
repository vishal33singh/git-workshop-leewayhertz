import React, { useState, useEffect } from "react";
import Sidebar from "../sideBar/sidebar";

function Events() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="pl-4 pr-4 w-full bg-grey-100 min-h-screen ml-1 tablet:px-10 mobile:px-4 ">
      <div className="hidden tablet:block mobile:block tablet:absolute mobile:absolute cursor-pointer">
        <img
          src="/images/right-scroll.svg"
          alt=""
          className="pt-5 tablet:ml-3 mobile:ml-3"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
      {isOpen && <Sidebar check={isOpen} close={() => setIsOpen(false)} />}
      <div className="flex w-full ">
        <p className="text-ft8 font-OpenSansSemiBold mt-35 pr-4.5 ml-9 text-black-50">
          Events
        </p>
      </div>
    </div>
  );
}

export default Events;
