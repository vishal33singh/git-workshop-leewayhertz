import React, { useState, useEffect } from "react";
// import { stringConstants, eventConstants } from "../../constants";
// import { useSelector } from "react-redux";
import mockUser from "../../mock-services/mock-game";
import utility from "../../utility";
import moment from "moment";
import { history } from "../../managers/history";
// import SideDrawer from "../common/sidebarUser";

function WhiteList() {
  const [rows, setRows] = useState([]);
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
    <div className="pl-4 pr-4 mt-8 w-full h-full tablet:grid tablet:grid-cols-1 tablet:px-10 mobile:px-4 mobile:grid mobile:grid-cols-1 pb-16 mobile:pl-0 mobile:pr-0 mobile:pb-0 tablet:pl-0 tablet:pr-0 tablet:pb-0 mobile:mt-0 tablet:mt-0">
      <div className="w-full h-235 mt-2 bg-white pb-3 px-5.5 tablet:w-full tablet:pb-18 pt-1.5 rounded-2xl tablet:mt-13 mobile:pb-18 mobile:w-full mobile:mt-10">
        <div className="flex w-full mobile:grid">
          <p className="text-ft8 font-OpenSansSemiBold mt-6 pr-4.5 text-black-50">
            WhiteList
          </p>
        </div>
        <div className="flex bg-Slate-350 rounded-3xl w-77.25 h-11.5 px-3 items-center mt-15 content-center">
          <img
            src="/images/search.svg"
            alt="search"
            className="w-3.57 h-3.57 mt-0.5"
          />
          <input
            className="h-11.5 rounded-3xl bg-transparent text-black-50 focus:outline-none w-full pb-0.5 pl-3 text-ft2"
            placeholder="Search"
          />
        </div>

        <div className="tablet:overflow-x-auto mobile:overflow-x-auto">
          <table className="w-full">
            <tr className="flex w-full gap-x-0 mt-8 justify-items-start font-PoppinsSemiBold text-ft1 text-darkGrey-50 border-solid mobile:whitespace-nowrap tablet:whitespace-nowrap">
              <th className="w-full text-left text-tHead text-ft1 tablet:ml-7">
                Name
              </th>
              <div className="w-full text-tHead text-ft1 flex tablet:ml-7">
                Email Address
              </div>
              <th className="w-full text-left text-tHead text-ft1 tablet:ml-7">
                Mobile Number
              </th>
              <th className="w-full text-left  text-tHead text-ft1 tablet:ml-7">
                Features
              </th>
              <th className="w-full text-left  text-tHead text-ft1 tablet:ml-7">
                Action
              </th>
            </tr>
            {rows
              ? rows.map((data, index) => {
                  return (
                    <tr
                      className="flex w-full gap-x-0 justify-items-start cursor-pointer font-OpenSansSemiBold text-ft4 text-black-50 py-3  mt-5 
                                      border-b-0.5 border-grey-150 border-r-0 border-l-0 border-t-0 border-solid mobile:whitespace-nowrap tablet:whitespace-nowrap"
                    >
                      <td className="w-full text-black-50 mobile:text-ft2 mobile:text-magneta-25 mobile:font-PoppinsRegular tablet:ml-7">
                        {data.name}
                      </td>
                      <td className="w-full  text-black-50 mobile:text-ft2 mobile:text-magneta-25 mobile:font-PoppinsRegular tablet:ml-7">
                        {data.email}
                      </td>
                      <td className="w-full text-black-50 mobile:text-ft2 mobile:text-magneta-25 mobile:font-PoppinsRegular tablet:ml-7">
                        {data.mobile}
                      </td>
                      <td className="w-full text-black-50 mobile:text-ft2 mobile:text-magneta-25 mobile:font-PoppinsRegular tablet:ml-7">
                        {data.features}
                      </td>
                      <td className="w-full text-black-50 mobile:text-ft2 mobile:text-magneta-25 mobile:font-PoppinsRegular tablet:ml-7">
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
  );
}
export default WhiteList;
