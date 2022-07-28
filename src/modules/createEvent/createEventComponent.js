import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import FooterNextButton from "./footerNextButton";
import DragAndDropComponent from "./dragAndDropComponent";
// import TimezonePicker from 'react-bootstrap-timezone-picker';
import TimezonePicker from "react-timezone";
import moment from "moment";
import { usePlacesWidget } from "react-google-autocomplete";

// import Autocomplete from "react-google-autocomplete";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateEventComponent(props) {
  const {
    handleChange,
    updateActivePage,
    updateVenueLocation,
    checkBasicInfo,
    uploadEventImage,
    deleteEventImage,
    updateLocationType,
    state,
  } = props;
  
  const [venueButton, setVenueButton] = useState(
    "py-4 px-14 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border"
  );
  const [eventButton, setEventButton] = useState(
    "ml-3.75  py-4 px-8 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border"
  );
  const [divShown, setDivShown] = useState("block");
  const [linkShown, setLinkShown] = useState("hidden");
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyBSAboD30VnSq4_2uPsxCes7OCLdfZWBgA",
    onPlaceSelected: (place) =>
      updateVenueLocation({
        country: "",
        state: "",
        pincode: "",
        city: "",
        venue: place.formatted_address,
      }),
  });

  // useMemo(() => {
  //   const tzValue = tz.value ?? tz;
  //   setDatetime(datetime.goto(tzValue));
  // }, [tz]);

  const handleClick = (location) => {
    updateLocationType(location);
    if (
      venueButton ===
      "py-4 px-14 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border"
    ) {
      setVenueButton(
        "py-4 px-14 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400  border"
      );
    } else {
      setVenueButton(
        "py-4 px-14 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50  border"
      );
    }

    if (
      eventButton ===
      "ml-3.75  py-4 px-8 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border"
    ) {
      setEventButton(
        "ml-3.75  py-4 px-8 text-ft3 text-white rounded-lg font-OpenSansRegular bg-blue-50 border"
      );
    } else {
      setEventButton(
        "ml-3.75  py-4 px-8 text-ft3 text-black-50 rounded-lg font-OpenSansRegular border-grey-400 border"
      );
    }
    if (divShown === "block") {
      setDivShown("hidden");
    } else {
      setDivShown("block");
    }
    if (linkShown === "hidden") {
      setLinkShown("block");
    } else {
      setLinkShown("hidden");
    }
  };
  const CHARACTER_LIMIT = 75;
  const CHARACTER_DISC = 140;
  const [categoryToggle, setCategoryToggle] = useState(false);

  return (
    <>
      <div className="bg-Slate-200 px-12.5 pb-18 w-full">
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
              <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-black-50 text-white rounded-full">
                1
              </p>
              <p className="ml-2.5 font-OpenSansSemiBold text-ft4 py-1.5 text-black-50">
                Event Details
              </p>
            </div>
            <div className="flex">
              <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-darkGrey-50 text-white rounded-full">
                2
              </p>
              <p className="ml-2.5 font-OpenSansRegular text-ft4 py-1.5 text-darkGrey-50">
                Tickets
              </p>
            </div>
            <div className="flex">
              <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-darkGrey-50 text-white rounded-full">
                3
              </p>
              <p className="ml-2.5 font-OpenSansRegular text-ft4 py-1.5 text-darkGrey-50">
                Mint
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white pl-12.5 pr-86.5 mt-9.5 rounded-lg pb-77">
          <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 pt-12.5">
            Basic Info
          </h1>
          <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
            Name your event and tell event-goers why they should come.
          </p>
          <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-10">
            Event Title
          </p>
          <input
            id={"name"}
            onChange={(e) => handleChange(e)}
            value={state.name}
            maxLength="75"
            className="w-full rounded-lg border border-grey-400  focus:outline-none text-black-50  mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"
          ></input>
          <p className="font-OpenSansRegular text-ft2  justify-end flex text-darkGrey-50">
            {`${state.name.length}/${CHARACTER_LIMIT}`}
          </p>
          {state.name === "" && !state.basicDetailsFilled ? (
            <p className="text-red-100 ">This field is mandatory</p>
          ) : (
            <></>
          )}

          <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-10">
            Event Category
          </p>

          <select
            id={"category"}
            className={`styled-select-category w-full flex rounded-lg border border-grey-400 bg-white text-black-50 outline-none  mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 ${
              categoryToggle ? "select-active" : "select-inactive"
            }`}
            onChange={(e) => handleChange(e)}
            value={state.category}
            onClick={() => setCategoryToggle(!categoryToggle)}
          >
            <option selected hidden>
              Select Category
            </option>
            {state.categoryList.map((item, index) => (
              <option
                key={index}
                value={item}
                className="font-OpenSansRegular text-ft3 text-black-50 bg-white "
              >
                {item}
              </option>
            ))}
          </select>
          {state.category === "" && !state.basicDetailsFilled ? (
            <p className="text-red-100 mt-3">This field is mandatory</p>
          ) : (
            <></>
          )}

          <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-10">
            Description
          </p>
          <textarea
            id={"description"}
            onChange={(e) => handleChange(e)}
            value={state.description}
            maxLength="140"
            rows="4"
            className=" resize-none w-full border rounded-lg border-grey-400  focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"
          ></textarea>
          <p className="font-OpenSansRegular text-ft2  justify-end flex text-darkGrey-50">
            {`${state.description.length}/${CHARACTER_DISC}`}
          </p>
          {state.description === "" && !state.basicDetailsFilled ? (
            <p className="text-red-100 ">This field is mandatory</p>
          ) : (
            <></>
          )}
          <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-8">
            Location
          </h1>
          <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
            Help people in the area discover your event.
          </p>
          <div className="flex mt-8 ">
            <button
              type="button"
              className={venueButton}
              onClick={() => {
                handleClick("VENUE");
              }}
            >
              Physical Event
            </button>
            <button
              type="button"
              className={eventButton}
              onClick={() => {
                handleClick("ONLINE");
              }}
            >
              Online Event
            </button>
          </div>
          <div className={divShown}>
            <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-100 mt-7.5">
              Venue Location
            </p>
            <div className="flex w-full border rounded-lg border-grey-400 focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 ">
              <img alt="" src="/images/ic-search.svg" className=""></img>

              <input
                ref={ref}
                id={"venueLocation"}
                onChange={(e) =>
                  updateVenueLocation({
                    country: "",
                    state: "",
                    pincode: "",
                    city: "",
                    venue: e.target.value,
                  })
                }
                value={state.venueLocation.venue}
                className="placeholder-darkGrey-50 w-full focus:outline-none pl-2.5"
                placeholder="Search for a venue or address "
              ></input>
            </div>
            {state.venueLocation.venue === "" && !state.basicDetailsFilled ? (
              <p className="text-red-100 mt-3">This field is mandatory</p>
            ) : (
              <></>
            )}
          </div>

          {/* online event */}
          <div className={linkShown}>
            <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-100 mt-7.5">
              Add video conference link
            </p>
            <div className="flex w-full rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
              <input
                id={"videoConferenceLink"}
                onChange={(e) => handleChange(e)}
                value={state.videoConferenceLink}
                className="placeholder-darkGrey-50 w-full focus:outline-none "
                placeholder="http://www.samplelink.com"
              ></input>
            </div>
          </div>
          <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-12.5">
            Date and Time
          </h1>
          <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
            Tell event-goers when your event starts and ends so they can make
            plans to attend.
          </p>
          <div className="flex space-x-5 mt-10 ">
            <div className="flex flex-col w-full">
              <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                Event Starts
              </p>
              <div  className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 ">
                <img alt="" src="/images/ic-calendar.svg" className=""></img>
                <input
                  id={"startDate"}
                  onChange={(e) => handleChange(e)}
                  value={state.startDate}
                  type="date"
                  autoFocus
                  min={moment(new Date()).format("YYYY-MM-DD")}
                  className="placeholder-black-50  focus:outline-none cursor-pointer  flex flex-row-reverse absolute bg-transparent gap-2"
                ></input>
              </div>
              {state.startDate === "" && !state.basicDetailsFilled ? (
                <p className="text-red-100 mt-3">This field is mandatory</p>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col w-full">
              <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 ">
                Event Ends
              </p>
              <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 ">
                <img alt="" src="/images/ic-calendar.svg" className=""></img>
                <input
                  id={"endDate"}
                  onChange={(e) => handleChange(e)}
                  value={moment(state.endDate).format("YYYY-MM-DD")}
                  type="date"
                  min={moment(state.startDate).format("YYYY-MM-DD")}
                  className="placeholder-black-50  focus:outline-none  flex flex-row-reverse absolute bg-transparent gap-2"
                ></input>
              </div>
              {state.endDate === "" && !state.basicDetailsFilled ? (
                <p className="text-red-100 mt-3">This field is mandatory</p>
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
              <div className="sd-container flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 ">
                <input
                  id={"startTime"}
                  onChange={(e) => handleChange(e)}
                  value={state.startTime}
                  className="placeholder-black-50 w-full focus:outline-none flex flex-row-reverse"
                  type="time"
                ></input>
              </div>
              {state.startTime === "" && !state.basicDetailsFilled ? (
                <p className="text-red-100 mt-3">This field is mandatory</p>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col w-full">
              <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                End Time
              </p>
              <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 ">
                <input
                  id={"endTime"}
                  onChange={(e) => handleChange(e)}
                  value={state.endTime}
                  min={state.startTime}
                  className="placeholder-black-50 w-full focus:outline-none flex flex-row-reverse"
                  type="time"
                ></input>
              </div>
              {state.endTime === "" && !state.basicDetailsFilled ? (
                <p className="text-red-100 mt-3">This field is mandatory</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          {state.isValidDate && (
            <div className="text-red-100 mt-3">
              The selected date and time is invalid
            </div>
          )}
          <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50 mt-7.5">
            Timezone
          </p>
          {/* <input
            className="w-full placeholder-black-50 rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3"
            placeholder="(GMT+0800) Philippines Time"s
          ></input> */}
          <TimezonePicker
            id={"eventTimezone"}
            className="w-full placeholder-black-50 rounded-lg border-grey-400 border focus:outline-none mt-4 font-OpenSansRegular text-ft3"
            value={state.eventTimezone}
            onChange={(e) =>
              handleChange({ target: { id: "eventTimezone", value: e } })
            }
            inputProps={{
              placeholder: "Select Timezone...",
              name: "timezone",
            }}
          />
          {state.eventTimezone === "" && !state.basicDetailsFilled ? (
            <p className="text-red-100 mt-3">This field is mandatory</p>
          ) : (
            <></>
          )}
          <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-12.5">
            Event Image
          </h1>
          <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
            This is the first image attendees will see at the top of your
            listing.
            <br></br>
            Use a high quality image: 2160x1080px
          </p>
          <DragAndDropComponent
            uploadEventImage={uploadEventImage}
            chosenFile={state.eventImageFile}
            deleteEventImage={deleteEventImage}
            imageFor={"eventImage"}
          />
          {state.image === "" && !state.basicDetailsFilled ? (
            <p className="text-red-100 ">This field is mandatory</p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <FooterNextButton
        updateActivePage={updateActivePage}
        checkBasicInfo={checkBasicInfo}
      />
    </>
  );
}

export default CreateEventComponent;
