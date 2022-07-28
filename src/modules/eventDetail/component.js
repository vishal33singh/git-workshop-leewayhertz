import React, {useEffect} from "react";
import { Pages } from "../../constants";
import Card from "../common/card";
import Pagination from "../common/pagination";
import { NavLink } from "react-router-dom";
const textToCapitalise = (strng) => {
  let str = strng.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function EventComponent(props) {
  const { state, getListByPage } = props;

  return (
    <div className="px-12.5 pt-12.5 bg-Slate-200 pb-12.5">
      <div>
        <NavLink to={Pages.DASHBOARD}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23.66"
            height="18.828"
            viewBox="0 0 23.66 18.828"
          >
            <path
              id="ic-back-accntsettings"
              d="M26.66,13H6.143M13,5,5,13l8,8"
              transform="translate(-4 -3.586)"
              fill="none"
              stroke="#0d0f37"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </NavLink>

        <h1 className="text-black-50 text-ft9 font-OpenSansSemiBold mt-6 ">
          {state.eventDetail?.name}
        </h1>
      </div>
      <div className="mt-10 flex justify-between gap-7">
        <Card
          title={"Revenue"}
          image="/images/ic-dashboard-revenue.png"
          value={state.revenue ? `$${state.revenue}` : 0}
          color="text-blue-50"
        />
        <Card
          title={"Tx Hash"}
          image="/images/ic-dashboard-totalAttendees.png"
          eventDetail={state.eventDetail}
          value={state.ticketSold}
        />
        <Card
          title={"Ticket Sold"}
          image="/images/ic-dashboard-ticketSold.png"
          value={state.ticketSold}
        />
      </div>
      <div className="mt-10">Contibutors</div>
      <CommonTable
        headers={["Role", "Percentage", "Revenue"]}
        data={state?.contributorRevenue}
        className="w-30per"
      />
      <div className="mt-10">Sales by Ticket Type</div>
      <CommonTable
        headers={["Ticket Type", "Price", "Ticket Sold", "Status", "End Sales"]}
        data={state?.salesByTicketType}
        className="w-20per"
      />
      <div className="mt-10">Orders</div>
      <CommonTable
        headers={["Name", "Email", "Mobile Number", "Ticket Type"]}
        data={state?.orders}
        className="w-30per"
        height="h-129.75"
      />
      <Pagination
        numberOfPages={Math.ceil(state.total / state.limit)}
        currentPage={
          state.total
            ? Math.round(state.total / state.limit) -
              Math.round((state.total - state.skip) / state.limit) +
              1
            : 0
        }
        total={state.total}
        getListByPage={getListByPage}
      />{" "}
    </div>
  );
}

function CommonTable({ headers, data, className, height }) {

  return (
    <div className="rounded-xl bg-white drop-shadow-md pb-3.75 pt-3.75 mt-7.5 w-full">
      <table className={"w-full " + height}>
        <tbody className=" rounded-xl bg-white drop-shadow-md  w-full ">
          <tr className="h-19.75 w-full pl-7.5 pr-12.5 flex justify-between items-center border-b border-grey-50 font-OpenSansRegular text-left text-ft3 text-black-50 ">
            {headers.map((item, index) => (
              <td
                className={
                  className + " font-OpenSansSemiBold text-ft3 text-black-50 "
                }
                key={index}
              >
                {item}
              </td>
            ))}
          </tr>
          {data.map((item, index) => (
            <TableItems key={index} item={item} className={className} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableItems({ item, className }) {
  return (
    <>
      <tr className="h-19.75 w-full pl-7.5 pr-12.5 flex justify-between items-center border-b border-grey-50 font-OpenSansRegular text-left text-ft3 text-black-50 ">
        {Object.keys(item).map((key, index) => (
          <td className={className} key={index}>
            {item[key] === "SOLD" || item[key] === "UNSOLD" ? textToCapitalise(item[key]) : item[key] }
          </td>
        ))}
      </tr>
    </>
  );
}

export default EventComponent;
