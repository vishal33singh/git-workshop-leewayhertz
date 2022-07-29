import React from "react";
import { history } from "../../managers/history";
import { sideBarConstant } from "../../constants";
import { sessionManager } from "../../managers/sessionManager";
import { cookiesConstants } from "../../constants";

const Sidebar = (props) => {
  const [subMenu, setSubMenu] = React.useState(false);
  const [state, setState] = React.useState();
  const pathName = window.location.pathname?.split("/");
  const currSection = pathName?.length ? pathName[pathName.length - 1] : "";

  // const handleSubMenu = () => {
  //   setSubMenu(!subMenu);
  // };

  return (
    <div className="height-940 w-96 bg-white mb-17 mt-10 rounded-2xl relative">
      <div className="flex pl-4.25 pt-5">
        <img
          src="/images/Profile pic.png"
          alt="profile"
          className="p-1 w-16 h-16 img-border"
        />
        <div className="text-gameName-25">
          <div className="p-0.5 text-darkGrey font-PoppinsMedium ml-2">
            Digital Gamers
          </div>
          <div className="pl-1 text-darkGrey font-PoppinsRegular ml-2">
            {sessionManager
              .getDataFromCookies(cookiesConstants.ACCOUNT)
              .slice(0, 5) +
              "..." +
              sessionManager
                .getDataFromCookies(cookiesConstants.ACCOUNT)
                .substr(
                  sessionManager.getDataFromCookies(cookiesConstants.ACCOUNT)
                    .length - 4
                )}
          </div>
          <div className="flex flex-wrap ml-2 gap-y-3">
            {/* <div className="text-ft1 font-PoppinsMedium bg-blue-25 text-white rounded-3xl w-auto max-w-xs h-5 px-3 pt-1px mx-0.5 mt-0.5 font-medium cursor-pointer">
              Creater
            </div> */}
            <div className="text-ft1 font-PoppinsMedium bg-blue-25 text-white rounded-3xl w-auto max-w-xs h-5 px-3 pt-1px mx-0.5 mt-0.5 font-medium cursor-pointer">
              Player
            </div>
            {/* <div className="text-ft1 font-PoppinsMedium bg-blue-25 text-white rounded-3xl w-auto max-w-xs h-5 px-3 pt-1px mx-0.5 mt-0.5 font-medium cursor-pointer">
              Sponsor
            </div> */}
            <div className="text-ft1 flex font-PoppinsMedium border-0.5 border-blue-25 text-blue-25 rounded-3xl w-auto max-w-xs h-5 pl-2 pr-1 pt-1px mx-0.5 mt-1 font-medium cursor-pointer">
              Edit Role
              <img src="/images/Settings.svg" alt="" className="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-15 px-4.25">
        <div
          className={`flex ${
            currSection === sideBarConstant.DASHBOARD && !subMenu
              ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
              : ""
          } h-11 my-3`}
          onClick={() => {
            setSubMenu(false);
            history.push(`/profile/${sideBarConstant.DASHBOARD}`);
          }}
        >
          <img
            src={
              currSection === sideBarConstant.DASHBOARD && !subMenu
                ? "/images/dashboardactive.svg"
                : "/images/dashboardinactive.svg"
            }
            alt="dashboard"
            className="mx-5 py-2"
          />
          <span
            className={
              currSection === sideBarConstant.DASHBOARD && !subMenu
                ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                : "py-2 mx-1 text-ft4 text-darkGrey-50 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
            }
          >
            Dashboard
          </span>
        </div>
        <div
          className={`flex ${
            currSection === sideBarConstant.MY_GAMES && !subMenu
              ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
              : ""
          } h-11 my-3`}
          onClick={() => {
            setSubMenu(false);
            history.push(`/profile/${sideBarConstant.MY_GAMES}`);
          }}
        >
          <img
            src={
              currSection === sideBarConstant.MY_GAMES && !subMenu
                ? "/images/mygamesactive.svg"
                : "/images/mygamesinactive.svg"
            }
            alt="games"
            className="mx-5 py-2"
          />
          <span
            className={
              currSection === sideBarConstant.MY_GAMES && !subMenu
                ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                : "py-2 mx-1 text-ft4 text-darkGrey-50 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
            }
          >
            My Games
          </span>
        </div>
        {/* <div
          className={`flex ${currSection === sideBarConstant.SPONSORED_GAME && !subMenu ? 'bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1' : ''} h-11 my-3`}
          onClick={() => {
            setSubMenu(false);
            history.push(`/profile/${sideBarConstant.SPONSORED_GAME}`);
          }}
        >
          <img
            src={
              currSection === sideBarConstant.SPONSORED_GAME && !subMenu
                ? "/images/sponsoredgamesactive.svg"
                : "/images/sponsoredgamesinactive.svg"
            }
            alt="sponser_games"
            className="mx-5 py-3"
          />
          <span
            className={
              currSection === sideBarConstant.SPONSORED_GAME && !subMenu
                ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer pl-2"
                : "py-2 mx-1 text-ft4 text-darkGrey-50 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer pl-2"
            }
          >
            Sponsored Games
          </span>
        </div> */}
        <div
          className={`flex ${
            currSection === sideBarConstant.TRANSACTIONS && !subMenu
              ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
              : ""
          } h-11 my-3`}
          onClick={() => {
            setSubMenu(false);
            history.push(`/profile/${sideBarConstant.TRANSACTIONS}`);
          }}
        >
          <img
            src={
              currSection === sideBarConstant.TRANSACTIONS && !subMenu
                ? "/images/transcationactive.svg"
                : "/images/transcationinactive.svg"
            }
            alt="transactions"
            className="mx-5 py-2"
          />
          <span
            className={
              currSection === sideBarConstant.TRANSACTIONS && !subMenu
                ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                : "py-2 mx-1 text-ft4 text-darkGrey-50 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
            }
          >
            Transactions
          </span>
        </div>
        <div
          className={`flex ${
            currSection === sideBarConstant.MY_EARNINGS && !subMenu
              ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
              : ""
          } h-11 my-3`}
          onClick={() => {
            setSubMenu(false);
            history.push(`/profile/${sideBarConstant.MY_EARNINGS}`);
          }}
        >
          <img
            src={
              currSection === sideBarConstant.MY_EARNINGS && !subMenu
                ? "/images/myearningactive.svg"
                : "/images/myearninginactive.svg"
            }
            alt="earnings"
            className="mx-5 py-2"
          />
          <span
            className={
              currSection === sideBarConstant.MY_EARNINGS && !subMenu
                ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                : "py-2 mx-1 text-ft4 text-darkGrey-50 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
            }
          >
            My Earnings
          </span>
        </div>
        {/* <div
          className={`flex ${currSection === sideBarConstant.QR_CODES && !subMenu ? 'bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1' : ''} h-11 my-3`}
          onClick={() => {
            setSubMenu(false);
            history.push(`/profile/${sideBarConstant.QR_CODES}`);
          }}
        >
          <img
            src={
              currSection === sideBarConstant.QR_CODES && !subMenu
                ? "/images/qrcodeactive.svg"
                : "/images/qrcodeinactive.svg"
            }
            alt="qr"
            className="mx-5 py-2"
          />
          <span
            className={
              currSection === sideBarConstant.QR_CODES && !subMenu
                ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                : "py-2 mx-1 text-ft4 text-darkGrey-50 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
            }
          >
            QR Codes
          </span>
        </div> */}
        <div
          className={`flex ${
            currSection === sideBarConstant.SETTING && !subMenu
              ? "bg-lightRed-30 rounded-5-5xl border-lightRed-35 border-1"
              : ""
          } h-11 my-3`}
          onClick={() => {
            setSubMenu(false);
            history.push(`/profile/${sideBarConstant.SETTING}`);
          }}
        >
          <img
            src={
              currSection === sideBarConstant.SETTING && !subMenu
                ? "/images/settingactive.svg"
                : "/images/settinginactive.svg"
            }
            alt="settings"
            className="mx-5 py-2"
          />
          <span
            className={
              currSection === sideBarConstant.SETTING && !subMenu
                ? "py-2 mx-1 text-ft4 text-lightRed-25 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
                : "py-2 mx-1 text-ft4 text-darkGrey-50 font-PoppinsMedium font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer"
            }
          >
            Settings
          </span>
        </div>
      </div>
      <div className=" pb-2">
        <div
          className="flex absolute bottom-11.5 pt-4 pl-4"
          onClick={() => {
            sessionManager.removeDataFromCookies(cookiesConstants.IS_LOGGED_IN);
            sessionManager.removeDataFromCookies(cookiesConstants.ACCOUNT);
            history.replace("/");
          }}
        >
          <img src="/images/Settings.svg" alt="settings" className="mx-5" />
          <span className="py-2 mx-1 text-ft3 font-PoppinsSemiBold font-medium grid grid-cols-1 gap-1 place-content-center cursor-pointer text-blue-25">
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
