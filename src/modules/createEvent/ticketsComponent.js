import React from "react";
import { Link } from "react-router-dom";
import {CreateEventConstants} from "../../constants"

function TicketsComponent(props) {

  const goToAddTicketComponent = () => {
    props.updateActivePage(CreateEventConstants.ADD_TICKET)
  }

  const goToSplitsComponent = () => {
    props.updateActivePage(CreateEventConstants.SPLITS)
  }

    const goBackToBasic = () => {
        props.updateActivePage(CreateEventConstants.BASIC_INFO)
    }

  return (
    <div className="flex">
      <div className="w-full" >

      <div className=" bg-Slate-200 px-12.5 pb-115.5">
       <Link to="/create-event"> <div className="pt-12.5">
          <img alt="" src="/images/ic-back-accntsettings.svg" className=""></img>
        </div></Link>
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
        <div className="bg-white px-12.5 mt-9.5 rounded-lg pb-57.75">
          <div className="flex justify-between">
            <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 pt-13">
              Tickets
            </h1>
              <button
                type="button"
                className="bg-blue-50 rounded-full py-3.75 px-9 text-white font-OpenSansSemiBold text-ft3 mt-10"
                onClick={goToAddTicketComponent}
              >
                Add Tickets
              </button>
          </div>
          <p className="font-OpenSansSemiBold text-ft8 text-darkGrey-50 flex justify-center pt-35">
            No Tickets available
          </p>
        </div>
      </div>

      <footer className="fixed bottom-0 flex justify-end py-5 bg-white calc-width shadow-2xl">
          <button className=" rounded-full py-3.75 px-15 text-black-50 border border-darkGrey-50 font-OpenSansSemiBold text-ft3 mr-5" onClick={goBackToBasic}>
            Back
          </button>
        <button className="bg-darkGrey-50 rounded-full py-3.75 px-15 text-white font-OpenSansSemiBold text-ft3 mr-12.5" onClick={goToSplitsComponent}>
          Next
        </button>
      </footer>
      </div>
    </div>

  );
}

export default TicketsComponent;
