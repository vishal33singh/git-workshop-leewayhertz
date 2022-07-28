import React from "react";
import { Pages } from "../constants";
import Dashboard from "./dashboard";
import Account from "./accountSetting";
import Events from "./event";
import Header from "./header/header";
import Sidebar from "./sidebar";
import CreateEvent from "./createEvent";
import UserManagement from "./user";
import { Row, Column } from "simple-flexbox";
import EventDetail from "./eventDetail";
import Messages from "./messages";

export default function ComponentHandler(props) {
  const activePage = window.location.pathname;
  return (
    <>
      <Row className="w-100per">
        <Column className="h-100per">
          <Sidebar />
        </Column>

        <Column className="w-100per h-100per">
          <Column className="w-100per shadow-sidebar">
            <Header />
          </Column>
          <Column className="h-100per bg-Slate-200 flex flex-col min-h-screen shadow-sidebar">
            {activePage === Pages.DASHBOARD ? <Dashboard /> : ""}
            {activePage === Pages.USER_MANAGEMENT ? <UserManagement /> : ""}
            {activePage === Pages.EVENTS ? <Events /> : ""}
            {activePage === Pages.ACCOUNT_SETTING ? <Account /> : ""}
            {activePage === Pages.MESSAGE ? <Messages /> : ""}
            {activePage === Pages.CREATE_EVENT ? <CreateEvent /> : ""}
            {activePage.includes(Pages.EVENTS) &&
            activePage.split("/").length === 4 ? (
              <EventDetail />
            ) : (
              ""
            )}
          </Column>
        </Column>
        {/* <Dashboard /> */}
      </Row>
      {/*<div>*/}
      {/*  {activePage === Pages.CREATE_EVENT ? <FooterNextButton/> : ""}*/}
      {/*</div>*/}
    </>
  );
}
