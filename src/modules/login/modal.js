import React from "react";

function Modal({ reSendVerificationMail, modalShow, proceedToUpdatePassword}) {
  return (
    <>
      {modalShow ? (
        <div class="fixed inset-0  bg-darkGrey-100 bg-opacity-70 flex justify-center pt-44">
          <div className=" absolute z-10 flex flex-col justify-center w-125 bg-white rounded-lg -mx-5 pt-1">
            <h1 className="font-OpenSansSemiBold text-ft7 text-black-50 pt-12.5">
              Verify your email address
            </h1>
            <p className="pt-5 font-OpenSansRegular text-ft4 text-darkGrey-100 px-16.75">
              Go to your email and confirm your email address and enter your
              temporary password
            </p>
            <p className="pt-12.5 font-OpenSansRegular text-ft4 text-darkGrey-100">
              Didn’t receive the confirmation?
            </p>
            <button
              className=" bg-blue-50 mt-7.5 py-6 text-ft4 text-white rounded-full font-OpenSansSemiBold mx-12.5 mb-12.5"
              onClick={() => reSendVerificationMail()}
            >
              Re-send email verification
            </button>

            <button
                className="bg-blue-50 mt-2.5 py-6 text-ft4 text-white rounded-full font-OpenSansSemiBold mx-12.5 mb-12.5"
                onClick={() => proceedToUpdatePassword()}
            >
              Proceed
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
