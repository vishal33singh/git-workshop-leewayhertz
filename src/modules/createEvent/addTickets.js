import React, { useState, useEffect } from "react";
import Utils from "../../utility";
import { CreateEventConstants } from "../../constants";
import DragAndDropComponent from "./dragAndDropComponent";
import { uploadEventImage, uploadFileToIPFS } from "../../services/event";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import ct from "countries-and-timezones";
import moments from "moment";

function AddTickets(props) {
  const { addNewTicket, updateActivePage, state } = props;
  const [ticketType, setTicketType] = useState(
      state.ticketNumberToBeEdited !== null
          ? state.tickets[state.ticketNumberToBeEdited].type
          : "PAID");
  const [ticketName, setTicketName] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].name
      : ""
  );
  const [ticketDescription, setTicketDescription] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].description
      : state.description
  );
  const [ticketAvailable, setTicketAvailable] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].availableForSale
      : ""
  );
  const [saleStartDate, setSaleStartDate] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].startDate
      : 0
  );
  const [saleEndDate, setSaleEndDate] = useState(
      state.ticketNumberToBeEdited !== null
          ? state.tickets[state.ticketNumberToBeEdited].endDate
          : 0
  );
  const [saleStartTime, setSaleStartTime] = useState(state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].startTime
      : "");
  const [saleEndTime, setSaleEndTime] = useState(state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].endTime
      : "");
  const [minQuantity, setMinQuantity] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].ticketsPerOrder.minQuantity
      : ""
  );
  const [maxQuantity, setMaxQuantity] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].ticketsPerOrder.maxQuantity
      : ""
  );
  const [ticketPrice, setTicketPrice] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].price
      : ""
  );
  const [totalGifts, setTotalGifts] = useState(
    state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].gifts.totalGiftsAvailable
      : ""
  );
  const [ticketNFTImage, setTicketNFTImage] = useState(state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].images
      : []);
  const [giftNFTImage, setGiftNFTImage] = useState(state.ticketNumberToBeEdited !== null
      ? state.tickets[state.ticketNumberToBeEdited].gifts.giftImages
      : []);
  const [ticketNFTImageFile, setTicketNFTImageFile] = useState(
      state.ticketNumberToBeEdited !== null
          ? state.tickets[state.ticketNumberToBeEdited].ticketNFTImageFile
          : {}
  );
  const [giftNFTImageFile, setGiftNFTImageFile] = useState(
      state.ticketNumberToBeEdited !== null
          ? state.tickets[state.ticketNumberToBeEdited].giftNFTImageFile
          : {}
  );
  const [countTitle, setCountTitle] = useState(0);
  const [countDisc, setCountDisc] = useState(0);
  const [ticketDetailsFilled, setTicketDetailsFilled] = useState(true);
  const [isValidDate, setIsValidDate] = useState(false);
  const [paidButton, setPaidButton] = useState(
    "py-3.75 px-15 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border"
  );
  const [freeButton, setFreeButton] = useState(
    "ml-3.75  py-3.75 px-15 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border"
  );
  const [showFreeBtn, setShowFreeBtn] = useState(false);

  const uploadImageToIPFS = async (files, imageFor) => {
    const imageData = new FormData();
    const imageUrlArr = [];
    imageData.append("image", files[0]);
    let [err1, uploadImageToS3] = await Utils.parseResponse(
      uploadEventImage(imageData)
    );
    imageData.append(
      "walletAddress",
      window.caver?.currentProvider?.selectedAddress
    );
    let [err2, uploadImageRes] = await Utils.parseResponse(
      uploadFileToIPFS(imageData)
    );
    if (uploadImageRes && uploadImageToS3) {
      imageUrlArr.push(
        uploadImageRes.responseData.contentUploadResponse.ipfsUrl,
        uploadImageToS3.responseData
      );

      if(imageFor === "ticket"){
        setTicketNFTImage(imageUrlArr)
        setTicketNFTImageFile(files[0])
      }
      else{
        setGiftNFTImage(imageUrlArr);
        setGiftNFTImageFile(files[0])
      }
    } else {
      Utils.apiFailureToast("Image upload failed");
    }
  };

  const handleClick = () => {
    if (
      paidButton ===
      "py-3.75 px-15 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border"
    ) {
      setPaidButton(
        "py-3.75 px-15 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400  border"
      );
    } else {
      setPaidButton(
        "py-3.75 px-15 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border"
      );
    }

    if (
      freeButton ===
      "ml-3.75  py-3.75 px-15 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border"
    ) {
      setFreeButton(
        "ml-3.75  py-3.75 px-15 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50 border"
      );
      setShowFreeBtn(true);
      setTicketType("FREE")
    } else {
      setFreeButton(
        "ml-3.75  py-3.75 px-15 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border"
      );
      setShowFreeBtn(false);
      setTicketType("PAID")
    }
  };

  const goBackToTickets = () => {
    if (
      ticketType !== "" &&
      ticketName !== "" &&
      ticketAvailable !== "" &&
      saleStartDate !== "" &&
      saleEndDate !== "" &&
      saleStartTime !== "" &&
      saleEndTime !== "" &&
      ticketPrice !== 0 &&
      totalGifts !== "" &&
      ticketAvailable >= minQuantity &&
      ticketAvailable >= maxQuantity
    ) {
      setTicketDetailsFilled(true);
      let timeZoneDetails = ct.getTimezone(state.eventTimezone)
      const startDateTime = Utils.dateConstructer(saleStartDate, saleStartTime);
      const endDateTime = Utils.dateConstructer(saleEndDate, saleEndTime);
      if (startDateTime >= endDateTime) {
        setIsValidDate(true);
        return;
      }
      props.updateActivePage(CreateEventConstants.TICKETS);
      addNewTicket({
        type: ticketType,
        name: ticketName,
        description: ticketDescription,
        availableForSale: parseInt(ticketAvailable),
        saleStartDate: Number(new Date(saleStartDate + " " + saleStartTime + " " + (moment().tz(state.eventTimezone).isDST() ? timeZoneDetails.dstOffsetStr : timeZoneDetails.utcOffsetStr))), //saleStartDate,
        saleEndDate: Number(new Date(saleEndDate + " " + saleEndTime + " " + (moment().tz(state.eventTimezone).isDST() ? timeZoneDetails.dstOffsetStr : timeZoneDetails.utcOffsetStr))), //saleEndDate,
        ticketsPerOrder: {
          minQuantity: parseInt(minQuantity),
          maxQuantity: parseInt(maxQuantity),
        },
        startDate: saleStartDate,
        startTime: saleStartTime,
        endDate: saleEndDate,
        endTime: saleEndTime,
        ticketNftTokenId: 1,
        images: ticketNFTImage,
        gifts: {
          giftImages: giftNFTImage,
          giftNftTokenId: 11,
          totalGiftsAvailable: parseInt(totalGifts),
        },
        price: ticketType === "PAID" ? parseInt(ticketPrice) : 0,
        ticketNFTImageFile: ticketNFTImageFile,
        giftNFTImageFile: giftNFTImageFile,
      });
    } else {
      setTicketDetailsFilled(false);
    }
  };

  const CHARACTER_LIMIT = 75;
  const CHARACTER_DISC = 140;

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  useEffect(()=>{
    if(state.ticketNumberToBeEdited !== null){
      if(state.tickets[state.ticketNumberToBeEdited].type === "PAID"){
        setPaidButton("py-3.75 px-15 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border")
        setFreeButton("ml-3.75  py-3.75 px-15 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border")
      }
      else{
        setFreeButton("py-3.75 px-15 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border")
        setPaidButton("ml-3.75  py-3.75 px-15 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border")
      }
    }
  },[])

  return (
    <>
      <div className="flex">
        <div className="w-full">
          <div className=" bg-Slate-200 px-12.5 pb-18">
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
                  <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-darkGrey-50  text-white rounded-full">
                    1
                  </p>
                  <p className="ml-2.5 font-OpenSansRegular text-ft4 py-1.5 text-darkGrey-50 ">
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
            <div className="bg-white pl-12.5 pr-86.5 mt-9.5 rounded-lg pb-77">
              <div className="pt-12.5">
                <img
                  alt=""
                  src="/images/ic-back-accntsettings.svg"
                  className=""
                  onClick={() => {
                    props.updateActivePage(CreateEventConstants.TICKETS);
                  }}
                ></img>
              </div>
              <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 pt-5">
                Add Tickets
              </h1>
              <div className="flex mt-10">
                <button
                  type="button"
                  className={paidButton}
                  onClick={handleClick}
                >
                  Paid
                </button>
                <button
                  type="button"
                  className={freeButton}
                  onClick={handleClick}
                >
                  Free
                </button>
              </div>
              <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-10">
                Ticket Type
              </p>
              <input
                id={"ticketName"}
                onChange={(e) => setTicketName(e.target.value)}
                value={ticketName}
                maxLength="75"
                className="w-full rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"
              ></input>
              <p className="font-OpenSansRegular text-ft2 mt-2.5 justify-end flex text-darkGrey-50">
                {`${ticketName.length}/${CHARACTER_LIMIT}`}
              </p>
              {ticketName === "" && !ticketDetailsFilled ? (
                <p className="text-red-50">This field is mandatory</p>
              ) : (
                <></>
              )}
              {/*<p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-3.75">*/}
              {/*  Description*/}
              {/*</p>*/}
              {/*<textarea*/}
              {/*  id={"ticketDescription"}*/}
              {/*  onChange={(e) => setTicketDescription(e.target.value)}*/}
              {/*  value={ticketDescription}*/}
              {/*  maxLength="140"*/}
              {/*  rows="4"*/}
              {/*  className=" resize-none w-full rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"*/}
              {/*></textarea>*/}
              {/*<p className="font-OpenSansRegular text-ft2 mt-2.5 justify-end flex text-darkGrey-50">*/}
              {/*  {`${ticketDescription.length}/${CHARACTER_DISC}`}*/}
              {/*</p>*/}
              {/*{ticketDescription === "" && !ticketDetailsFilled ? (*/}
              {/*  <p className="text-red-50">This field is mandatory</p>*/}
              {/*) : (*/}
              {/*  <></>*/}
              {/*)}*/}

              {!showFreeBtn && (
                <>
                  <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-3.75">
                    Ticket Price (in $)
                  </p>
                  <input
                    id={"ticketPrice"}
                    onChange={(e) => setTicketPrice(parseInt(e.target.value))}
                    value={ticketPrice}
                    type="number"
                    min="0"
                    onWheel={(e)=> e.target.blur()}
                    className="w-full rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"
                  />
                  {ticketPrice === 0 && !ticketDetailsFilled ? (
                    <p className="text-red-50">This field is mandatory</p>
                  ) : (
                    <></>
                  )}
                </>
              )}
              <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-3.75">
                Available Quantity
              </p>
              <input
                id={"ticketAvailable"}
                onChange={(e) => setTicketAvailable(parseInt(e.target.value))}
                value={ticketAvailable}
                type="number"
                onWheel={(e)=> e.target.blur()}
                min="0"
                className="w-full rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"
              ></input>
              {ticketAvailable === "" && !ticketDetailsFilled ? (
                <p className="text-red-50">This field is mandatory</p>
              ) : (
                <></>
              )}

              <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-10">
                When are tickets available?
              </h1>
              <div className="flex space-x-5 mt-7.5 ">
                <div className="flex flex-col w-full">
                  <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                    Sale start
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                    <img
                      alt=""
                      src="/images/ic-calendar.svg"
                      className=""
                    ></img>
                    <input
                      id={"saleStartDate"}
                      onChange={(e) => setSaleStartDate(e.target.value)}
                      value={saleStartDate}
                      type="date"
                      // min={state.startDate}
                      className="placeholder-black-50  focus:outline-none  flex flex-row-reverse absolute bg-transparent gap-2"
                    ></input>
                  </div>
                  {saleStartDate === 0 && !ticketDetailsFilled ? (
                    <p className="text-red-50">This field is mandatory</p>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                    Sale End
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                    <img
                      alt=""
                      src="/images/ic-calendar.svg"
                      className=""
                    ></img>
                    <input
                      id={"saleEndDate"}
                      onChange={(e) => setSaleEndDate(e.target.value)}
                      type="date"
                      value={saleEndDate}
                      // min={state.startDate}
                      max={state.endDate}
                      className="placeholder-black-50  focus:outline-none  flex flex-row-reverse absolute bg-transparent gap-2"
                    ></input>
                  </div>
                  {saleEndDate === 0 && !ticketDetailsFilled ? (
                    <p className="text-red-50">This field is mandatory</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="flex space-x-5 mt-7.5 ">
                <div className="flex flex-col w-full">
                  <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                    Start Time
                  </p>
                  <div className="sd-container flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                    <input
                      id={"saleStartTime"}
                      onChange={(e) => setSaleStartTime(e.target.value)}
                      value={saleStartTime}
                      className="placeholder-black-50 w-full focus:outline-none flex flex-row-reverse"
                      type="time"
                    ></input>
                  </div>
                  {saleStartTime === 0 && !ticketDetailsFilled ? (
                    <p className="text-red-50">This field is mandatory</p>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                    End Time
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                    <input
                      id={"saleEndTime"}
                      onChange={(e) => setSaleEndTime(e.target.value)}
                      value={saleEndTime}
                      className="placeholder-black-50 w-full focus:outline-none flex flex-row-reverse"
                      type="time"

                    ></input>
                  </div>
                  {saleEndTime === 0 && !ticketDetailsFilled ? (
                    <p className="text-red-50">This field is mandatory</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {isValidDate && (
                <div className="text-red-50">
                  The selected date and time is invalid
                </div>
              )}
              <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-12.5">
                Tickets per order
              </h1>
              <div className="flex space-x-5 mt-7.5 ">
                <div className="flex flex-col w-full">
                  <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                    Minimum quantity
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                    <input
                      id={"minQuantity"}
                      onChange={(e) => setMinQuantity(parseInt(e.target.value))}
                      value={minQuantity}
                      type="number"
                      min="0"
                      onWheel={(e)=> e.target.blur()}
                      className="placeholder-black-50  focus:outline-none w-full"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                    Maximum quantity
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                    <input
                      id={"maxQuantity"}
                      onChange={(e) => setMaxQuantity(parseInt(e.target.value))}
                      value={maxQuantity}
                      type="number"
                      min="0"
                      onWheel={(e)=> e.target.blur()}
                      className="placeholder-black-50 w-full focus:outline-none"
                      placeholder=""
                    ></input>
                  </div>
                </div>
              </div>

              { (ticketAvailable < minQuantity || ticketAvailable < maxQuantity) ? (
                  <p className="text-red-100">Available Quantity should be greater than min. quantity and max. quantity</p>
              ) : (
                  <></>
              )}

               <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-12.5">
                Upload NFT
              </h1>
              <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
                Upload image for ticket NFT{" "}
              </p>
              <DragAndDropComponent
                uploadImageToIPFS={uploadImageToIPFS}
                imageFor={"ticket"}
                chosenFile={ticketNFTImageFile}
              />

              <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-12.5">
                Upload Gift
              </h1>
              <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
                Gifts will be randomly given to participants.
              </p>
              <DragAndDropComponent
                uploadImageToIPFS={uploadImageToIPFS}
                imageFor={"gift"}
                chosenFile={giftNFTImageFile}
              />

              <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-3.75">
                Total Gifts
              </p>
              <input
                id={"totalGifts"}
                onChange={(event) => setTotalGifts(event.target.value)}
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                value={totalGifts}
                type="number"
                onWheel={(e)=> e.target.blur()}
                min ="0"
                className="w-full rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"
              ></input>
              {totalGifts === "" && !ticketDetailsFilled ? (
                <p className="text-red-50">This field is mandatory</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <footer className="fixed bottom-0 left-0 flex justify-end py-5 bg-white w-screen shadow-2xl">
            <button
              className=" rounded-full py-3.75 px-12 font-OpenSansSemiBold text-ft3 mr-5 text-black-50 border border-darkGrey-50"
              onClick={() => {
                props.updateActivePage(CreateEventConstants.TICKETS);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-50 rounded-full py-3.75 px-15 text-white font-OpenSansSemiBold text-ft3 mr-12.5"
              onClick={goBackToTickets}
            >
              Save
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default AddTickets;
