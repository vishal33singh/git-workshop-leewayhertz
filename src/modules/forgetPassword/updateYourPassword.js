import React, { useState } from "react";
import Modal from "./modal";

function UpdateYourPassword() {
  const [modalShow, setModalShow] = useState(false);
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
  const [buttonColor, setbuttonColor] = useState(
    "bg-darkGrey-50 mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold mb-12.5"
  );
  const [iconShown, setIconShown] = useState("pr-5 hidden");

  const handleInput = () => {
    if (
      buttonColor ===
      "bg-darkGrey-50 mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold mb-12.5"
    ) {
      setbuttonColor(
        "bg-blue-50 mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold mb-12.5"
      );
    }
    if (iconShown === "pr-5 hidden") {
      setIconShown("pr-5 block cursor-pointer");
    }
  };
  return (
    <div className=" bg-Slate-200 py-20 h-screen">
      <div className="w-125  bg-white text-center  m-auto rounded-lg px-5 ">
        <img
          src="/images/img-logo.png"
          alt=""
          className="mx-auto pt-12.5 "
        ></img>
        {modalShow ? <Modal /> : null}
        <h1 className="text-ft7 font-OpenSansSemiBold pt-7.5">
          Update your password
        </h1>
        <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between">
          <input
            type={newPassShow}
            placeholder="New password"
            className="placeholder-black-50 py-5 text-ft4 bg-Slate-50 w-full rounded-lg  pl-5  font-OpenSansRegular focus:outline-none"
            onInput={handleInput}
          ></input>
          <img
            alt=""
            src="/images/ic-preview.svg"
            className={iconShown}
            onClick={newPassVisible}
          ></img>
        </div>
        <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between">
          <input
            type={conPassShow}
            placeholder="Confirm password"
            className="bg-Slate-50 w-full  rounded-lg py-5 text-ft4  pl-5  placeholder-black-50 font-OpenSansRegular focus:outline-none"
            onInput={handleInput}
          ></input>
          <img
            alt=""
            src="/images/ic-preview.svg"
            className={iconShown}
            onClick={conPassVisible}
          ></img>
        </div>

        <button
          className={buttonColor}
          onClick={() => {
            setModalShow(true);
          }}
        >
          Update password
        </button>
      </div>
    </div>
  );
}

export default UpdateYourPassword;
