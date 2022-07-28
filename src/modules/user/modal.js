import React from "react";

function Modal({ handleChange, selectedUser, blockUser, open }) {
  return (
    <>
      {open ? (
        <div class="fixed inset-0 z-0  bg-darkGrey-100 bg-opacity-70 flex justify-center pt-59.75">
          <div className=" z-20 flex flex-col justify-center h-72.25 w-125 bg-white rounded-lg -mx-5 ">
            <h1 className="font-OpenSansSemiBold text-ft7 text-left pl-13 text-black-50 pt-12.5">
              Are you sure you want to block this user?
            </h1>
            <p className="pt-5 mb-12.5 font-OpenSansRegular text-ft4 text-darkGrey-100  text-center">
              {selectedUser?.name}
            </p>
            <div className="flex mx-10 space-x-5 w-full">
              <button
                className=" bg-white border border-darkGrey-50 px-18.5 w-50 h-17.5 text-ft4 text-black-50 rounded-full font-OpenSansSemiBold mb-12.5"
                onClick={() => {
                  handleChange("selectedUser", {});
                  handleChange("openConfimation", false);
                }}
              >
                Cancel
              </button>
              <button
                className=" bg-blue-50 px-18.5 w-50 h-17.5 text-ft4 text-white rounded-full font-OpenSansSemiBold mb-12.5"
                onClick={() => blockUser()}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
