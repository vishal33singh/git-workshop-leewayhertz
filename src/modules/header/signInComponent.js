import React, { useState } from "react";
import { history } from "../../managers/history";
import sidebar from "../sideBar/sidebar";

const Header = () => {
  return (
    <div className="">
      <div className=" bg-Slate-200 pt-28 h-screen ">
        <div className="w-125 h-135.5 bg-white text-center m-auto rounded-lg px-5">
          <div className="w-full flex flex-col justify-center ">
            <h1 className="text-ft7 font-OpenSansSemiBold mt-7.75 text-white">
              Login with nft ticketing
            </h1>
            <img
              src="/images/img-logo.png"
              alt=""
              className="px-5 w-44 m-auto"
            />
            <h1 className="text-ft7 font-OpenSansSemiBold mt-7.75 text-black-25">
              Login with nft ticketing
            </h1>
          </div>
          <div className="bg-Slate-50 w-full mt-10 rounded-lg flex justify-between">
            <input
              type="email"
              value=""
              placeholder="Email Address"
              className=" py-5 pl-5 text-ft4 w-full rounded-lg  bg-Slate-50 placeholder-darkGrey-100 text-black-50 font-OpenSansRegular focus:outline-none"
            />
            <img alt="" src="" className="pr-5" />
          </div>
          <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between items-center">
            <input
              type=""
              value=""
              placeholder="Password"
              className="bg-Slate-50 w-full rounded-lg py-5 text-ft4  pl-5 placeholder-darkGrey-100  text-black-50 font-OpenSansRegular focus:outline-none"
            />

            <img alt="" src="" className={`pr-5  w-11.25 h-6.5 `} />
          </div>
          <div className="flex justify-between flex-row pt-7.5 mt-8">
            <div className=" flex">
              <input type="checkbox" className="w-5 h-5 " value="" />
              <p className="font-OpenSansRegular text-ft4 text-darkGrey-100 pl-2.5 ">
                Remember me
              </p>
            </div>
            <p className="font-OpenSansRegular text-ft4 text-darkGrey-100 "></p>
          </div>
          <button
            // onClick={history.push("")}
            type="submit"
            className="bg-darkGrey-25 py-6 text-ft4 mt-13 text-white w-full rounded-full font-OpenSansSemiBold"
          >
            <div className="">Sign in</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
