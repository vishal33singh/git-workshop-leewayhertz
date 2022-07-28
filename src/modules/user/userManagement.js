import React from "react";
import Pagination from "../common/pagination";
import { SearchInput } from "../common/search";
import UserData from "./userData";
import CommonImages from "../common/commonImages";
import Model from "./modal";
import AdminData from "./adminData";
import CircularProgress from "material-ui/CircularProgress";
import AddAndUpdateDialog from "./addAndUpdateDialog";
import { RoleConstant } from "../../constants";
import { UserModel } from "../../models/user";
import { useState, useEffect } from "react";
import { ExportToCsv } from "export-to-csv";

function UserManagement(props) {
  const {
    state,
    user,
    searchUser,
    handleChange,
    getListByPage,
    blockUser,
    sortByName,
    deleteUser,
    onEditClick,
    updateUser,
    addAdminUser,
  } = props;
  const sortByNameHandler = () => {
    const sorted = state.buyers.sort((a, b) =>
      a.buyer.name.toLowerCase() > b.buyer.name.toLowerCase() ? 1 : -1
    );
    sortByName(sorted);
  };

  const [element, setElement] = useState(<CircularProgress color="#395FF1" />);
  useEffect(() => {
    setTimeout(() => {
      setElement("No Record Found");
    }, 5000);
  }, []);

  return (
    <div className="bg-Slate-200 p-12.5 flex flex-col min-h-screen">
      {state.showEditAddModel ? (
        <AddAndUpdateDialog
          state={state}
          open={state.showEditAddModel}
          updateUser={updateUser}
          addAdminUser={addAdminUser}
          handleChange={handleChange}
          handleClose={() => handleChange("showEditAddModel", false)}
        />
      ) : null}
      <div className=" text-ft8 font-OpenSansSemiBold text-left text-black-50">
        User Management
      </div>
      <div className="flex justify-between items-center">
        <ul
          className="flex flex-wrap -mb-px text-ft4 text-left border-b-3 border-grey-50 w-77"
          role="tablist"
        >
          <li className="">
            <button
              onClick={() => handleChange("selectedTab", "USERS")}
              className={`inline-block text-left mt-7.5 -mb-1 pb-6.25   w-36 ${
                state.selectedTab === "USERS"
                  ? "border-b-3   text-blue-50 border-transparent border-blue-50"
                  : ""
              }`}
            >
              Sales by Customer
            </button>
          </li>
          <li className="">
            <button
              onClick={() => handleChange("selectedTab", "ADMINS")}
              className={`inline-block text-left mt-7.5 -mb-1 pb-6.25 ml-8 pl-1 w-32 ${
                state.selectedTab === "ADMINS"
                  ? "border-b-3 text-blue-50 border-transparent border-blue-50"
                  : ""
              }`}
            >
              Sub Organizers
            </button>
          </li>
        </ul>
        {state && state.selectedTab === "ADMINS" ? (
          user.role === RoleConstant.ORGANISER ? (
            <button
              onClick={() => {
                handleChange("showEditAddModel", true);
                handleChange("selectedSubOrganiser", new UserModel());
              }}
              className="flex items-center h-12.5 w-53.75 font-OpenSansSemiBold text-ft3 text-white bg-blue-50 rounded-full "
            >
              <img
                alt=""
                src="/images/ic-create.svg"
                className=" pr-2.5  pl-7 "
              />
              Add Sub Organizers
            </button>
          ) : (
            ""
          )
        ) : (
          <button
            onClick={() => {
              const data = state.buyers.map((data) => {
                return {
                  Name: data.buyer.name,
                  Email: data.buyer.email,
                  Phone: data.buyer.phone,
                  Event: data.event.name,
                  "Ticket Type": data.ticket.type,
                  "No of Tickets": data.noOfTickets,
                };
              });

              const options = {
                fieldSeparator: ",",
                quoteStrings: '"',
                decimalSeparator: ".",
                showLabels: true,
                showTitle: true,
                title: "Sales by Customer",
                useTextFile: false,
                useBom: true,
                useKeysAsHeaders: true,
                filename: "CustomerData",
                // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
              };

              const csvExporter = new ExportToCsv(options);
              csvExporter.generateCsv(data);
            }}
            className="flex items-center h-12.5 px-3 font-OpenSansSemiBold text-ft3 text-white bg-blue-50 rounded-full "
          >
            Export Users
          </button>
        )}
      </div>

      <div className="flex justify-between items-center mt-10">
        <SearchInput
          value={state.searchQuery}
          onSubmit={searchUser}
          handleChange={handleChange}
        />
      </div>
      <div className="rounded-xl bg-white drop-shadow-md pb-3.75 pt-3.75 mt-7.5 w-full overflow-auto">
        <table className="w-full h-129.75">
          <tbody className=" rounded-xl bg-white drop-shadow-md  w-full ">
            {state.selectedTab === "USERS" && (
              <tr
                onClick={sortByNameHandler}
                className="h-19.75 w-full pl-7.5  pr-12.5   flex justify-between items-center border-b border-grey-50 text-left "
              >
                <CommonImages
                  className=" w-15per truncate break-all"
                  handleSorting={() => handleChange("sortingKey", "buyer.name")}
                  title="Name"
                  classes="w-15per whitespace-nowrap font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className=" w-15per"
                  handleSorting={() => handleChange("sortingKey", "event.name")}
                  title="Event"
                  classes="w-15per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className=" w-15per"
                  handleSorting={() =>
                    handleChange("sortingKey", "buyer.email")
                  }
                  title="Email"
                  classes="w-15per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className=" w-15per"
                  handleSorting={() =>
                    handleChange("sortingKey", "buyer.phone")
                  }
                  title="Mobile Number"
                  // required={true}
                  classes="w-15per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className=" w-15per"
                  handleSorting={() =>
                    handleChange("sortingKey", "ticket.type")
                  }
                  title="Ticket Type"
                  classes="w-15per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className=" w-15per"
                  handleSorting={() =>
                    handleChange("sortingKey", "numberOfTickets")
                  }
                  title="Quantity"
                  classes="w-10per whitespace-nowrap font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className=" w-15per"
                  handleSorting={() =>
                    handleChange("sortingKey", "ticket.price")
                  }
                  title="Price"
                  classes="w-10per whitespace-nowrap font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                {/*<CommonImages*/}
                {/*  title="Action"*/}
                {/*  required={true}*/}
                {/*  classes="font-OpenSansSemiBold text-ft3 text-black-50 "*/}
                {/*/>*/}
              </tr>
            )}
            {state.selectedTab === "ADMINS" && (
              <tr
                onClick={sortByNameHandler}
                className="h-19.75 w-full pl-7.5  pr-12.5  flex justify-between items-center border-b border-grey-50 text-left "
              >
                <CommonImages
                  className="w-15per break-all truncate"
                  handleSorting={() => handleChange("sortingKey", "name")}
                  title="Name"
                  classes="w-15per whitespace-nowrap font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className="3xl:w-25per w-15per break-all truncate"
                  handleSorting={() => handleChange("sortingKey", "email")}
                  title="Email"
                  classes="w-15per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                <CommonImages
                  className="w-15per break-all truncate"
                  handleSorting={() => handleChange("sortingKey", "phone")}
                  title="Mobile Number"
                  // required={true}
                  classes="w-15per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50 "
                />
                {user?.role === RoleConstant.ORGANISER ? (
                  <CommonImages
                    className="w-15per break-all truncate"
                    handleSorting={() =>
                      handleChange("sortingKey", "permissions")
                    }
                    title="Permissions"
                    classes="w-17.2per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50 "
                  />
                ) : (
                  <CommonImages
                    className="w-15per break-all truncate"
                    handleSorting={() =>
                      handleChange("sortingKey", "permissions")
                    }
                    title="Permissions"
                    classes="w-15per whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50"
                  />
                )}
                {user?.role === RoleConstant.ORGANISER && (
                  <td className=" whitespace-nowrap	font-OpenSansSemiBold text-ft3 text-black-50">
                    Action
                  </td>
                )}
              </tr>
            )}
            {state && state.selectedTab === "USERS" && state.buyers.length
              ? state.buyers.map((item, index) => (
                  <UserData
                    key={index}
                    item={item}
                    blockUser={blockUser}
                    state={state}
                    handleChange={handleChange}
                  />
                ))
              : state.selectedTab === "USERS" && (
                  <div className="noRecordFound pt-32"> {element}</div>
                )}
            {state && state.selectedTab === "ADMINS" && state.admins?.length
              ? state.admins.map((item, index) => (
                  <AdminData
                    key={index}
                    item={item}
                    deleteUser={deleteUser}
                    onEditClick={onEditClick}
                    state={state}
                    user={user}
                    handleChange={handleChange}
                  />
                ))
              : state.selectedTab === "ADMINS" && (
                  <div className="noRecordFound pt-32">{element}</div>
                )}
          </tbody>
        </table>
        {state.openConfimation ? (
          <Model
            selectedUser={state.selectedUser}
            open={state.openConfimation}
            blockUser={blockUser}
            handleChange={handleChange}
          />
        ) : null}
      </div>
      <div
        style={{ display: state.buyers.length === 0 ? "none" : "" }}
        className="mb-10"
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
          numberOfItems={state?.buyers?.length}
        />{" "}
      </div>
    </div>
  );
}

export default UserManagement;
