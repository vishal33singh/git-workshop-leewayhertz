import React, { useState, useEffect } from "react";
import mockUser from "../../mock-services/mock-game";
import utility from "../../utility";
import Sidebar from "../sideBar/sidebar";
import { history } from "../../managers/history";

function WhiteList() {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const getTransactions = async () => {
    const [error, response] = await utility.parseResponse(
      mockUser.getTransactions()
    );
    if (error) return;
    if (response) setRows(response.responseData);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <div className="hidden tablet:block mobile:block tablet:absolute mobile:absolute cursor-pointer">
        <img
          src="/images/right-scroll.svg"
          alt=""
          className="pt-5 tablet:ml-3 mobile:ml-3"
          // onClick={() => {
          //   setIsOpen(true);
          // }}
        />
      </div>
      {isOpen && <Sidebar check={isOpen} close={() => setIsOpen(false)} />}
      <div className="pl-4 pr-4 w-full bg-grey-100 ml-1 min-h-screen tablet:grid tablet:grid-cols-1 tablet:px-10 mobile:px-4 mobile:grid mobile:grid-cols-1 pb-16 mobile:pl-0 mobile:pr-0 mobile:pb-0 tablet:pl-0 tablet:pr-0 tablet:pb-0 mobile:mt-0 tablet:mt-0">
        <div className="w-full h-235 pb-3 px-5.5 tablet:w-full tablet:pb-18 pt-1.5 rounded-2xl tablet:mt-13 mobile:pb-18 mobile:w-full mobile:mt-10">
          <div className="flex w-full mobile:grid">
            <p className="text-ft8 font-OpenSansSemiBold mt-6 pr-4.5 text-black-50">
              WhiteList
            </p>
          </div>
          <div className="w-full flex pr-15 mt-10 mobile:mt-3 tablet:mt-5">
            <div className="flex bg-white rounded-3xl w-77.25 mobile:w-32 tablet:w-52 h-11.5 px-3 items-center mt-15 content-center">
              <img
                src="/images/search.svg"
                alt="search"
                className="w-3.57 h-3.57 mt-0.5"
              />
              <input
                className="h-11.5 rounded-3xl bg-transparent text-black-50 focus:outline-none w-full mobile:w-32 tablet:w-45 pb-0.5 pl-3 text-ft2"
                placeholder="Search"
              />
            </div>
            <div className="flex ml-auto bg-Slate-350 rounded-3xl w-36 h-12 bg-blue-25 px-3 pl-7 items-center mt-15 content-center">
              {" "}
              + Add User
            </div>
          </div>

          <div className="overflow-x-auto relative bg-white px-5 mt-8 rounded-xl mobile:hidden tablet:hidden">
            <table className="w-full mt-9 ">
              <tr className="w-full gap-x-0 mt-8 px-2 justify-items-start font-PoppinsSemiBold text-ft1 text-darkGrey-50 border-solid">
                <th className=" text-left text-tHead text-ft1">Name</th>
                <th className="text-left text-tHead text-ft1">Email Address</th>
                <th className=" text-left text-tHead text-ft1">
                  Mobile Number
                </th>
                <th className="text-left text-tHead text-ft1"> Features</th>
                <th className=" text-left text-tHead text-ft1">Action</th>
              </tr>
              {rows
                ? rows.map((data, index) => {
                    return (
                      <tr
                        className="w-full gap-x-0 justify-items-start cursor-pointer font-PoppinsMedium text-ft4 text-black-50 py-4 px-2 ml-5 mr-5
                                      border-b-0.5 border-dropDownBorder-25 border-r-0 border-l-0 border-t-0 border-solid placeholder-black-50"
                      >
                        <td className="text-start py-4 text-black-50 whitespace-nowrap">
                          {data.name}
                        </td>
                        <td className="text-start py-4 text-black-50">
                          {data.email}
                        </td>
                        <td className="text-start py-4 text-black-50">
                          {data.mobile}
                        </td>
                        <td className="text-start py-4 text-black-50">
                          {data.features}
                        </td>
                        <td className="text-start py-4 text-black-50">
                          {data.action}
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </table>
          </div>
          <div className="hidden mobile:block tablet:block">
            <div className="mobile:px-4 tablet:px-7 tablet:overflow-x-auto bg-white px-5 mt-8 rounded-xl">
              <div className="tablet:overflow-x-auto mobile:overflow-x-auto">
                <table className="w-full mt-9">
                  <tr className="w-full gap-x-0 mt-8 px-2 justify-items-start font-PoppinsSemiBold text-ft1 text-darkGrey-50 border-solid mobile:whitespace-nowrap tablet:whitespace-nowrap">
                    <th className="text-left text-tHead mobile:pl-1">Name</th>
                    <th className="text-left text-tHead mobile:pl-4 tablet:pl-12">
                      Email
                    </th>
                    <th className="text-left text-tHead mobile:pl-4 tablet:pl-12">
                      Mobile
                    </th>
                    <th className="text-left text-tHead mobile:pl-4 tablet:pl-12">
                      Features
                    </th>
                    <th className="text-left text-tHead mobile:pl-4 tablet:pl-12">
                      Action
                    </th>
                  </tr>
                  {rows
                    ? rows.map((data, index) => {
                        return (
                          <tr
                            className="w-full gap-x-0 justify-items-start cursor-pointer font-PoppinsMedium text-ft4 text-black-50 py-3 px-2 mt-5 ml-5 mr-5 
                                         border-b-0.5 border-dropDownBorder-25 border-r-0 border-l-0 border-t-0 border-solid mobile:text-ft2 mobile:font-PoppinsRegular 
                                         mobile:whitespace-nowrap tablet:whitespace-nowrap"
                          >
                            <td className="text-start py-5 mobile:pl-1 ">
                              {data.name}
                            </td>
                            <td className="text-start py-5 mobile:pl-4 tablet:pl-12">
                              {data.email}
                            </td>
                            <td className="text-start py-5 mobile:pl-4 tablet:pl-12">
                              {data.mobile}
                            </td>
                            <td className="text-start py-5 mobile:pl-4 tablet:pl-12">
                              {data.features}
                            </td>
                            <td className="text-start py-5 mobile:pl-4 tablet:pl-12">
                              {data.action}
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhiteList;
