import React, {useState} from "react";
import {CircularProgress} from "@material-ui/core";

function TicketSelectionModal({ isLoading, open, tickets, distributeGifts, closeSelectTicketPopup }) {
    const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
    const [categoryToggle, setCategoryToggle] = useState(false);
    console.log(selectedTicketIndex)

    return (
        <>
            {open ? (
                <div className="fixed inset-0 z-0  bg-darkGrey-100 bg-opacity-70 flex justify-center pt-59.75">
                    <div className="z-20 flex flex-col justify-center h-72.25 w-125 bg-white rounded-lg -mx-5 px-12">

                        <h1 className="font-OpenSansSemiBold text-ft7 text-center text-black-50">
                            {isLoading ? `Distributing NFT for ${tickets[selectedTicketIndex].name}` : "Distribute NFT"}
                        </h1>

                        {isLoading ? (
                                <div className="flex justify-center mt-8">
                                    <CircularProgress/>
                                </div>
                        ) : (
                           <>
                               {tickets.length > 0 ? (
                                   <>
                                       <p className="pt-5 font-OpenSansRegular text-ft4 text-darkGrey-100 text-left mt-4">
                                           Select ticket type
                                       </p>

                                       <div className="w-100">
                                       <select
                                           id={"category"}
                                           className={`w-full relative overflow-hidden styled-select-gift rounded-lg border border-grey-400  focus:outline-none  mt-4 pl-2.5 pr-6.25 py-3.25 font-OpenSansRegular text-ft3 ${categoryToggle ? "select-active" : "select-inactive"}`}
                                           onChange={(e) => setSelectedTicketIndex(parseInt(e.target.value))}
                                           value={selectedTicketIndex}
                                           
                                       >
                                           {tickets.map((item, index)  => (
                                               <option className="styled-option-gift"   key={index} value={index}>
                                                   {item.name}
                                               </option>
                                           ))}

                                       </select>
                                       </div>

                                       <div className="flex justify-end mt-8">
                                           <button className={`w-30 py-3 font-OpenSansSemiBold text-ft3 rounded-full bg-white border border-darkGrey-50 text-black-50 mr-2`}
                                                   onClick={() => {closeSelectTicketPopup()}}>Cancel</button>

                                           <button className={`w-30 py-3 font-OpenSansSemiBold text-ft3 text-white rounded-full bg-blue-50`}
                                                   onClick={() => {distributeGifts(tickets[selectedTicketIndex])}}>Distribute</button>
                                       </div>
                                   </>
                               ) : (
                                   <>
                                       <p className="font-OpenSansSemiBold text-ft6 text-center text-darkGrey-100 mt-8">NFT for all the tickets for this event have been distributed</p>

                                       <div className="flex justify-center mt-8">
                                           <button className={`w-30 bg-blue-50 rounded-full py-3 mr-2 text-white font-OpenSansSemiBold text-ft3 `}
                                                   onClick={() => {closeSelectTicketPopup()}}>Close</button>
                                       </div>
                                   </>
                               )}
                           </>
                        )}

                    </div>
                </div>
            ) : null}
        </>
    );
}

export default TicketSelectionModal;
