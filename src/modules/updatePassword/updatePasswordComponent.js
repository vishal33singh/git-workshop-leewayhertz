import React, { useState } from "react";
import Modal from "./modal";

function UpdatePasswordComponent(props) {
  const { handleChange, updatePassword, state } = props;
  const buttonColor =
    state.temperaryPassword && state.newPassword && state.confirmPassword
      ? "bg-blue-50"
      : "bg-darkGrey-50";

  const [temPassShow, setTemPassShow] = useState("password");
  const temPassVisible = () => {
    if (temPassShow === "password") {
      setTemPassShow("text");
    }
    if (temPassShow === "text") {
      setTemPassShow("password");
    }
  };
  const [newPassShow, setNewPassShow] = useState("password");
  const newPassVisible = () => {
    if (newPassShow === "password") {
      setNewPassShow("text");
    }
    if (newPassShow === "text") {
      setNewPassShow("password");
    }
  };
  const [conPassShow, setConPassShow] = useState("password");
  const conPassVisible = () => {
    if (conPassShow === "password") {
      setConPassShow("text");
    }
    if (conPassShow === "text") {
      setConPassShow("password");
    }
  };

  return (
    <div className=" bg-Slate-200 py-20 h-screen ">
      <div className="w-125 pb-6 bg-white text-center  m-auto rounded-lg px-5">
        <img src="/images/img-logo.png" alt="" className="mx-auto pt-12.5 " />
        {state.success ? (
          <Modal handleClose={() => handleChange("success", false)} />
        ) : null}
        <h1 className="text-ft7 font-OpenSansSemiBold pt-7.5">
          Update your password
        </h1>
        <p className="mt-1.5 ">Your Temporary password has been sent to your mail</p>

        <div className="bg-Slate-50 w-full mt-10 rounded-lg flex justify-between">
          <input
            type={temPassShow}
            placeholder="Temporary password"
            className="placeholder-black-50 py-5 text-ft4 bg-Slate-50 w-full  rounded-lg  pl-5 font-OpenSansRegular focus:outline-none"
            onChange={(eve) =>
              handleChange("temperaryPassword", eve.target.value)
            }
          />
          {temPassShow == "password"? (
            <img
              alt=""
              src="/images/Visible_Icon.svg"
              className={"pr-5"}
              onClick={temPassVisible}
              style={{width:"50px"}}

            />
          ) : (
            <img
              alt=""
              src="/images/ic-preview.svg"
              className={"pr-5"}
              onClick={temPassVisible}
            />          )}
        </div>
        <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between">
          <input
            type={newPassShow}
            placeholder="New password"
            className="placeholder-black-50 py-5 text-ft4 bg-Slate-50 w-full rounded-lg  pl-5  font-OpenSansRegular focus:outline-none"
            onChange={(eve) => handleChange("newPassword", eve.target.value)}
          />
          {newPassShow == "password"? (
            <img
              alt=""
              src="/images/Visible_Icon.svg"
              className={"pr-5"}
              onClick={newPassVisible}
              style={{width:"50px"}}

            />
          ) : (
            <img
              alt=""
              src="/images/ic-preview.svg"
              className={"pr-5"}
              onClick={newPassVisible}
            />          )}
        </div>
        <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between">
          <input
            type={conPassShow}
            placeholder="Confirm password"
            className="bg-Slate-50 w-full  rounded-lg py-5 text-ft4  pl-5  placeholder-darkGrey-100 font-OpenSansRegular focus:outline-none"
            onChange={(eve) =>
              handleChange("confirmPassword", eve.target.value)
            }
          />
          {conPassShow == "password"?(
            <img
              alt=""
              src="/images/Visible_Icon.svg"
              className={"pr-5"}
              onClick={conPassVisible}
              style={{width:"50px"}}
            />
          ) : (
            <img
              alt=""
              src="/images/ic-preview.svg"
              className={"pr-5"}
              onClick={conPassVisible}
            />
          )}
        </div>

        <button
          type="button"
          className={
            "mt-12.5 mb-6 flex h-17.5 items-center justify-center text-ft4  text-white w-full rounded-full font-OpenSansSemiBold " +
            buttonColor
          }
          onClick={() => {
            updatePassword();
          }}
          disabled={
            !state.temperaryPassword ||
            !state.newPassword ||
            !state.confirmPassword
          }
        >
          Update password
        </button>
        <div style={{color:"red"}}>{state.error}</div> 
      </div>
    </div>
  );
}

export default UpdatePasswordComponent;
