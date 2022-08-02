import React, { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sideBar/sidebar";
import Dashboard from "../dashBoard/dashboard";
import WhiteList from "../whitelistComponent/whiteList";
import Events from "../eventComponent/event";

function Componentshandler(props) {
  const pathName = window.location.pathname?.split("/");
  const activeMenu = pathName?.length ? pathName[pathName.length - 1] : "";

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full bg-lightGrey-25">
        <div>
          <Header />
        </div>
        <div>
          {pathName.length > 1 ? (
            activeMenu === `dash-board` ? (
              <Dashboard />
            ) : activeMenu === `events` ? (
              <Events />
            ) : activeMenu === `white-list` ? (
              <WhiteList />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Componentshandler;
