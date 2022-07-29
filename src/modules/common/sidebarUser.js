import React from "react";
import { history } from "../../managers/history";
import { sideBarConstant } from "../../constants";
import { sessionManager } from "../../managers/sessionManager";
import { cookiesConstants } from "../../constants";
const SideDrawer = (props) => {
  const pathName = window.location.pathname?.split("/");
  const currSection = pathName?.length ? pathName[pathName.length - 1] : "";
  const handleClick = () => {
    props.close();
  };
  return (
    <div
      className={`absolute flex w-full h-full z-50 border-t-0.5 border-tRowBorder px-5 tablet:px-0 mobile:px-0 mobile:overflow-y-scroll
          `}
    >
      <div className="block w-110 bg-white h-full mobile:w-86.67% ">
        <img
          src="/images/back-arrow-sideBar.svg"
          alt=""
          className="pt-5 ml-9 mobile:ml-3"
          onClick={() => handleClick()}
        />
        <div className="h-full w-full bg-white rounded-2xl ">
          <div className="flex pl-4.25">
            <img
              src="/images/Profile pic.png"
              alt="profile"
              className="p-1 w-16 h-16 img-border"
            />
            <div className="text-gameName-25">
              <div className="p-0.5 text-darkGrey font-PoppinsSemiBold ml-2">
                Digital Gamers
              </div>
              <div className="pl-1 text-darkGrey font-PoppinsMedium text-ft2 ml-2">
                {sessionManager
                  .getDataFromCookies(cookiesConstants.ACCOUNT)
                  .slice(0, 5) +
                  "..." +
                  sessionManager
                    .getDataFromCookies(cookiesConstants.ACCOUNT)
                    .substr(
                      sessionManager.getDataFromCookies(
                        cookiesConstants.ACCOUNT
                      ).length - 4
                    )}
              </div>
              <div className="flex flex-wrap w-4/5 ml-1 gap-y-2">
                {/* <div className="text-ft2 font-PoppinsMedium bg-blue-25 text-white rounded-3xl w-auto max-w-xs h-5 px-3 mx-1 mt-1 font-medium cursor-pointer">
                  Creater
                </div> */}
                <div className="text-ft2 font-PoppinsMedium bg-blue-25 text-white rounded-3xl w-auto max-w-xs h-5 px-3 mx-1 mt-1 font-medium cursor-pointer">
                  Player
                </div>
                {/* <div className="text-ft2 font-PoppinsMedium bg-blue-25 text-white rounded-3xl w-auto max-w-xs h-5 px-3 mx-1 mt-1 font-medium cursor-pointer">
                  Sponsor
                </div> */}
                <div className="text-ft2 flex font-PoppinsMedium border-0.5 border-blue-25 text-blue-25 rounded-3xl w-auto max-w-xs h-5 pl-2 pr-1 mx-1 mt-2 font-medium cursor-pointer">
                  Edit Role
                  <img src="/images/Settings.svg" alt="" className="" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-15 px-4.25 sidebar-height">
            <div
              className={`flex ${
                currSection === sideBarConstant.DASHBOARD
                  ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
                  : ""
              } h-11 my-3`}
              onClick={() => {
                history.push(`/profile/${sideBarConstant.DASHBOARD}`);
                props.close();
              }}
            >
              <img
                src={
                  currSection === sideBarConstant.DASHBOARD
                    ? "/images/dashboardactive.svg"
                    : "/images/dashboardinactive.svg"
                }
                alt="games"
                className="mx-5 py-2"
              />
              <span
                className={
                  currSection === sideBarConstant.DASHBOARD
                    ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                    : "py-2 mx-1 text-ft4 text-gameName-25 font-PoppinsRegular font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                }
              >
                Dashboard
              </span>
            </div>
            <div
              className={`flex ${
                currSection === sideBarConstant.MY_GAMES
                  ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
                  : ""
              } h-11 my-3`}
              onClick={() => {
                history.push(`/profile/${sideBarConstant.MY_GAMES}`);
                props.close();
              }}
            >
              <img
                src={
                  currSection === sideBarConstant.MY_GAMES
                    ? "/images/mygamesactive.svg"
                    : "/images/mygamesinactive.svg"
                }
                alt="games"
                className="mx-5 py-2"
              />
              <span
                className={
                  currSection === sideBarConstant.MY_GAMES
                    ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                    : "py-2 mx-1 text-ft4 text-gameName-25 font-PoppinsRegular font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                }
              >
                My Games
              </span>
            </div>
            <div
              className={`flex ${
                currSection === sideBarConstant.TRANSACTIONS
                  ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
                  : ""
              } h-11 my-3`}
              onClick={() => {
                history.push(`/profile/${sideBarConstant.TRANSACTIONS}`);
                props.close();
              }}
            >
              <img
                src={
                  currSection === sideBarConstant.TRANSACTIONS
                    ? "/images/transcationactive.svg"
                    : "/images/transcationinactive.svg"
                }
                alt="transactions"
                className="mx-5 py-2"
              />
              <span
                className={
                  currSection === sideBarConstant.TRANSACTIONS
                    ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                    : "py-2 mx-1 text-ft4 text-gameName-25 font-PoppinsRegular font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                }
              >
                Transactions
              </span>
            </div>
            <div
              className={`flex ${
                currSection === sideBarConstant.MY_EARNINGS
                  ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
                  : ""
              } h-11 my-3`}
              onClick={() => {
                history.push(`/profile/${sideBarConstant.MY_EARNINGS}`);
                props.close();
              }}
            >
              <img
                src={
                  currSection === sideBarConstant.MY_EARNINGS
                    ? "/images/myearningactive.svg"
                    : "/images/myearninginactive.svg"
                }
                alt="earnings"
                className="mx-5 py-2"
              />
              <span
                className={
                  currSection === sideBarConstant.MY_EARNINGS
                    ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                    : "py-2 mx-1 text-ft4 text-gameName-25 font-PoppinsRegular font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                }
              >
                My Earnings
              </span>
            </div>
            <div
              className={`flex ${
                currSection === sideBarConstant.SETTING
                  ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
                  : ""
              } h-11 my-3`}
              onClick={() => {
                history.push(`/profile/${sideBarConstant.SETTING}`);
                props.close();
              }}
            >
              <img
                src={
                  currSection === sideBarConstant.SETTING
                    ? "/images/settingactive.svg"
                    : "/images/settinginactive.svg"
                }
                alt="earnings"
                className="mx-5 py-2"
              />
              <span
                className={
                  currSection === sideBarConstant.SETTING
                    ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                    : "py-2 mx-1 text-ft4 text-gameName-25 font-PoppinsRegular font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                }
              >
                Settings
              </span>
            </div>
          </div>
          <div className="pb-5 absolute bottom-25 pt-36 logout-sidebar">
            <div
              className="flex"
              onClick={() => {
                sessionManager.removeDataFromCookies(
                  cookiesConstants.IS_LOGGED_IN
                );
                sessionManager.removeDataFromCookies(cookiesConstants.ACCOUNT);
                history.replace("/");
              }}
            >
              <img
                src="/images/Settings.svg"
                alt="settings"
                className="ml-8 mr-5 pl-1"
              />
              <span className="py-2 mx-1 text-ft4 font-PoppinsSemiBold font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer text-blue-25">
                Log out
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 tablet:w-2/4 h-full bg-black-50 opacity-50" />
    </div>
  );
};

export default SideDrawer;
