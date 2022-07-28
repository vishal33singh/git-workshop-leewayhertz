import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { AdminPermissions, Pages } from "../../constants";
import Utility, { dispatchAction } from "../../utility";

function Sidebar(props) {
  const { state } = props;
  const showSidebar = useSelector((state) => state.sideBar.showSidebar);
  const currentURL = window.location.pathname;
  const [icon, setIcon] = useState("1");
  const [path, setPath] = useState("")

  const location = useLocation()

  let urlCheck = [
    "/dashboard/events",
    "/dashboard/create-event",
  ];

  useEffect(() => {
   setPath(location.pathname)
  }, [location])
  
  return (
    <>
      {!showSidebar ? (
        <div className="  flex flex-col w-72 h-100per">
          <div className="w-30 h-30 flex rounded-50per overflow-hidden mt-15 ml-auto mr-auto">
            <img
              alt="org"
              className="m-auto h-full w-full"
              src={
                state.userDetails &&
                state.userDetails.organization &&
                state.userDetails.organization.image
                  ? state.userDetails.organization.image
                  : "/images/img-placeholder.svg"
              }
            />
          </div>
          <h1 className="text-ft4 font-OpenSansRegular text-black-50 mt-4 ml-auto mr-auto ">
            {state.userDetails &&
            state.userDetails.organization &&
            state.userDetails.organization.name.length > 16
              ? `${state.userDetails?.organization.name?.slice(0, 16)}...`
              : state.userDetails.organization.name}
          </h1>
          <div className="sidebar mt-7.75">
            {Utility.checkPermission(
              AdminPermissions.DASHBOARD,
              props.user
            ) && (
              <NavLink to={Pages.DASHBOARD}>
                <div
                  className={
                    path === Pages.DASHBOARD
                      ? "pt-4 pb-4 mb-2 border-blue-50 border-l-4 menu-item"
                      : "pt-4 pb-4 mb-2 border-blue-50 border-l-4 ml-1.25"
                  }
                  onClick={() => setIcon("1")}
                >
                  <div className="space-x-2 flex text-ft3 font-OpenSansSemiBol ">
                    <img
                      alt=""
                      className="pl-6 pr-5 "
                      src="/images/ic-statistics.svg"
                    />
                    <p className="font-OpenSans text-ft3 cursor-pointer ">
                      Dashboard
                    </p>
                  </div>
                </div>
              </NavLink>
            )}

            {Utility.checkPermission(AdminPermissions.EVENTS, props.user) && (
              <NavLink
                to={Pages.EVENTS}
              >
                <div
                  className={
                    urlCheck.includes(path)
                      ? "pt-4 pb-4 mb-2 border-blue-50 border-l-4 menu-item"
                      : "pt-4 pb-4 mb-2 border-blue-50 border-l-4 ml-1.25"
                  }
                  onClick={() => setIcon("2")}
                >
                  <div className="space-x-2 flex text-ft3 font-OpenSansSemiBol ">
                    <img
                      alt=""
                      className="pl-6 pr-5"
                      src="/images/ic-events.svg"
                    />
                    <p className="font-OpenSans text-ft3 cursor-pointer ">
                      Events
                    </p>
                  </div>
                </div>
              </NavLink>
            )}
            {Utility.checkPermission(AdminPermissions.MESSAGE, props.user) && (
              <NavLink to={Pages.MESSAGE}>
                <div
                  className={
                    path === Pages.MESSAGE
                      ? "pt-4 pb-4 mb-2 border-blue-50 border-l-4 menu-item"
                      : "pt-4 pb-4 mb-2 border-blue-50 border-l-4 ml-1.25"
                  }
                  onClick={() => setIcon("3")}
                >
                  <div className="space-x-2 flex text-ft3 font-OpenSans ">
                    <img
                      alt=""
                      className="pl-6 pr-5"
                      src="/images/ic-messages.svg"
                    />
                    <p className="font-OpenSans text-ft3 cursor-pointer">
                      Messages
                    </p>
                  </div>
                </div>
              </NavLink>
            )}
            <NavLink to={Pages.USER_MANAGEMENT}>
              <div 
                className={
                 path === Pages.USER_MANAGEMENT
                    ? "pt-4 pb-4 mb-2 border-blue-50 border-l-4 menu-item"
                    : "pt-4 pb-4 mb-2 border-blue-50 border-l-4 ml-1.25"
                }
                onClick={() => setIcon("4")}
              >
                <div className="space-x-2 flex text-ft3 font-OpenSansSemiBol ">
                  <img
                    alt=""
                    className="pl-6 pr-5"
                    src="/images/ic-usermanagement.svg"
                  />
                  <p className="font-OpenSans text-ft3 cursor-pointer ">
                    User Management
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="pt-96 pl-9  flex">
          <div className="font-OpenSansSemiBold text-ft6 text-black-50">Powered by </div>
          <img className="w-29 ml-1 " src="/images/logo-powered-by.png"></img>
          </div>
        </div>
      ) : (
        <>
          {" "}

          <div className="flex flex-col w-25">
            <div className="w-10 h-10 flex rounded-50per overflow-hidden mt-2.5 ml-auto mr-auto ">
              <img
                alt="org"
                className="m-auto h-full w-full"
                src={
                  state.userDetails &&
                  state.userDetails.organization &&
                  state.userDetails.organization.image
                    ? state.userDetails.organization.image
                    : "/images/img-placeholder.svg"
                }
              />
            </div>

            <div className="mt-10">
              {Utility.checkPermission(
                AdminPermissions.DASHBOARD,
                props.user
              ) && (
                <NavLink to={Pages.DASHBOARD} activeClassName="bg-Slate-100" className="block  pt-4 pb-4 mb-4  border-l-4 hover:border-blue-50 hover:bg-Slate-100 ">
                  <div className="space-x-2 flex text-ft3 font-OpenSansSemiBol ">
                    <img
                      alt=""
                      className="pl-8 pr-5"
                      src="/images/ic-statistics.svg"
                    />
                  </div>
                </NavLink>
              )}
              {Utility.checkPermission(AdminPermissions.EVENTS, props.user) && (
                <NavLink 
                  to={Pages.EVENTS}
                >
                  <div className={`pt-4 pb-4 mb-4  border-l-4 border-white hover:border-l-4 hover:border-blue-50 hover:bg-Slate-100 ${urlCheck.includes(path) && "bg-Slate-100"}`}>
                    <div className="space-x-2 flex text-ft3 font-normal ">
                      <img
                        alt=""
                        className="pl-8 pr-5"
                        src="/images/ic-events.svg"
                      />
                    </div>
                  </div>
                </NavLink>
              )}
              {Utility.checkPermission(
                AdminPermissions.MESSAGE,
                props.user
              ) && (
                  <NavLink to={Pages.MESSAGE} activeClassName="bg-Slate-100 " className="block pt-4 pb-4 border-l-4 border-white hover:border-l-4 hover:border-blue-50 hover:bg-Slate-100  ">
                    <div className="space-x-2 flex text-ft3 font-normal ">
                      <img
                        alt=""
                        className="pl-8 pr-5"
                        src="/images/ic-messages.svg"
                      />
                    </div>
                </NavLink>
              )}

              <NavLink  
                activeClassName="bg-Slate-100" 
                to={Pages.USER_MANAGEMENT} 
                className="block pt-4 mt-2 pb-4 border-l-4 border-white hover:border-l-4 hover:border-blue-50 hover:bg-Slate-100  "
              >
                  <div className="space-x-2 flex text-ft3 font-normal ">
                    <img
                      alt=""
                      className="pl-8 pr-5"
                      src="/images/ic-usermanagement.svg"
                    />
                </div>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user?.userDetails,
  };
};
export default connect(mapStateToProps, { dispatchAction })(Sidebar);
