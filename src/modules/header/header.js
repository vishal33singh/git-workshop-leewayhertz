import React, { useState, useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { handleSidebar, updateKaikasDetails } from "../../action";
import { eventConstants, NotificationType, Pages } from "../../constants";
import Utils from "../../utility";
import { NotificationModel } from "../../models/notification";
import ConnectWallet from "./connectWallet";
import {
  getAllNotifications,
  getUnreadNotifications,
  markNotificationRead,
} from "../../services/notification";
import Auth0Service from "../../services/auth0Service";
import { UserModel } from "../../models/user";
import { CircularProgress } from "material-ui";

// const currentSize = 2;

function Header({ SetSidebar, updateKaikasDetails, isActive, user }) {
  const [connectWallet, setConnectWallet] = useState(false);
  const [isConnected, setIsConnected] = useState(
    window.caver?.currentProvider?.selectedAddress ||
      user?.userDetails?.kaikasWalletDetails?.address
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState("");
  const [showMore, setshowMore] = useState(false);

  const [accountDetails, setAccountDetails] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([]); //notificationsList
  const [selectedNotification, setSelectedNotification] = useState(
    NotificationType.ALL
  ); //Tabs selection
  const ref = useRef();
  const notifyRef = useRef();
  const userDetails =
    user.userDetails && Object.keys(user.userDetails).length
      ? user.userDetails
      : new UserModel();
  const logout = () => {
    new Auth0Service().logout();
    dispatch({ type: eventConstants.LOGOUT, data: {} });
  };

  useEffect(() => {
    getNotifications(selectedNotification);
    getNotifications(NotificationType.UNREAD, false);
  }, [selectedNotification, currentSize]);

  useEffect(() => {
    if (window.caver?.currentProvider?.selectedAddress) {
      updateKaikasDetails({
        address: window.caver?.currentProvider?.selectedAddress,
      });
    } else {
      updateKaikasDetails({
        address: "",
      });
    }
    setIsConnected(!!user?.kaikasWalletDetails?.address);
  }, [connectWallet]);
 const NotificationLoader = (save )=>{
  
  setLoading(false)
 }
  const getNotifications = async (type = NotificationType.ALL, save = true) => {
    setLoading(true)
    const [error, notifications] = await Utils.parseResponse(
      type === NotificationType.ALL
        ? getAllNotifications(
          userDetails.userId,
          save ? currentPage : 1,
          currentSize
        )
          
        : getUnreadNotifications(
            userDetails.userId,
            save ? currentPage : 1,
            currentSize
          )
    );

    if (
      error ||
      !notifications ||
      !notifications.data ||
      !notifications.data.length
    ) {
      if (save) setNotifications([]);
      setLoading(false)
      return;
    }
    if (save) {
      setLoading(false)
      setNotifications(
        notifications.data.map((item) => new NotificationModel(item))
      );
      setNumberOfElements(notifications.numberOfElements);
    } else {

      setUnreadNotifications(notifications.numberOfElements);
    }
  };

  //for account details dropdown close it after clicking anywhere on screen
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (accountDetails && ref.current && !ref.current.contains(e.target)) {
        setAccountDetails(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [accountDetails]);

  //for notification dropdown close it after clicking anywhere on screen
  useEffect(() => {
    const checkIfClickedOutside = async (e) => {
      if (
        isNotificationOpen &&
        notifyRef.current &&
        !notifyRef.current.contains(e.target)
      ) {
        const notificationIds = notifications
          .filter((data) => data.isRead === false)
          .map((data) => data.id);
        if (notificationIds?.length) {
          await markNotificationRead({ notificationIds });
          setSelectedNotification(NotificationType.UNREAD);
        }
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isNotificationOpen]);
    return (
    <div className=" h-16 flex justify-between item-center">
      <div className="flex items-center">
        <img
          alt=""
          className="ml-12.5 my-7 w-4.5 h-3 cursor-pointer"
          src="/images/ic_menu.svg"
          onClick={() => SetSidebar(!isActive)}
        />
        <img src="/images/img-logo.png" className="ml-7 h-5" />
      </div>
      <div className="flex items-center">
        <div
          ref={ref}
          className="items-center flex flex-row relative cursor-pointer "
          onClick={() => setAccountDetails(!accountDetails)}
        >
          <div className="w-8.75 h-8.75 flex rounded-50per overflow-hidden">
            <img
              alt="org"
              className="m-auto h-full w-full"
              src={
                userDetails.image
                  ? userDetails.image
                  : "/images/img-profile.png"
              }
            />
          </div>
          <p className=" pl-3 pr-2 py-6 flex-row whitespace-nowrap  font-OpenSansSemiBold text-ft3 text-darkGrey-100">
            {userDetails?.name?.length > 14
              ? `${userDetails?.name?.slice(0, 14)}...`
              : userDetails?.name}
          </p>
          <img
            alt="down-arrow"
            className="relative w-3.5 pl-1 cursor-pointer "
            src="/images/down-arrow.svg"
          />
          {accountDetails && (
            <div className="border bg-white rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-2xl border-grey-200  mb-10 w-42.5 h-26.9 py-2.5  top-15 absolute">
              <div className="h-4 w-4 transform absolute -top-2 rotate-45 right-11 border-t border-l border-grey-200 bg-white"></div>

              <a className="flex " href={Pages.ACCOUNT_SETTING}>
                <img
                  alt=""
                  className="pl-4"
                  src="/images/ic-accountsettings.svg"
                />
                <div className=" h-10 flex items-center pl-4 font-OpenSansRegular text-ft2 text-left text-darkGrey-100 cursor-pointer">
                  Account Settings
                </div>
              </a>
              <div className=" border border-grey-100"></div>
              <div className="flex" onClick={() => logout()}>
                <img alt="" className=" pl-4" src="/images/ic-logout.svg" />
                <div className=" h-10 flex items-center pl-6 font-OpenSansRegular text-ft2 text-left text-darkGrey-100 cursor-pointer ">
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="ml-7 h-5 border border-grey-200"></div>
        <span className="relative ml-7 flex items-center" ref={notifyRef}>
          <div
            onClick={() => setNotificationOpen(!isNotificationOpen)}
            className="relative"
          >
            <img
              alt=""
              className="mr-10 h-5 my-6 cursor-pointer "
              src="/images/ic-notification.png"
            />
            {unreadNotifications > 0 ? (
              <span className="text-white bg-blue-50 absolute rounded-full text-ft1 mt-4 top-0 ml-2   py-0 px-1.5">
                {unreadNotifications}
              </span>
            ) : null}
          </div>
          {isNotificationOpen && (
            <div className="border rounded-lg bg-white border-grey-200 right-0  mb-10 w-80 absolute top-16">
              <div className="flex justify-between w-full pt-6 border-b-0.25 border-grey-100 pb-6">
                <div className="text-ft3 font-OpenSansSemiBold text-black-50 px-4 pt-1.5 cursor-pointer">
                  Notifications
                </div>
                <div className="flex justify-between w-6/12">
                  <div
                    onClick={() =>
                      setSelectedNotification(NotificationType.ALL)
                    }
                    className={` h-7.5 w-12.5 rounded-2xl text-ft2  px-4 pt-1.5 cursor-pointer ${
                      selectedNotification === NotificationType.ALL
                        ? "bg-blue-50 text-Slate-200"
                        : "border border-grey-200 "
                    }`}
                  >
                    All
                  </div>
                  <div
                    onClick={() =>
                      setSelectedNotification(NotificationType.UNREAD)
                    }
                    className={` h-7.5 w-18  rounded-2xl text-ft2  px-4 pt-1.5 mr-3 cursor-pointer ${
                      selectedNotification === NotificationType.UNREAD
                        ? "bg-blue-50 text-Slate-200"
                        : "border border-grey-200 "
                    }`}
                  >
                    Unread
                  </div>
                </div>
              </div>
              <hr className="border-Slate-200" />
              {
                loading ? 
                <div className="noRecordFound">
                <CircularProgress color="#949CAE" />
              </div> : 
              loading == false && notifications?.length===0 ?
            <p className="noRecordFound">No data found</p>
            :
                <div className={showMore ? "overflow-auto h-151.5":"overflow-auto h-57.5" } >
                {notifications.map((item, index) => (
                  <div className="flex mt-6" key={index}>
                    <img
                      alt=""
                      className=" pl-5 pr-3"
                      src={notifications[index].title==="New Event Created"?"/images/ic-welcome.svg":notifications[index].title==="New Message"?"/images/ic-messagesnotif.svg":"/images/ic-alert.svg"}
                    />
                    <div className=" flex flex-col">
                      <div className="text-ft2 font-OpenSansSemiBold text-black-50 break-all">
                        {item.title}
                      </div>
                      <div className="text-ft2 font-OpenSansRegular text-darkGrey-100 break-all">
                        {" "}
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              }
            
              <hr className="border-Slate-200" />

              <div className=" border-t-0.25 flex justify-center border-grey-100 mt-6 pb-6 cursor-pointer">
                <div
                  className="bg-blue-50 h-10 w-62.5 flex justify-center items-center rounded-2xl text-ft2 text-Slate-100 "
                  onClick={() => setshowMore(!showMore)}
                >
                  {showMore 
                    ? "View less notifications"
                    : "View all notifications"}
                </div>
              </div>
            </div>
          )}
        </span>
        {connectWallet ? (
          <ConnectWallet
            connectWallet={connectWallet}
            setConnectWallet={setConnectWallet}
          />
        ) : null}
        <div
          onClick={() => setConnectWallet(true)}
          className=" flex border cursor-pointer items-center rounded-3xl h-9 my-4 w-42 px-5 py-2 mr-3 pt-2.5 border-grey-200 whitespace-nowrap"
        >
          <img
            alt=""
            className="pr-1 w-6 h-4"
            src="/images/ic-connectwallet.svg"
          />
          <p className=" font-OpenSansSemiBold text-blue-50 -mt-0.5  text-ft3 pl-2">
            {isConnected ? "Connected" : "Connect Wallet"}
          </p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isActive: state.sideBar.showSidebar,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  SetSidebar: (toggleSidebar) => {
    dispatch(handleSidebar(toggleSidebar));
  },
  updateKaikasDetails: (kaikasDetails) => {
    dispatch(updateKaikasDetails(kaikasDetails));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
