import React from "react";
import { NavLink } from "react-router-dom";
import { Pages } from "../../constants";
import Avatar from "@material-ui/core/Avatar";

function AccountSettingComponent(props) {
  const { state, handleChange, updateUser, handleSetState } = props;
  const { userDetails, error } = state;
  const CHARACTER_LIMIT = 20;

  const onChangeHandler = (event) => {
    handleChange("state.newPassword", event.target.value);
    if (event.target.value) {
      handleSetState("isPasswordChanged", true);
    } else {
      handleSetState("isPasswordChanged", false);
    }
  };

  return (
    <div className="bg-Slate-200 p-12.5 ">
      <div className="flex flex-col bg-Slate-200  w-full">
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

        <h1 className="text-black-50 text-ft9 font-OpenSansSemiBold mt-6">
          Account Settings
        </h1>
        <div className="flex justify-center items-center mt-10">
          <div className="bg-white flex flex-col   h-283.5 w-full p-20 rounded-lg divide-y divide-Slate-200 space-y-10 ">
            <div>
              <h1 className="text-black-50 text-ft6 font-OpenSansSemiBold mb-3">
                Account Info
              </h1>
              <p className="text-ft3 text-darkGrey-100 font-OpenSansRegular">
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "} */}
              </p>
            </div>
            <div className="flex">
              <div className="mt-10 mr-25  space-y-3">
                <div className="inline-flex items-end">
                  <div className="w-30 h-30 rounded-50per flex overflow-hidden">
                    <img
                      className="m-auto h-full w-full"
                      src={
                        userDetails.image
                          ? userDetails.image
                          : "/images/img-profile@2x.png"
                      }
                      alt="profile"
                    />
                  </div>
                  <label for="user">
                    <svg
                      className="cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <g id="ic-uploadprofile" transform="translate(-466 -458)">
                        <circle
                          id="Ellipse_64"
                          data-name="Ellipse 64"
                          cx="15"
                          cy="15"
                          r="15"
                          transform="translate(466 458)"
                          fill="#395ff1"
                        />
                        <path
                          id="edit-2"
                          d="M11.667,3,15,6.333,6.333,15H3V11.667Z"
                          transform="translate(472.5 464.5)"
                          fill="#fff"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                      </g>
                    </svg>
                  </label>
                  <input
                    type={"file"}
                    id="user"
                    accept="image/png, image/jpg, image/jpeg"
                    className="hidden"
                    multiple={false}
                    onChange={(event) =>
                      handleChange("state.userImage", event.target.files[0])
                    }
                  />
                </div>

                <p className="text-darkGrey-50 font-OpenSansSemiBold text-ft3 ml-5">
                  Profile Image
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex flex-col mb-4 mt-10">
                  <label className="text-darkGrey-50 font-OpenSansSemiBold text-ft3 mb-2">
                    Full Name
                  </label>
                  <input
                    className="text-black-50 text-ft3 font-OpenSansRegular  border border-grey-400 pl-5 rounded-md w-155 h-11.25 focus:outline-none"
                    placeholder="Enter your name"
                    type="text"
                    // maxLength="20"
                    value={userDetails?.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                  />
                  <p className="font-OpenSansRegular text-ft2 mt-2.5 justify-end flex text-darkGrey-50">
                    {/* {`${userDetails?.organization?.name.length}/${CHARACTER_LIMIT}`} */}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-darkGrey-50 font-OpenSansSemiBold text-ft3 mb-2">
                    Email Address
                  </label>
                  <input
                    className="text-black-50 text-ft3 font-OpenSansRegular  border border-grey-400 pl-5 rounded-md w-155 h-11.25 focus:outline-none"
                    placeholder="Enter your email"
                    type="email"
                    value={userDetails?.email}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    disabled={true}
                  />
                </div>
                <div className="flex">
                  <div className="flex flex-col mb-4">
                    <label className="text-darkGrey-50 font-OpenSansSemiBold text-ft3 mb-2">
                      Password
                    </label>
                    <input
                      className={
                        state.isChangePassword
                          ? "hidden"
                          : "text-black-50 text-ft3 font-OpenSansRegular pr-2  border border-grey-400 pl-5 rounded-md w-75 h-11.25 focus:outline-none"
                      }
                      placeholder="Password"
                      value={state.dummyPassword}
                      disabled={true}
                    />
                    <div
                      className={!state.isChangePassword ? "hidden" : "block"}
                    >
                      <input
                        className="text-black-50 text-ft3 font-OpenSansRegular pr-2  border border-grey-400 pl-5 rounded-md w-75 h-11.25 focus:outline-none"
                        type="password"
                        placeholder="Current Password"
                        value={state.temperaryPassword}
                        onChange={(event) =>
                          handleChange(
                            "state.temperaryPassword",
                            event.target.value
                          )
                        }
                      />
                      <input
                        className="text-black-50 text-ft3 font-OpenSansRegular ml-4 pr-2  border border-grey-400 pl-5 rounded-md w-75 h-11.25 focus:outline-none"
                        type="password"
                        placeholder="New Password"
                        value={state.newPassword}
                        onChange={(event) => onChangeHandler(event)}
                      />
                    </div>
                  </div>

                  <div className="flex mt-10 text-blue-50 ml-4 text-ft3 font-OpenSansSemiBold">
                    <span
                      className={
                        state.isChangePassword
                          ? "hidden"
                          : "block cursor-pointer font-OpenSansSemiBold text-ft3"
                      }
                      onClick={() =>
                        handleChange("state.isChangePassword", true)
                      }
                    >
                      Change password
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-10">
              <div>
                <h1 className="text-black font-OpenSansSemiBold text-ft6 mb-3">
                  Organization
                </h1>
                <p className="text-darkGrey-100 font-OpenSansRegular text-ft3">
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
                </p>
              </div>
              <div className="flex ">
                <div className="flex flex-col mt-10 mr-25">
                  <div className="inline-flex items-end">
                    <div className="w-30 h-30 rounded-50per flex overflow-hidden">
                      {userDetails?.organization?.image ? (
                        <img
                          className="m-auto h-full w-full"
                          src={
                            userDetails?.organization?.image
                            // ? userDetails?.organization?.image
                            // : "/images/img-placeholder.svg"
                          }
                          alt="organization"
                        />
                      ) : (
                        <Avatar className="m-auto h-full w-full">
                          {userDetails?.organization?.name.slice(0, 2)}
                        </Avatar>
                      )}
                    </div>
                    <label for="organization">
                      <svg
                        className="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                      >
                        <g
                          id="ic-uploadprofile"
                          transform="translate(-466 -458)"
                        >
                          <circle
                            id="Ellipse_64"
                            data-name="Ellipse 64"
                            cx="15"
                            cy="15"
                            r="15"
                            transform="translate(466 458)"
                            fill="#395ff1"
                          />
                          <path
                            id="edit-2"
                            d="M11.667,3,15,6.333,6.333,15H3V11.667Z"
                            transform="translate(472.5 464.5)"
                            fill="#fff"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          />
                        </g>
                      </svg>
                    </label>
                    <input
                      type={"file"}
                      id="organization"
                      className="hidden"
                      accept="image/png, image/jpg, image/jpeg"
                      disabled={
                        userDetails?.role === "ORGANISER" ? false : true
                      }
                      multiple={false}
                      onChange={(event) =>
                        handleChange(
                          "state.organizationImage",
                          event.target.files[0]
                        )
                      }
                    />
                  </div>

                  <p className="text-darkGrey-50 text-ft3 font-OpenSansSemiBold mt-4">
                    Organization Image
                  </p>
                </div>
                <div className="mt-8 flex flex-col ">
                  <label className=" text-darkGrey-50 text-ft3 font-OpenSansSemiBold mt-4">
                    Organization Name
                  </label>
                  <input
                    className="mt-4 text-black-50 text-ft3 font-OpenSansRegular  border border-grey-400 pl-5 rounded-md w-155 h-11.25 focus:outline-none"
                    placeholder="Enter organization's name"
                    type="text"
                    disabled={userDetails?.role === "ORGANISER" ? false : true}
                    // maxLength="20"
                    value={userDetails?.organization?.name}
                    onChange={(event) =>
                      handleChange("organization.name", event.target.value)
                    }
                  />
                  <p className="font-OpenSansRegular text-ft2 mt-2.5 justify-end flex text-darkGrey-50">
                    {/* {`${userDetails?.organization?.name.length}/${CHARACTER_LIMIT}`} */}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-10 flex space-x-8    text-ft3 font-OpenSansSemiBold">
              <NavLink to={Pages.DASHBOARD}>
                <div>
                  <button className="rounded-3xl w-37.5 h-12.5 border text-darkGrey-100 border-darkGrey-50 font-OpenSansSemiBold">
                    Discard
                  </button>
                </div>
              </NavLink>
              <div>
                <button
                  onClick={() => updateUser()}
                  className="rounded-3xl w-37.5 h-12.5 border text-white bg-blue-50 border-darkGrey-50 font-OpenSansSemiBold"
                >
                  {state.isLoading ? "Updating.." : "Update"}
                </button>
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettingComponent;
