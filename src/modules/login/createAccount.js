import React, { useState } from "react";
import Modal from "./modal";
import { Link } from "react-router-dom";
import Utils from "../../utility";
import { Pages, RoleConstant } from "../../constants";
import { signUp, resendEmailVerification } from "../../services/user";
import { history } from "../../managers/history";
import { eventConstants } from "../../constants";
import { CircularProgress } from "@material-ui/core";
import {useDispatch} from "react-redux"
function CreateAccount() {
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const buttonColor =
    name && email && organizationName && termsAccepted
      ? "bg-blue-50"
      : "bg-darkGrey-50";
  const [modalShow, setModalShow] = useState(false);

  const iconShown = "pr-5 hidden";

  const signUpAdmin = async () => {
    //  this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    
    if (!name || !email || !organizationName) {
      setError("Please provide required field");
      return;
    }
    const data = {
      email,
      name,
      organization: {
        name: organizationName,
      },
      role: RoleConstant.ORGANISER,
    };
   dispatch({type: eventConstants.SHOW_LOADER, data: true})
    const [error, response] = await Utils.parseResponse(signUp(data));
   dispatch({type: eventConstants.HIDE_LOADER, data: false})

    // setIsLoading(false)
    if (error) {
      setError(error);
      return;
    }
    //  this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !response) return;
    setUser(response);
    setModalShow(true);
  };

  const reSendVerificationMail = async () => {
    //  this.props.dispatchAction(eventConstants.SHOW_LOADER, true);
    if (!email) {
      setError("Please provide required field");
      return;
    }
    const [error, response] = await Utils.parseResponse(
      resendEmailVerification({
        email,
      })
    );
    if (error) {
      setError(error);
      return;
    }
    //  this.props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error || !response) return;
    // setModalShow(false);
    // history.push(`${Pages.UPDATE_PASSWORD}/${user._id}`);
  };

  const proceedToUpdatePassword = async () => {
    setModalShow(false);
    history.push(`${Pages.UPDATE_PASSWORD}/${user._id}`);
  }

  return (
    <div className=" bg-Slate-200 pt-28 h-screen">
      {isLoading && <div className="screenloader"><CircularProgress/></div>}
      <div className="w-125  bg-white text-center  m-auto rounded-lg px-5">
        <img
          src="/images/img-logo.png"
          alt=""
          className="mx-auto pt-12.5"
        ></img>
        {modalShow ? (
          <Modal
            reSendVerificationMail={reSendVerificationMail}
            modalShow={modalShow}
            proceedToUpdatePassword={proceedToUpdatePassword}
          />
        ) : null}
        <h1 className="text-ft7 font-OpenSansSemiBold mt-7.5">
          Create an account
        </h1>
        <form>
          <div className="bg-Slate-50 w-full mt-10 rounded-lg flex justify-between">
            <input
              value={name}
              type="text"
              placeholder="Full Name"
              className="bg-Slate-50 w-full rounded-lg py-5 pl-5 text-ft4 placeholder-darkGrey-100 text-black-50 font-OpenSansRegular focus:outline-none "
              onChange={(ev) => {
                if (error) {
                  setError("");
                }
                setName(ev.target.value);
              }}
            ></input>
            <img
              alt=""
              src="/images/ic-clear.svg"
              className={iconShown}
              onClick={() => setName("")}
            ></img>
          </div>
          <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between">
            <input
              value={email}
              type="email"
              placeholder="Email Address"
              className="bg-Slate-50 w-full rounded-lg py-5 pl-5 text-ft4 placeholder-darkGrey-100 text-black-50 font-OpenSansRegular focus:outline-none"
              onChange={(ev) => {
                if (error) {
                  setError("");
                }
                setEmail(ev.target.value);
              }}
            ></input>
            <img
              alt=""
              src="/images/ic-clear.svg"
              className={iconShown}
              onClick={() => setEmail("")}
            ></img>
          </div>
             <div style={{color:"red"}}> {error? error:""}</div>
          <div className="bg-Slate-50 w-full mt-4 rounded-lg flex justify-between">
            <input
              value={organizationName}
              type="text"
              placeholder="Organization Name"
              className="bg-Slate-50 rounded-md w-full py-5 pl-5 text-ft4 placeholder-darkGrey-100 text-darkGrey-100 font-OpenSansRegular focus:outline-none"
              onChange={(ev) => {
                if (error) {
                  setError("");
                }
                setOrganizationName(ev.target.value);
              }}
            ></input>
            <img
              alt=""
              src="/images/ic-clear.svg"
              className={iconShown}
              onClick={() => setOrganizationName("")}
            ></img>
          </div>
          <div className="flex flex-row pt-7.5">
            <div className=" flex">
              <input
                type="checkbox"
                className="w-5 h-5 "
                value={name && email && organizationName && termsAccepted}
                onChange={(eve) => setTermsAccepted(eve.target.checked)}
              ></input>
              <p className="font-OpenSansRegular text-ft4 text-darkGrey-100 pl-2.5">
                I agree all statements in terms of service
              </p>
            </div>
          </div>
          <button
            type="button"
            className={
              "mt-12.5 py-6 text-ft4  text-white w-full rounded-full font-OpenSansSemiBold " +
              buttonColor
            }
            onClick={() => {
              signUpAdmin();
            }}
            disabled={!termsAccepted || !name || !email || !organizationName}
          >
            Create account
          </button>
        </form>
        <p className="mt-12.5 text-ft4 font-OpenSansRegular pb-12.5">
          <Link to="/" className="font-OpenSansSemiBold text-blue-50 ">
            I already have an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
