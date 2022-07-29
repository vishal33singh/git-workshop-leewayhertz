import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { Row, Column } from "simple-flexbox";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import Footer from "./footer";
import GameDetailPayment from "../gameDetailPayment";
import MyGames from "../myGames";
import MyEarnings from "../myEarning";
import Transaction from "../transactions";
import TransactionsDetailsCo from "../transactions/transactionsDetails";
import SponsoredGames from "../sponsoredGames";
import Dashboard from "../dashboard";
import SideDrawer from "../header/sideDrawer";
import { sideBarConstant, genericConstant } from "../../constants";
import Billboard from "../billboard/index";
import PlayGames from "../playGames/index";
import ComingSoon from "./comingSoon";
import SettingsComponents from "../setting";
import { sideBarConstant, genericConstant } from "../../constants";
function Componentshandler(props) {
  const [state, setState] = React.useState({
    menu: false,
  });
  const [sideDrawer, setSideDrawer] = React.useState(false);
  document.body.style.overflow = sideDrawer ? "hidden" : "unset";
  const pathName = window.location.pathname?.split("/");
  const activeMenu = pathName?.length ? pathName[pathName.length - 1] : "";
  const [selected, setSelected] = useState(0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  return (
    <Column>
      <Column
        className={`${
          window.location.pathname.split("/")[1] !== ""
            ? "w-full shadow-header z-40"
            : ""
        } mobile:w-full mobile:z-40 mobile:shadow-header`}
      >
        <Header
          handleChange={() => setState({ ...state, menu: !state.menu })}
          click={() => setSideDrawer(!sideDrawer)}
          sideDrawer={sideDrawer}
          selected={selected}
          setSelected={setSelected}
        />
      </Column>
      <Column>
        <SideDrawer
          check={sideDrawer}
          close={() => setSideDrawer(!sideDrawer)}
        />
        <div on></div>
      </Column>
      {pathName.length <= 2 ? (
        pathName[pathName.length - 1] === "" ? (
          <Column>
            <Billboard />
          </Column>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {/* //test commit  */}
      <Row
        className={
          pathName.length <= 2
            ? pathName[pathName.length - 1] === ""
              ? "pb-20 px-10% tablet:px-0 mobile:px-0"
              : "bg-greyColor px-10% tablet:px-0 mobile:px-0"
            : "bg-greyColor px-10% tablet:px-0 mobile:px-0"
        }
      >
        <div className="tablet:hidden mobile:hidden">
          {pathName.length > 2 ? (
            <Column>
              <Sidebar
                handleChange={() => setState({ ...state, menu: !state.menu })}
                check={sideDrawer}
                close={() => setSideDrawer(!sideDrawer)}
              />
            </Column>
          ) : (
            ""
          )}
        </div>
        <Column className="w-full">
          {pathName.length > 2 ? (
            pathName[pathName.length - 1] === `${sideBarConstant.MY_GAMES}` ? (
              <div className="bg-greyColor">
                <MyGames sideDrawer={sideDrawer} />
              </div>
            ) : pathName[pathName.length - 1] ===
              `${sideBarConstant.MY_EARNINGS}` ? (
              <MyEarnings />
            ) : pathName[pathName.length - 1] ===
              `${sideBarConstant.SPONSORED_GAME}` ? (
              <SponsoredGames />
            ) : pathName[pathName.length - 1] ===
              `${sideBarConstant.DASHBOARD}` ? (
              <Dashboard />
            ) : pathName[pathName.length - 1] ===
              `${sideBarConstant.TRANSACTIONS}` ? (
              <Transaction />
            ) : pathName[pathName.length - 1] ===
              `${sideBarConstant.QR_CODES}` ? (
              <SponsoredGames />
            ) : pathName[pathName.length - 1] ===
              `${sideBarConstant.SETTING}` ? (
              <SettingsComponents />
            ) : pathName[pathName.length - 1] ===
              `${sideBarConstant.TRANSACTIONS_DETAILS}` ? (
              <TransactionsDetailsCo />
            ) : (
              ""
            )
          ) : pathName[pathName.length - 1] === `${genericConstant.PLAY}` ? (
            <PlayGames />
          ) : pathName[pathName.length - 1] === `${genericConstant.RETAIL}` ? (
            <ComingSoon />
          ) : pathName[pathName.length - 1] ===
            `${genericConstant.COMMUNITY}` ? (
            <ComingSoon />
          ) : pathName[pathName.length - 1] === `${genericConstant.SPONSOR}` ? (
            <ComingSoon />
          ) : pathName[pathName.length - 1] ===
            `${genericConstant.COMING_SOON}` ? (
            <ComingSoon />
          ) : pathName[pathName.length - 1] ===
            `${genericConstant.GAME_DETAILS}` ? (
            <div className="tablet:ml-0 mobile:ml-0">
              <GameDetailPayment />
            </div>
          ) : (
            ""
          )}
        </Column>
      </Row>
      <Column>
        <Footer selected={selected} setSelected={setSelected} />
      </Column>
    </Column>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(Componentshandler);
