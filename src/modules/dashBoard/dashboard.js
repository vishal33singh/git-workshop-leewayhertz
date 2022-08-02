import React from "react";
import PieCharts from "./pieChart";

function Dashboard() {
  return (
    <div className="w-full min-h-screen h-full tablet:h-screen bg-grey-100 px-10 pt-10 ml-1">
      <div className="flex w-full justify-between mobile:block">
        <div className="font-OpenSansSemiBold text-ft7 mobile:mb-5">
          Dashboard
        </div>
        <div className="w-full flex justify-end">
          <div className="w-56 h-12 bg-white mr-2 rounded-md grid content-center cursor-pointer tablet:w-auto">
            <div className="flex px-4 justify-between">
              <div className="font-OpenSansRegular text-ft2">Event Type</div>
              <img
                src="/images/arrow_down.svg"
                alt="arrow"
                className="w-3 tablet:ml-3"
              />
            </div>
          </div>
          <div className="w-56 h-12 bg-white mx-2 rounded-md grid content-center cursor-pointer tablet:w-auto">
            <div className="flex px-4 justify-between">
              <div className="font-OpenSansRegular text-ft2">Published</div>
              <img
                src="/images/arrow_down.svg"
                alt="arrow"
                className="w-3 tablet:ml-3"
              />
            </div>
          </div>
          <div className="w-56 h-12 bg-white ml-2 rounded-md grid content-center cursor-pointer tablet:w-auto">
            <div className="flex px-4 justify-between">
              <div className="font-OpenSansRegular text-ft2">All Time</div>
              <img
                src="/images/arrow_down.svg"
                alt="arrow"
                className="w-3 tablet:ml-3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between mt-8 gap-x-12 mobile:block">
        <div className="bg-white h-45 w-1/3 mobile:w-full px-8 grid content-center rounded-xl">
          <div className="flex">
            <img
              className="w-20 h-20 tablet:w-15 tablet:h-15"
              alt=""
              src="/images/ic-dashboard-revenue.png"
            />
            <div className="pl-5 2xl:pl-10 tablet:pl-5 grid content-center">
              <div className="font-OpenSansRegular text-ft7 tablet:text-ft4">
                Revenue
              </div>
              <div className="font-OpenSansSemiBold text-ft7 tablet:text-ft4 text-blue-25">
                $400,642
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-45 w-1/3 mobile:w-full px-8 grid content-center rounded-xl mobile:my-5 tablet:px-0 tablet:pl-8">
          <div className="flex">
            <img
              className="w-20 h-20 tablet:w-15 tablet:h-15"
              alt=""
              src="/images/ic-dashboard-revenue.png"
            />
            <div className="pl-5 2xl:pl-10 tablet:pl-5 grid content-center">
              <div className="font-OpenSansRegular text-ft7 tablet:text-ft4 ">
                Total Attendees
              </div>
              <div className="font-OpenSansSemiBold text-ft7 tablet:text-ft4 text-blue-25">
                4,000
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-45 w-1/3 mobile:w-full px-8 grid content-center rounded-xl">
          <div className="flex">
            <img
              className="w-20 h-20 tablet:w-15 tablet:h-15"
              alt=""
              src="/images/ic-dashboard-ticketSold.png"
            />
            <div className="pl-5 2xl:pl-10 tablet:pl-5 grid content-center">
              <div className="font-OpenSansRegular text-ft7 tablet:text-ft4">
                Ticket Sold
              </div>
              <div className="font-OpenSansSemiBold text-ft7 tablet:text-ft4 text-blue-25">
                4,023
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full mt-12 gap-x-10">
          <div className="w-1/2 font-OpenSansSemiBold text-ft6.5 mobile:whitespace-nowrap">
            Splits per contributors
          </div>
          <div className="w-1/2 font-OpenSansSemiBold text-ft6.5 mobile:hidden">
            Sales by event
          </div>
        </div>
        <div className="flex justify-between w-full mt-12 gap-x-10 mobile:block mobile:mt-4">
          <div className="w-full mobile:overflow-auto">
            <div className="bg-white w-full h-96 grid content-center pl-2.25% rounded-xl tablet:pl-0 tablet:w-full mobile:pl-0 mobile:w-125">
              <div className="flex w-full">
                <PieCharts />
                <div className="grid grid-cols-1 h-36 mobile:grid mobile:grid-cols-2 mobile:h-24 mobile:mt-3 mobile:px-0.5 pl-6 tablet:pl-2 mobile:pl-4 mobile:pt-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-blue-25 mt-1.5 rounded-full mr-1.5"></div>
                    <div>
                      <div className="text-ft0 font-OpenSansRegular text-grey-95 mobile:mr-5">
                        Organiser
                      </div>
                      <div className=" font-OpenSansSemiBold text-ft6 py-2.25%">
                        $200,321
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-darkGrey-50 mt-1.5 rounded-full mr-1.5"></div>
                    <div>
                      <div className="text-ft0 font-OpenSansRegular text-grey-95 mobile:mr-5">
                        Artist
                      </div>
                      <div className=" font-OpenSansSemiBold text-ft6 py-2.25%">
                        $120,192
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-50 mt-1.5 rounded-full mr-1.5"></div>
                    <div>
                      <div className="text-ft0 font-OpenSansRegular text-grey-95 mobile:mr-5">
                        Promoter
                      </div>
                      <div className=" font-OpenSansSemiBold text-ft6 pt-2.25%">
                        $80,092
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mobile:overflow-auto w-full tablet:overflow-auto">
            <div className="bg-white w-full h-96 p-8 rounded-xl tablet:overflow-auto mobile:w-135 mobile:mt-8">
              <div className="tablet:w-125">
                <table className="w-full pt-8">
                  <thead className="w-full font-OpenSansSemiBold text-ft6 border-b-2 h-12 border-grey-10 tablet:text-ft4">
                    <tr className="grid grid-cols-3 gap-x-3 justify-items-start">
                      <th className="flex tablet:whitespace-nowrap">
                        <div>Event Name</div>
                        <img
                          src="/images/arrow_down.svg"
                          alt="icon"
                          className="w-3 ml-2"
                        />
                      </th>
                      <th className="flex tablet:whitespace-nowrap">
                        <div>Ticket Sold</div>
                        <img
                          src="/images/arrow_down.svg"
                          alt="icon"
                          className="w-3 ml-2"
                        />
                      </th>
                      <th className="flex tablet:whitespace-nowrap">
                        <div>Revenue</div>
                        <img
                          src="/images/arrow_down.svg"
                          alt="icon"
                          className="w-3 ml-2"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" text-black-50">
                    <tr className="grid grid-cols-3 content-center gap-x-3 justify-items-start font-OpenSansRegular text-ft5 border-b-2 border-grey-10 h-15">
                      <td className="">Hard Summer </td>
                      <td className="">250/500</td>
                      <td className="">$450,111</td>
                    </tr>
                    <tr className="grid grid-cols-3 content-center gap-x-0 justify-items-start font-OpenSansRegular text-ft5 border-b-2 border-grey-10 h-15">
                      <td className="">Music Festival</td>
                      <td className="">250/500</td>
                      <td className="">$450,111</td>
                    </tr>
                    <tr className="grid grid-cols-3 content-center gap-x-0 justify-items-start font-OpenSansRegular text-ft5 border-b-2 border-grey-10 h-15">
                      <td className="">Music Festival</td>
                      <td className="">250/500</td>
                      <td className="">$450,111</td>
                    </tr>
                    <tr className="grid grid-cols-3 content-center gap-x-0 justify-items-start font-OpenSansRegular text-ft5 border-b-2 border-grey-10 h-15">
                      <td className="">Music Festival</td>
                      <td className="">250/500</td>
                      <td className="">$120,192</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
