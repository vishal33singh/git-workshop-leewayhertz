import React from "react";
import Model from "../common/model";
import { Link } from "react-router-dom";

function ForgetPasswordComponent(props) {
  const { handleChange, state, sendForgetPasswordRequest } = props;
  const buttonColor = state.email ? "bg-blue-50" : "bg-darkGrey-50";

  const emailClear = () => {
    handleChange("email", "");
  };

  return (
    <div className=" bg-Slate-200 pb-20 pt-45 h-screen">
      <div className="w-125 pb-6 bg-white text-center  m-auto rounded-lg px-5">
        {" "}
        <img
          src="/images/img-logo.png"
          alt=""
          className="mx-auto pt-12.5 "
        ></img>
        <h1 className="text-ft7 font-OpenSansSemiBold pt-7.5">
          Forgot Password
        </h1>
        <p className="pt-2.5 font-OpenSansRegular text-ft4 text-darkGrey-100 px-16.75">
          Enter your email below to receive your password reset instructions
        </p>
        <Model
          title={"Success!"}
          message={"We have sent a link to update password"}
          handleClose={() => handleChange("success", false)}
          open={state.success}
        />
        <div className="bg-Slate-50 w-full mt-10 rounded-lg flex justify-between">
          <input
            placeholder="Email Address"
            type="email"
            value={state && state.email}
            className="placeholder-darkGrey-100 py-5 text-ft4 bg-Slate-50 w-full  rounded-lg  pl-5 font-OpenSansRegular focus:outline-none"
            onChange={(ev) => handleChange("email", ev.target.value)}
            error={state ? state.emailError : ""}

          ></input>
          {state.email ? (
            <img
              alt=""
              src="images/ic-clear.svg"
              className={"pr-5 "}
              onClick={emailClear}
            />
          ) : (
            ""
          )}
        </div>
        <div style={{ color: "red" }}>{state?.emailError}</div>

        <button
          type="button"
          className={
            "mt-12.5 mb-6 flex h-17.5 items-center justify-center text-ft4  text-white w-full rounded-full font-OpenSansSemiBold " +
            buttonColor
          }
          onClick={() => sendForgetPasswordRequest()}
          disabled={!state.email}
        >
          Send  
        </button>
        <p className="mt-12.5 text-ft4 font-OpenSansRegular pb-12.5">
          <Link
            to="/"
            className="font-OpenSansSemiBold text-blue-50 underline"
          >
         I already have an account         
         </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPasswordComponent;
