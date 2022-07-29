import React, { useState } from "react";

const Header = () => {
  return (
    <div className="">
      <div className=" bg-Slate-200 pt-28 h-screen ">
        <div className="w-125 h-135.5 bg-white text-center  m-auto rounded-lg px-5  pb-12.5">
          <img src="/images/img-logo.png" alt="" className="mx-auto mt-15 " />
          <h1 className="text-ft7 font-OpenSansSemiBold pt-7.5">
            Login with nft ticketing
          </h1>

          <div className="bg-Slate-50 w-full mt-10 rounded-lg flex justify-between">
            <input
              type="email"
              value=""
              placeholder="Email Address"
              className=" py-5 pl-5 text-ft4 w-full rounded-lg  bg-Slate-50 placeholder-darkGrey-100 text-black-50 font-OpenSansRegular focus:outline-none"
            />
            <img alt="" src="/images/ic-clear.svg" className="pr-5" />
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
          <div className="flex justify-between flex-row pt-7.5">
            <div className=" flex">
              <input type="checkbox" className="w-5 h-5 " value="" />
              <p className="font-OpenSansRegular text-ft4 text-darkGrey-100 pl-2.5">
                Remember me
              </p>
            </div>
            <p className="font-OpenSansRegular text-ft4 text-darkGrey-100 "></p>
          </div>
          <button
            type="submit"
            className="bg-blue-50 mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold"
          >
            <div className="">Sign in</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
