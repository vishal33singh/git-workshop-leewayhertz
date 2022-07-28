import React from "react";
import { Link } from "react-router-dom";
import {CreateEventConstants} from "../../constants"

function footerNextButton(props) {
    const goToTickets = () => {
        if(props.checkBasicInfo()){
            props.updateActivePage(CreateEventConstants.TICKETS);
        }
    }
  return (
    <footer className="fixed bottom-0 left-0 flex justify-end py-5 bg-white shadow-2xl w-full">
        <button className="bg-blue-50 rounded-full py-3.75 px-15 text-white font-OpenSansSemiBold text-ft3 mr-12.5" onClick={goToTickets}>
          Next
        </button>
    </footer>
  );
}

export default footerNextButton;
