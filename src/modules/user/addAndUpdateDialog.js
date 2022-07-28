import React, { useState } from "react";
import { AdminRoles } from "../../constants";
import { UserModel } from "../../models/user";
import { Dialog } from "@material-ui/core";
import Utils from "../../utility";

export default function AddAndUpdateDialog({
  state,
  updateUser,
  handleChange,
  open,
  addAdminUser,
}) {
  const { selectedSubOrganiser } = state;
  const handlePermissionChange = (checked, permission) => {
    let user = selectedSubOrganiser;
    if (!checked) {
      let index = user.permissions.findIndex((item) => item === permission);
      user.permissions.splice(index, 1);
    } else user.permissions.push(permission);
    handleChange("selectedSubOrganiser.permissions", user.permissions);
  };
  const handleClose = () => {
    handleChange("showEditAddModel", false);
    handleChange("selectedSubOrganiser", new UserModel());
    if (state.isEdit) {
      handleChange("isEdit", false);
    }
  };
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobError, setMobError] = useState("");
  const [perError, setPerError] = useState("");

  function validateInformation() {
    let nameError = !selectedSubOrganiser?.name ? "Enter the name" : "";
    let emailError =
      !selectedSubOrganiser?.email ||
      !Utils.validateEmail(selectedSubOrganiser?.email)
        ? "Enter valid email address"
        : "";
    let mobError =
      !selectedSubOrganiser?.phone ||
      !Utils.validatePhone(selectedSubOrganiser?.phone)
        ? "Enter the Phone no"
        : "";
    let perError = !selectedSubOrganiser?.permissions.length
      ? "Select At Least One Feature"
      : "";
    setNameError(nameError);
    setEmailError(emailError);
    setMobError(mobError);
    setPerError(perError);
    if (mobError || emailError || nameError || perError) {
      return false;
    }
    return true;
  }

  // const CHARACTER_LIMIT = 20;
  function validateAndSaveUser() {
    if (!validateInformation()) {
      return;
    }
    if (state.isEdit) {
      updateUser();
    } else {
      addAdminUser();
    }
  }

  return (
    <Dialog
      className="  bg-white bg-opacity-5 flex justify-center pt-12.5  "
      open={open}
      handleClose={() => handleClose()}
    >
      <div className="h-auto  w-auto  bg-white rounded-lg px-5 py-5 ">
        <div className="flex flex-row  mt-8">
          <h1 className="text-ft6 font-semibold  ml-50">
            {state.isEdit ? "Update User" : "Add Sub Organizers"}
          </h1>
          <button className="ml-40" onClick={() => handleClose()}>
            <img alt="close-icon" src="/images/ic-close.svg" />
          </button>
        </div>
        <div>
          <h1 className="mt-10 font-ft3 text-left font-OpenSansSemiBold  text-darkGrey-50">
            Full Name
          </h1>
          <input
            type="text"
            placeholder="Enter the full name"
            className="mt-3.75 w-139.25  h-11.25  rounded-lg border-grey-400 border focus:outline-none pl-3 "
            value={selectedSubOrganiser?.name}
            onChange={(event) => {
              handleChange("selectedSubOrganiser.name", event.target.value);
              setNameError();
            }}
            maxLength={20}
          />
          {nameError && <div className="errorMessage">{nameError}</div>}
        </div>
        <div className="flex mt-10">
          <div>
            <h1 className="font-ft3 text-left text-darkGrey-50 font-OpenSansSemiBold ">
              Email Address
            </h1>
            <input
              type="text"
              placeholder="Enter the email address"
              className="mt-3 w-67.5 mr-4 h-11.25 rounded-lg border-grey-400 border focus:outline-none pl-3"
              value={selectedSubOrganiser?.email}
              onChange={(event) => {
                handleChange(
                  "selectedSubOrganiser.email",
                  event.target.value.toLowerCase()
                );
                setEmailError();
              }}
              maxLength={200}
            />
            {emailError && <div className="errorMessage">{emailError}</div>}
          </div>
          <div>
            <h1 className="font-ft3 text-left text-darkGrey-50 font-OpenSansSemiBold ">
              Mobile Number
            </h1>
            <input
              pattern="[1-9]*"
              type="text"
              placeholder="Enter the mobile number"
              className="mt-3  w-67.5 h-11.25  rounded-lg border-grey-400 border focus:outline-none pl-3"
              value={selectedSubOrganiser?.phone}
              onChange={(event) => {
                handleChange(
                  "selectedSubOrganiser.phone",
                  event.target.value.replace(/\D/, "")
                );
                setMobError();
              }}
              maxLength={14}
            />

            {mobError && <div className="errorMessage">{mobError}</div>}
          </div>
        </div>
        <div>
          <h1 className="mt-6 min-w-min text-ft4 font-OpenSansSemiBold text-black-50 ">
            Features
          </h1>
          <p1 className="mt-2.5 text-ft3 w-auto text-darkGrey-100 font-OpenSansRegular">
            Choose which features the user has access to
          </p1>
        </div>
        {/* checkbox section */}
        <div className="flex mt-7.5 ">
          <div className="flex w-auto">
            <input
              type="checkbox"
              className="w-5 h-5 checked"
              checked={selectedSubOrganiser?.permissions.includes(
                AdminRoles.DASHBOARD
              )}
              onChange={(event) => {
                handlePermissionChange(
                  event.target.checked,
                  AdminRoles.DASHBOARD
                );
                setPerError();
              }}
            />
            <h1 className="ml-2.5 text-ft3 text-left font-OpenSansRegular  ">
              Dashboard
            </h1>
          </div>
          <div className="flex ml-5">
            <input
              type="checkbox"
              className="w-5 h-5 checked"
              checked={selectedSubOrganiser?.permissions.includes(
                AdminRoles.MESSAGE
              )}
              onChange={(event) =>
                handlePermissionChange(event.target.checked, AdminRoles.MESSAGE)
              }
            />
            <h1 className="ml-2.5 text-ft3 text-left font-OpenSansRegular  ">
              Messages
            </h1>
          </div>
          <div className="flex ml-5">
            <input
              type="checkbox"
              className="w-5 h-5 checked"
              checked={selectedSubOrganiser?.permissions.includes(
                AdminRoles.EVENTS
              )}
              onChange={(event) =>
                handlePermissionChange(event.target.checked, AdminRoles.EVENTS)
              }
            />
            <h1 className="ml-2.5 text-ft3 text-left font-OpenSansRegular  ">
              Events
            </h1>
          </div>
        </div>
        {perError && <div className="errorMessage">{perError}</div>}
        <div className="flex justify-center my-10">
          <div className="border rounded-full border-grey-400 mt-8  w-50 h-17.5">
            <p
              className=" text-center mt-5 text-ft4 font-OpenSansSemiBold cursor-pointer text-black-50"
              onClick={() => handleClose()}
            >
              Cancel
            </p>
          </div>
          <div className="border rounded-full border-grey-400 bg-blue-50 mt-8 ml-5 w-50 h-17.5 ">
            <p
              onClick={() => validateAndSaveUser()}
              className="text-center mt-5 text-ft4 font-OpenSansSemiBold text-white cursor-pointer"
            >
              {state.isEdit ? "Update" : "Add"}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
