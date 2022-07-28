import React, { useState } from "react";
import { updateKaikasDetails } from "../../action/index";
import { connect } from "react-redux";
import CloseIfClickOutside from "../../common/components/closeIfClickOutside";

function ConnectWallet(props) {
  const [isConnected, setIsConnected] = useState(
    !!window.caver?.currentProvider?.selectedAddress
  );
  const connectKaikasWallet = async () => {
    if (typeof window.klaytn !== "undefined" && window?.klaytn?.isKaikas) {
      const accounts = await window?.klaytn.enable();
      const account = accounts[0];
      props.updateKaikasDetails({ address: account });
      setIsConnected(true);
      window.location.reload(false);
    } else {
      await window.caver.currentProvider.enable();
      let kaikasDetails = {
        address: window.caver.utils.toChecksumAddress(
          window.caver?.currentProvider?.selectedAddress
        ),
      };
      props.updateKaikasDetails(kaikasDetails);
      setIsConnected(true);
    }
  };

  return (
    <>
      <div class=" fixed z-10 inset-0 justify-end  bg-darkGrey-100 bg-opacity-70 flex ">
        <CloseIfClickOutside
          setIsOpen={props.setConnectWallet}
          className="z-20 flex flex-col h-screen w-100.25 bg-white"
        >
          <div className="flex ">
            <div className="pl-8  pb-9">
              <div className="pt-8 text-ft6 font-OpenSansSemiBold text-black-50">
                Connect Wallet
              </div>
              <div className="text-ft4 pr-6 pt-3 text-darkGrey-100">
                Connect with one of our available wallet providers
              </div>
            </div>
            <div>
              <img
                onClick={() => props.setConnectWallet(false)}
                className="pt-9 pr-6 cursor-pointer w-12.5"
                alt=""
                src="/images/ic-close.svg"
              />
            </div>
          </div>

          <span className="border-t border-Slate-350" />
          <div className="flex justify-between px-7 pt-8 pb-9">
            <div className=" flex">
              <img className="w-10" alt="" src="/images/kaikas-icon.png" />{" "}
              <p className="mt-1.5 pl-5 text-ft3 font-semibold text-darkGrey-100">
                Kaikas
              </p>
            </div>
            <button
              disabled={isConnected}
              className={`w-25 h-9  text-white rounded-2xl text-ft2 ${
                isConnected ? "bg-Slate-350" : "bg-blue-50"
              }`}
              onClick={connectKaikasWallet}
            >
              {isConnected ? (
                <p className="font-semibold ">Connected</p>
              ) : (
                <p className="font-semibold ">Connect</p>
              )}
            </button>
          </div>
          <span className="border-t border-Slate-350" />
          {/* </div> */}
        </CloseIfClickOutside>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  updateKaikasDetails: (kaikasDetails) => {
    dispatch(updateKaikasDetails(kaikasDetails));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);
