import React, { useState, useRef, useEffect } from "react";
import Pagination from "../common/pagination";
import { Pages, StatusConstatnts } from "../../constants";
import { SearchInput } from "../common/search";
import moment from "moment";
import { history } from "../../managers/history";
import CommonImages from "../common/commonImages";
import Utils from "../../utility";
import CircularProgress from "material-ui/CircularProgress";
function EventComponent(props) {
  const {
    state,
    handleChange,
    getListByPage,
    searchEvent,
    deleteEvent,
    setDistributeEventDetails,
    sortByName,
  } = props;
  // const isWalletConnected = useSelector(state => state.user.kaikasWalletDetails !== null )
  const [isSorted, setIsSorted] = useState(false);
  const handleCreateEvent = () => {
    if (window.caver?.currentProvider?.selectedAddress) {
      history.push(Pages.CREATE_EVENT);
      return;
    }
    Utils.apiFailureToast("Please Connect to Kaikas Wallet");
  };

  const sortByNameHandler = () => {
    if (isSorted) {
      const sorted = state.events.sort((a, b) =>
        b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1
      );
      sortByName(sorted);
      setIsSorted(false);
      return;
    }
    const sorted = state.events.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    sortByName(sorted);
    setIsSorted(true);
  };

   const [element, setElement] = useState(<CircularProgress className="ring-blue-50"/>);
    useEffect(() => {
    setTimeout(() => {
      setElement('No Record Found');
    }, 5000);

  }, []);

  return (
    <div className="bg-Slate-200 p-12.5 flex flex-col min-h-screen">
      <div className="text-ft8 font-OpenSansSemiBold text-left text-black-50">
        Events
        <div className="">
          <ul
            className="flex flex-wrap -mb-px text-ft4 text-left border-b-3 border-grey-50 w-100.25 space-x-10"
            role="tablist"
          >
            <li
              className={`inline-block text-left mt-7.5 -mb-1 pb-6.25   w-25 ${
                state.status === StatusConstatnts.PUBLISHED
                  ? "border-b-3   text-blue-50 border-transparent border-blue-50"
                  : "text-darkGrey-100"
              }`}
            >
              <button
                onClick={() => {
                  handleChange("status", StatusConstatnts.PUBLISHED);
                  handleChange("searchQuery", "");
                }}
              >
                Current
              </button>
            </li>
            <li
              className={`inline-block text-left mt-7.5 -mb-1 pb-6.25 pl-3  w-30 ${
                state.status === StatusConstatnts.UPCOMING
                  ? "border-b-3   text-blue-50 border-transparent border-blue-50"
                  : "text-darkGrey-100"
              }`}
            >
              <button
                onClick={() => {
                  handleChange("status", StatusConstatnts.UPCOMING);
                  handleChange("searchQuery", "");
                }}
              >
                Upcoming
              </button>
            </li>
            <li
              className={`inline-block text-left -mb-1 mt-7.5 pb-6.25 pl-4 w-25 ${
                state.status === StatusConstatnts.PAST
                  ? "border-b-3   text-blue-50 border-transparent border-blue-50"
                  : "text-darkGrey-100"
              }`}
            >
              <button
                onClick={() => {
                  handleChange("status", StatusConstatnts.PAST);
                  handleChange("searchQuery", "");
                }}
              >
                Previous
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-12.5">
        <SearchInput
          value={state.searchQuery}
          onSubmit={searchEvent}
          handleChange={handleChange}
        />

        <button
          onClick={handleCreateEvent}
          className="flex items-center h-12.5 w-37.5 font-OpenSansSemiBold text-ft3 text-white bg-blue-50 rounded-full "
        >
          {" "}
          <img
            alt="create"
            src="/images/ic-create.svg"
            className=" pr-2.5  pl-5.2 "
          />{" "}
          Create Event
        </button>
      </div>
      <div className="rounded-xl bg-white drop-shadow-md pb-3.75 pt-3.75 mt-7.5 w-full items-center">
        <table className="w-full h-87.5">
          <tbody className=" rounded-xl bg-white drop-shadow-md  w-full ">
            <tr className="h-19.75 w-full pl-7.5 pr-12.5 flex justify-between items-center border-b border-grey-50  text-left font-OpenSansSemiBold text-ft3 text-black-50  ">
              <CommonImages title="Image" classes="w-5per whitespace-nowrap	" />
              <CommonImages
                handleSorting={sortByNameHandler}
                title="Event"
                classes="3xl:w-30per w-auto whitespace-nowrap	"
              />
              <CommonImages
                handleSorting={sortByNameHandler}
                title="Ticket Sold / On Offer"
                classes="w-10per whitespace-nowrap"
              />
              <CommonImages
                title="Revenue"
                handleSorting={sortByNameHandler}
                classes="w-10per whitespace-nowrap	"
              />
              <CommonImages
                title="Status"
                classes="w-10per whitespace-nowrap	"
              />
              <CommonImages title="NFT" classes="w-10per whitespace-nowrap	" />
              <CommonImages
                required={true}
                title="Action"
                classes="whitespace-nowrap	"
              />
            </tr>
            {state.loading?
               (
              <div className="noRecordFound">
                <CircularProgress color="#395FF1" />
              </div>
            )
            :
            state.loading == false && state?.events?.length===0 ?
            <p className="noRecordFound">No data found</p>
            :

            state.loading ==false && state?.events?.map((item, index) => (
                <TableItems
                  key={index}
                  item={item}
                  deleteEvent={deleteEvent}
                  setDistributeEventDetails={setDistributeEventDetails}
                />
              ))
            }
          </tbody>
        </table>
      </div>
      <div
        style={{ display: state.events.length === 0 ? "none" : "" }}
        className=""
      >
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
          numberOfItems={state?.events?.length}
        />{" "}
      </div>
    </div>
  );
}
function TableItems({ item, deleteEvent, setDistributeEventDetails }) {
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);

  return (
    <>
      <tr className=" h-19.75 w-full pl-7.5  pr-12.5 py-1 flex justify-between items-center border-b border-grey-50 font-OpenSansRegular text-left text-ft3 text-black-50 ">
        <td className="w-5per break-all	">
          <img
            alt="break"
            src={item?.image}
            className="object-cover h-16 w-16 rounded-md"
          />
        </td>
        <td className="3xl:w-30per w-15  break-all truncate	">
          {
            <>
              <div className="text-ft3 text-black-50 break-all truncate">
                {" "}
                {item?.name?.length > 30
                  ? `${item?.name?.slice(0, 30)}...`
                  : item?.name}
              </div>
              <div className="text-ft2 mt-1.25 text-darkGrey-100 break-all truncate">
                {item?.venueLocation?.venue?.length > 30
                  ? `${item?.venueLocation?.venue?.slice(0, 30)}...`
                  : item?.venueLocation?.venue}
              </div>
              <div className="text-ft1 mt-1.25 text-darkGrey-100 break-all truncate">{`${moment(
                item?.startTime
              ).format("dddd, MMMM DD, YYYY")} at ${moment(
                item?.startTime
              ).format("HH:mm A")} ${item?.eventTimezone}`}</div>
            </>
          }
        </td>
        <td className="w-10per break-all	">{`${item?.ticketSold}/${item?.totalTicket}`}</td>
        <td className="w-10per break-all	">{item?.revenue}</td>
        <td className="w-10per break-all	">{item?.status}</td>
        <td className="w-10per break-all	">
          <button
            disabled={item?.status !== "Current"}
            className={`flex items-center 3xl:pl-6 px-3.5 3xl:h-12.5 h-10 3xl:w-37.5 w-28 font-OpenSansSemiBold 3xl:text-ft3 text-ft1 text-white rounded-full ${
              item?.status !== "Current" ? "bg-Slate-350" : "bg-blue-50"
            }`}
            onClick={() => {
              setDistributeEventDetails(
                item.eventId,
                item.contractAbi,
                item.contractAddress,
                item.ownerWalletAddress,
                item.network,
                item.creator.email
              );
            }}
          >
            Distribute NFT
          </button>
        </td>
        <td
          className="relative"
          ref={ref}
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            alt=""
            src="/images/ic-action.svg"
            className="cursor-pointer pr-8 ml-2.75"
          />
          {showMenu && (
            <div className="absolute bottom-8 right-0 w-53.75 h-auto py-2.5 bg-white shadow-xl  ">
              <div
                className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100"
                onClick={() => history.push(`${Pages.EVENTS}/${item.eventId}`)}
              >
                View
              </div>
              {/*<div className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100">*/}
              {/*  Edit*/}
              {/*</div>*/}

              {item?.ticketSold <= 0 ?
                <div
                className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100"
                onClick={() => {
                  deleteEvent(item.eventId);
                }}
              >
                Delete
              </div> : null}
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default EventComponent;
