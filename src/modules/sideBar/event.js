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
    <div className="pl-4 pr-4 w-full bg-Slate-200 min-h-screen tablet:px-10 mobile:px-4  pb-16 ">
      <div className="w-full h-235 pb-3 px-5.5 tablet:w-full tablet:pb-18 pt-1.5 rounded-2xl tablet:mt-13 mobile:pb-18 mobile:w-full mobile:mt-10">
        <div className="flex w-full mt-10">
          <p className="text-ft8 font-OpenSansSemiBold mt-6 pr-4.5 text-black-50">
            WhiteList
          </p>

          <div className="w-full flex flex-row-reverse">
            <div className="w-44 h-11 text-ft3 text-black-25 bg-white ml-5">
              All Time
              <img
                className=" mt-0 w-3 h-3  cursor-pointer"
                alt=""
                src="images/down-arrow.svg"
              />
            </div>
            <div className="flex justify-center w-44 h-11 text-ft3 text-black-25 bg-white ml-5">
              Event type
              <img
                className=" mt-0 w-3 h-3  cursor-pointer"
                alt=""
                src="images/down-arrow.svg"
              />
            </div>

            <div className="text-ft5 cursor-pointer flex items-center relative bg-white font-Montserrat font-normal">
              <span
                onClick={() => setShowFeatureSelectOption((prev) => !prev)}
                className={`text-ft5 w-44 h-11 text-black-25 cursor-pointer items-center relative  font-Montserrat font-normal ${
                  showFeatureSelectOption && ""
                }`}
              >
                Event type
              </span>
              <ChevronDownIcon
                onClick={() => setShowFeatureSelectOption((prev) => !prev)}
                className={`w-5 text-white select-none cursor-pointer ml-auto transform duration-100 ${
                  showFeatureSelectOption && "-rotate-180"
                }`}
              />
              {showFeatureSelectOption && (
                <ClickOutside
                  onClickOutside={() => setShowFeatureSelectOption(false)}
                  className="absolute w-50 bg-black-25 rounded-md top-12 z-20 p-1 right-0 shadow-lg text-black-50"
                >
                  <div className="px-4 pt-3 pb-1 bg-linear-gred-blue bg-center rounded-md">
                    {spaceForTypes.map((data, index) => (
                      <div
                        key={index}
                        className="text-ft2 font-MontserratMedium pb-2 text-white cursor-pointer"
                      >
                        {data.contentName}
                      </div>
                    ))}
                  </div>
                </ClickOutside>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 w-full justify-center">
          <div className=""></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
