import React, { useState,useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CircularProgress from "material-ui/CircularProgress";

import {
  DisplayConstatnts,
  EventType,
  StatusOptions,
  TimeConstants,
} from "../../constants";
import Card from "../common/card";
import DropDown from "../common/dropdown";
import CommonImages from "../common/commonImages";

function DashboardScreen(props) {
  console.log("loadingTesting",props?.state?.loading)
  const { handleChange, state, getSalesByEvent, sortByName } = props;
  const colors = ["#80CEB9", "#41AAC4", "#395FF1", "#BDB69C","#717D8C" ];

  //  const [element, setElement] = useState(<CircularProgress color="#395FF1"/>);
  //   useEffect(() => {
  //   setTimeout(() => {
  //     setElement('No Record Found');
  //   }, 5000);
  // }, []);

  return (
    <div className="bg-Slate-200 p-12.5 min-h-screen">
      <div className="flex text-ft8 font-OpenSansSemiBold text-left text-black-50 justify-between items-center">
        Dashboard
        <div className="flex 3xl:gap-3.75 ml-auto justify-between">
          <DropDown
            updationKey={"type"}
            title="All Locations"
            handleChange={handleChange}
            options={EventType}
            value={state.typeTitle}
            top="top-41"
          />
          <DropDown
            updationKey={"status"}
            title="All Events"
            handleChange={handleChange}
            options={StatusOptions}
            value={DisplayConstatnts[state.status]}
            top="top-41"
            
          />
          <DropDown
            updationKey={"startTime"}
            title="All Time"
            handleChange={handleChange}
            options={TimeConstants}
            value={state.timeTitle}
            top="top-41"
          />
        </div>
      </div>
      <div className="mt-12 flex gap-7 justify-between ">
        <Card
          title={"Total Realized Revenue / Potential"}
          image="/images/ic-dashboard-revenue.png"
          value={state.revenue ? `$${state.revenue} / $${state.realizedRevenue}` : 0}
          color="text-blue-50"
          sx={{ width: "25%" }}
        />
        {/*<Card*/}
        {/*  title={"Total Attendees"}*/}
        {/*  image="/images/ic-dashboard-totalAttendees.png"*/}
        {/*  value={state.ticketSold}*/}
        {/*/>*/}
        <Card
          title={"Total Ticket sold / On Offer"}
          image="/images/ic-dashboard-ticketSold.png"
          value={`${state.ticketSold} / ${state.totalTicket}`}
        />
      </div>
      <div className=" flex 3xl:flex-row flex-col mt-12.5 justify-between gap-7">
        <div className=" 3xl:w-1/2 w-auto">
          <h1 className="font-OpenSansSemiBold text-black-50 text-ft6">
            Total Earning Breakdown
          </h1>
          <div className=" h-100.25 bg-white rounded-lg mt-10 py-10 flex justify-center pr-19.75 items-center">
            {state.loading?
               (
              <div className="noRecordFound">
                <CircularProgress color="#395FF1" />
              </div>
            )
            :
              state && state.legends?.length === 0 ?
              <p className="noRecordFound">No data found</p>
            : (
              <>
                <PieChartData chartData={state.chartData} />
                <div className="ml-10 my-auto ">
                  {state.legends.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="flex items-center mb-2.5 w-full"
                      >
                        <div
                          style={{ backgroundColor: colors[index] || "#000" }}
                          className="rounded-full w-2.5 h-2.5 mr-1"
                        ></div>
                        <h1 className="text-ft3 text-darkGrey-50 font-OpenSansRegular">
                          {item.name}
                        </h1>
                      </div>
                      <h1 className="text-ft4 text-black-50 font-OpenSansSemiBold mb-5">{`$${item.amount.toFixed(2)}`}</h1>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <SalesByEvents
          salesByEvents={state.salesByEvents}
          getSalesByEvent={getSalesByEvent}
          totalSalesByEvents={state.totalSalesByEvents}
          state={state}
          sortByName={sortByName}
        />
      </div>
    </div>
  );
}

function SalesByEvents({
  salesByEvents,
  totalSalesByEvents,
  getSalesByEvent,
  state,
  sortByName,
}) {
  const getMoreEvents = async () => {
    const element = document.getElementById("infiniteScroll");
    if (element.offsetHeight + element.scrollTop === element.scrollHeight) {
      if (salesByEvents.length < totalSalesByEvents) {
        getSalesByEvent(true, state.skip + state.limit);
      }
    }
  };
  const [isSorted, setIsSorted] = useState(false);

  const sortByNameHandler = () => {
    if (isSorted) {
      const sorted = salesByEvents.sort((a, b) =>
        b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1
      );
      sortByName(sorted);
      setIsSorted(false);
      return;
    }
    const sorted = salesByEvents.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    sortByName(sorted);
    setIsSorted(true);
  };
    // const [element, setElement] = useState(<CircularProgress color="#395FF1"/>);
  //   useEffect(() => {
  //   setTimeout(() => {
  //     setElement('No Record Found');
  //   }, 5000);
  // }, []);
  return (
    <div className="3xl:w-1/2 w-auto">
      <h1 className="font-OpenSansSemiBold text-black-50 text-ft6 ">
        Events by Date
      </h1>
      <div
        className=" h-100.25 bg-white rounded-lg mt-10  overflow-auto  "
        id="infiniteScroll"
        onScroll={getMoreEvents}
      >
        <table className="table min-w-full ">
          <thead className="border-b border-Slate-200">
            <tr  className="flex ">
              <CommonImages handleSorting={() => sortByNameHandler()}
                title="Event Name"
                classes=" w-1/3 py-5 px-5 font-OpenSansSemiBold text-ft3 text-black-50 "
              />
              <CommonImages
                title="Ticket sold / On Offer"
                classes=" w-1/3 py-5 px-5 font-OpenSansSemiBold text-ft3 text-black-50  "
              />
              <CommonImages
                title="Revenue "
                classes=" w-1/3 py-5 px-5 font-OpenSansSemiBold text-ft3 text-black-50 "
              />
              {/* <div className="w-1/3 py-5 px-5 font-OpenSansSemiBold text-ft3 text-black-50">Ticket Sold</div>
              <div className="w-1/3 py-5 px-5 font-OpenSansSemiBold text-ft3 text-black-50">Revenue</div> */}
            </tr>
          </thead>
          <tbody className=" items-center">

            {state.loading?
               (
              <div className="noRecordFound">
                <CircularProgress color="#395FF1" />
              </div>
            )
            :
            state.loading == false &&  salesByEvents?.length === 0 ? 
            <p className="noRecordFound">No data found</p>
            :
            (
              state.loading ==false && salesByEvents.map((item, index) => (
                <tr className="border-b border-Slate-200 flex" key={index}>
                  <td className=" w-1/3 py-5 px-5 text-ft3 font-OpenSansSemiBold text-black-50 truncate">
                    {item.name}
                  </td>
                  <td className=" w-1/3 py-5 px-5 text-ft3 font-OpenSansRegular text-black-50">
                    {`${item.soldTickets}/${item.totalTickets}`}
                  </td>
                  <td className=" w-1/3 py-5 px-5 text-ft3 font-OpenSansRegular text-black-50">
                    {item.revenue}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PieChartData({ chartData }) {
  const colors =  ["#80CEB9", "#41AAC4", "#395FF1", "#BDB69C","#717D8C" ];
  const getTextData = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <PieChart width={320} height={320}>
      {chartData.map((item, index) => (
        <Pie
          key={index}
          startAngle={-90}
          endAngle={270}
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={75}
          dataKey="section"
          data={chartData}
          labelLine={false}
          fill={item.color}
          label={getTextData}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % `${colors}`.length]}
            />
          ))}
        </Pie>
      ))}
    </PieChart>
  );
}

export default DashboardScreen;
