import React, { useState } from "react";
import TableItems from "./TableItems";
import {CreateEventConstants} from "../../constants";
import { Link } from "react-router-dom";

function ListOfTickets(props) {
  const goToAddTicketComponent = () => {
    props.updateActivePage(CreateEventConstants.ADD_TICKET)
  }

  const editTicket = (index) => {
    props.updateTicketNumberToBeEdited(index)
    goToAddTicketComponent()
  }

  const goToSplitsComponent = () => {
    props.updateActivePage(CreateEventConstants.SPLITS)
  }

  const goBackToBasic = () => {
    props.updateActivePage(CreateEventConstants.BASIC_INFO)
  }
  const [filterItems, setFilterItems] = useState("Published");
  return (
    <>
      <div className="flex">
        <div className="w-full">
          <div className=" bg-Slate-200 px-12.5 pb-75">
            <div className="pt-12.5">
            <Link to="/dashboard/events">
              <img
                alt=""
                src="/images/ic-back-accntsettings.svg"
                className=""
              ></img>
              </Link>
            </div>
            <div className="pt-6 flex justify-between">
              <h1 className="font-OpenSansSemiBold text-ft8 text-black-50">
                Create Event
              </h1>
              <div className="flex space-x-8.75">
                <div className="flex">
                  <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-darkGrey-50 text-white rounded-full">
                    1
                  </p>
                  <p className="ml-2.5 font-OpenSansRegular text-ft4 py-1.5 text-darkGrey-50">
                    Event Details
                  </p>
                </div>
                <div className="flex">
                  <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-black-50 text-white rounded-full">
                    2
                  </p>
                  <p className="ml-2.5 font-OpenSansSemiBold text-ft4 py-1.5 text-black-50">
                    Tickets
                  </p>
                </div>
                <div className="flex">
                  <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-darkGrey-50 text-white rounded-full">
                    3
                  </p>
                  <p className="ml-2.5 font-OpenSansRegular text-ft4 py-1.5 text-darkGrey-50">
                    Publish
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white mt-9.5 rounded-lg pb-36.5 h-155.25">
              <div className="flex justify-between px-12.5">
                <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 pt-13">
                  Tickets
                </h1>
                <button
                    onClick={goToAddTicketComponent}
                    type="button"
                    className="bg-blue-50 rounded-full py-3.75 px-9 text-white font-OpenSansSemiBold text-ft3 mt-10"
                  >
                    Add Tickets
                </button>
              </div>

              <div className="mt-12.5">
                <div className=" w-full rounded-xl bg-white drop-shadow-md">

                  {props && props.state.tickets.length > 0 ?
                  <>
                    <div className=" h-19 w-full flex items-center pl-12.5 pr-12.5  font-OpenSansSemiBold text-ft3 text-black-50">
                    <div className=" flex w-full">
                      <div className="w-29.75 2xl:w-14per ">NFT</div>
                      <div className="w-29.75 2xl:w-14per ">Gift</div>
                      <div className="w-86.5 2xl:w-28per ">Ticket</div>
                      <div className="w-45.75 2xl:14per ">Quantity</div>
                      <div className="w-38 2xl:w-14per pl-4">Price</div>
                      <div className="w-10 2xl:w-14per ">Action</div>
                    </div>
                  </div>
                  {props.state.tickets.map(
                    (item, index) => (
                      <span key={index}>
                        <TableItems item={item} index={index} editTicket={editTicket} deleteTicket={props.deleteTicket}/>
                      </span>
                    )
                  )}</>:(<div className="noRecordFound">
                 No Tickets available
            </div>)}
                </div>
              </div>
            </div>
          </div>

          <footer className="fixed bottom-0 left-0 flex justify-end py-5 bg-white w-screen shadow-2xl">
              <button className=" rounded-full py-3.75 px-15 text-black-50 border border-darkGrey-50 font-OpenSansSemiBold text-ft3 mr-5" onClick={goBackToBasic}>
                Back
              </button>
              <button className={` rounded-full py-3.75 px-15 text-white font-OpenSansSemiBold text-ft3 mr-12.5 ${props.state.tickets.length > 0 ? "bg-blue-50" : "bg-Slate-350"}`}
                      disabled={props.state.tickets.length <= 0}
                      onClick={goToSplitsComponent}>
                Next
              </button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default ListOfTickets;
