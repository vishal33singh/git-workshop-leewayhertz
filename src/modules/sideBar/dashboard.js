import React, { Component, useState } from "react";
import { history } from "../../managers/history";
import { ChevronDownIcon } from "@heroicons/react/outline";
import ClickOutside from "../../common/components/clickOutside";

const spaceForTypes = [
  {
    id: 1,
    contentName: "Venue",
  },
  {
    id: 2,
    contentName: "Online Event",
  },
];

function Dashboard() {
  const [showFeatureSelectOption, setShowFeatureSelectOption] = useState(false);
  return (
    <div className="w-full bg-Slate-200">
      <div className="w-full flex">
        <div></div>

        <div className="text-ft5 cursor-pointer flex items-center relative grey-e4e4e4 font-Montserrat font-normal">
          <span
            onClick={() => setShowFeatureSelectOption((prev) => !prev)}
            className={`text-ft5 cursor-pointer items-center relative grey-e4e4e4 font-Montserrat font-normal ${
              showFeatureSelectOption && ""
            }`}
          >
            Published
          </span>
          <ChevronDownIcon
            onClick={() => setShowFeatureSelectOption((prev) => !prev)}
            className={`w-5 text-white ml-auto select-none cursor-pointer transform duration-100 ${
              showFeatureSelectOption && "-rotate-180"
            }`}
          />
          {showFeatureSelectOption && (
            <ClickOutside
              onClickOutside={() => setShowFeatureSelectOption(false)}
              className="absolute w-50 bg-linear-gred-darkblue rounded-md top-12 z-20 p-1 right-0 shadow-lg text-white"
            >
              <div className="px-4 pt-3 pb-1 bg-linear-gred-blue bg-center rounded-md">
                {spaceForTypes.map((data, index) => (
                  <div
                    key={index}
                    // onClick={() => handleClick(data.id)}
                    // onClick={() => history.push(data.url)}
                    className="text-ft2 font-MontserratMedium pb-2 text-white cursor-pointer"
                  >
                    {data.contentName}
                  </div>
                ))}
              </div>
            </ClickOutside>
          )}
        </div>
        <div className="w-44 h-11 text-ft3 text-black-25 bg-white">
          Event type
          <img
            className=" mt-0 w-3 h-3  cursor-pointer"
            alt=""
            src="images/down-arrow.svg"
          />
        </div>
        <div className="w-44 h-11 text-ft3 text-black-25 bg-white">
          Published
          <img
            className=" mt-0 w-3 h-3  cursor-pointer"
            alt=""
            src="images/down-arrow.svg"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
