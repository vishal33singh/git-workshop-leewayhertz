import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Model from "../common/model";
function LoginComponent(props) {
  const {
    state,
    onChangeEvent,
    onLoginClicked,
    handleRememberMe,
    reSendVerificationMail,
  } = props;

  // const buttonColor =
  //   "grid place-items-center mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold";

  const [showEmailIcon, setShowEmailIcon] = useState(false);
  const [showPassIcon, setShowPassIcon] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [buttonColor, setbuttonColor] = useState(
    "grid place-items-center bg-darkGrey-50 mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold"
  );

  const [iconState, setIconState] = useState(false);
  const [passShow, setPassShow] = useState("password");
  const passVisible = () => {
    if (passShow === "password") {
      setPassShow("text");
      setIconState(true);
    }
    if (passShow === "text") {
      setPassShow("password");
      setIconState(false);
    }
  };

  useEffect(() => {
    if (state.email) setShowEmailIcon(true);
    else setShowEmailIcon(false);
  }, [state.email]);

  useEffect(() => {
    if (state.password) setShowPassIcon(true);
    else setShowPassIcon(false);
  }, [state.password]);

  useEffect(() => {
    if (state?.email && state?.password) {
      setbuttonColor(
        "bg-blue-50 mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold"
      );
      setDisabled(false);
    } else {
      setbuttonColor(
        "bg-darkGrey-50 mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold"
      );
      setDisabled(true);
    }
  }, [state?.email && state?.password]);

  const emailClear = () => {
    onChangeEvent("email", "");
  };

  return (
    <div className=" bg-Slate-200 pt-28 h-screen ">
      <div className="w-125  bg-white text-center  m-auto rounded-lg px-5  pb-12.5">
        <img src="/images/img-logo.png" alt="" className="mx-auto pt-12.5 " />
        <h1 className="text-ft7 font-OpenSansSemiBold pt-7.5">
          Login with nft ticketing
        </h1>

        <Model
          title="Resend Verification Mail"
          handleClose={() => reSendVerificationMail()}
          message="Your email is not verified"
          open={state.modal}
        />
        <div className="bg-Slate-50 w-full mt-10 rounded-lg flex justify-between">
          <input
            type="email"
            value={state && state.email}
            placeholder="Email Address"
            className=" py-5 pl-5 text-ft4 w-full rounded-lg  bg-Slate-50 placeholder-darkGrey-100 text-black-50 font-OpenSansRegular focus:outline-none"
            onChange={(ev) => onChangeEvent("email", ev.target.value)}
            error={state ? state.emailError : ""}
          />
          <img
            alt=""
            src="/images/ic-clear.svg"
            className={`pr-5 ${!showEmailIcon && "hidden"}`}
            onClick={emailClear}
          />
        </div>
        <div style={{ color: "red" }}>{state?.emailError}</div>
        <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between items-center">
          <input
            type={passShow}
            value={state && state.password}
            placeholder="Password"
            className="bg-Slate-50 w-full rounded-lg py-5 text-ft4  pl-5 placeholder-darkGrey-100  text-black-50 font-OpenSansRegular focus:outline-none"
            onChange={(ev) => onChangeEvent("password", ev.target.value)}
            error={state ? state.passwordError : ""}
          />

          <img
            alt=""
            src={
              iconState
                ? "/images/ic-preview.svg"
                : "/images/ic-preview-1@2x.png"
            }
            className={`pr-5 ${!showPassIcon && "hidden "} w-11.25 h-6.5 `}
            onClick={passVisible}
          />
        </div>
        <div style={{ color: "red" }}>{state?.passwordError}</div>

        <div className="flex justify-between flex-row pt-7.5">
          <div className=" flex">
            <input
              type="checkbox"
              className="w-5 h-5 "
              value={state.rememberMe}
              onChange={(ev) => handleRememberMe(ev.target.checked)}
            />
            <p className="font-OpenSansRegular text-ft4 text-darkGrey-100 pl-2.5">
              Remember me
            </p>
          </div>
          <p className="font-OpenSansRegular text-ft4 text-darkGrey-100 ">
            <Link to="/forget-password">Forgot password?</Link>
          </p>
        </div>
        {state.passwordError ? (
          <div className="error">{state.passwordError ? <br /> : ""}</div>
        ) : (
          <div className="errorBox">{state.passwordError ? <br /> : ""}</div>
        )}
        <button
          type="submit"
          // className={`${buttonColor} ${(showEmailIcon && showPassIcon) ? "bg-blue-50" : "bg-darkGrey-50"}`}
          onClick={(e) => onLoginClicked(e)}
          disabled={disabled}
          className={buttonColor}
        >
          {state.isLoading ? <div className="loader "></div> : "Sign in"}
        </button>
        {/* {state.passwordError} */}
        {/*<p className="mt-12.5 text-ft4 font-OpenSansRegular pb-12.5">*/}
        {/*  Don't have an account?{" "}*/}
        {/*  <Link*/}
        {/*    to="/create-account"*/}
        {/*    className="font-OpenSansSemiBold text-blue-50 underline"*/}
        {/*  >*/}
        {/*    I want to create an account*/}
        {/*  </Link>*/}
        {/*</p>*/}
      </div>
    </div>
  );
}

export default LoginComponent;
