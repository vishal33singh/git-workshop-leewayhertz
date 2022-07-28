import React, {useEffect, useState} from "react";
import {CreateEventConstants} from "../../constants";

function Publish(props) {

  const goBackToTickets = () => {
    props.updateActivePage(CreateEventConstants.TICKETS)
  }

  const [splitsArray, setSplitsArray] = useState([{"role": "Organizer", "percentage": 0, "walletAddress": window.caver.utils.toChecksumAddress(window.caver?.currentProvider?.selectedAddress)}]);
  const [splitsArrayContainer, setSplitsArrayContainer] = useState([{"role": "Organizer", "percentage": 0, "walletAddress": window.caver.utils.toChecksumAddress(window.caver?.currentProvider?.selectedAddress)},
      {"role": "Other", "percentage": 0, "walletAddress": ""}, {"role": "Promoters", "percentage": 0, "walletAddress": ""}, {"role": "Distributor", "percentage": 0, "walletAddress": ""},
    {"role": "Artist", "percentage": 0, "walletAddress": ""}]);
  const [percentageError, setPercentageError] = useState("")
  const [addressesError, setAddressesError] = useState("")
  const [invalidKlaytnAddressErr, setInvalidKlaytnAddressErr] = useState("")
  const addSplits = () => {
    let newSplit = {
      "role": "",
      "percentage": 0,
      "walletAddress": ""
    }
    if(splitsArray.length < 5){
      let currentSplits = [...splitsArray];
      let currentSplitsContainer = [...splitsArrayContainer];
      currentSplits.push(splitsArrayContainer[splitsArrayContainer.length-1]);
      currentSplitsContainer.splice(splitsArrayContainer.length-1, 1)
      setSplitsArray(currentSplits);
      setSplitsArrayContainer(currentSplitsContainer);
    }
  }

  const removeSplit = (index) => {
    if(index === 0) return;
    let currentSplits = [...splitsArray];
    let currentSplitsContainer = [...splitsArrayContainer];
    currentSplits.splice(index, 1);
    currentSplitsContainer.push(splitsArray[index]);
    setSplitsArray(currentSplits);
    setSplitsArrayContainer(currentSplitsContainer);
  }

  const updateSplits = (key, value, index) => {
    let currentSplits = [...splitsArray];
    if(key === "percentage"){
      currentSplits[index][key] = parseInt(value);
    }
    if(key === "walletAddress"){
      if(window.caver.utils.isAddress(value)){
        currentSplits[index][key] = window.caver.utils.toChecksumAddress(value);
        setInvalidKlaytnAddressErr("")
      }
      else{
        setInvalidKlaytnAddressErr("The edited string is not a valid Klaytn address")
      }
    }
    else{
      currentSplits[index][key] = value;
    }
    currentSplits[index][key] = key === "percentage" ? parseInt(value) : value;
    setSplitsArray(currentSplits);
  }

  const publish = async () => {

    const sumOfPercentages = splitsArray.reduce((accumulator, object) => {
      return accumulator + object.percentage;
    }, 0);

    const contributorsAddresses = splitsArray.map(item => item.walletAddress).filter((value, index, self) => self.indexOf(value) === index)

    if(contributorsAddresses.length !== splitsArray.length){
      setPercentageError("")
      setAddressesError("Wallet addresses of all the contributors should be distinct")
      return;
    }
    if(sumOfPercentages !== 100){
      setAddressesError("")
      setPercentageError("The sum of the percentages of all the contributors should exactly be 100")
      return;
    }
    if(invalidKlaytnAddressErr !== ""){
      setPercentageError("")
      setAddressesError("")
    }
    else{
      setAddressesError("")
      setPercentageError("")
      await props.createEvent(splitsArray)
    }
  }

  return (
      <>
        <div className="flex">
          <div className="w-full" >
            <div className=" bg-Slate-200 px-12.5 pb-36.5">
              <div className="pt-12.5">
                <img alt="" src="/images/ic-back-accntsettings.svg" className=""></img>
              </div>
              <div className="pt-6 flex justify-between">
                <h1 className="font-OpenSansSemiBold text-ft8 text-black-50">
                  Create Event
                </h1>
                <div className="flex space-x-8.75">
                  <div className="flex">
                    <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-darkGrey-50 text-white rounded-full">
                      1
                    </p>
                    <p className="ml-2.5 font-OpenSansSemiBold text-ft4 py-1.5 text-darkGrey-50">
                      Event Details
                    </p>
                  </div>
                  <div className="flex">
                    <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-darkGrey-50 text-white rounded-full">
                      2
                    </p>
                    <p className="ml-2.5 font-OpenSansRegular text-ft4 py-1.5 text-darkGrey-50">
                      Tickets
                    </p>
                  </div>
                  <div className="flex">
                    <p className="px-2.75 py-1.5 text-ft4 font-OpenSansRegular bg-black-50 text-white rounded-full">
                      3
                    </p>
                    <p className="ml-2.5 font-OpenSansRegular text-ft4 py-1.5 text-black-50">
                      Publish
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white pl-12.5  mt-9.5 rounded-lg pb-30  mb-20">
                <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 pt-12.5">
                  Role and Economic Splits
                </h1>
                <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
                  Revenue % for the contributors.
                </p>

                {splitsArray.map(
                    (item, index) => (
                        <div className="flex space-x-5 mt-10 mr-57.75">
                          <div className="flex flex-col w-75">
                            <p className="font-OpenSansRegular text-ft3 text-darkGrey-50">
                              Role
                            </p>
                            <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                              <input
                                  onChange={(e) => updateSplits("role", e.target.value, index)}
                                  value={item.role}
                                  className="text-black-50 w-full focus:outline-none" readOnly></input>
                            </div>
                          </div>

                          <div className="flex flex-col w-75">
                            <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                              Percentage
                            </p>
                            <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3">
                              <input
                              type="number"
                                  onChange={(e) => updateSplits("percentage", e.target.value, index)}
                                  className="text-black-50 w-full focus:outline-none"></input>
                            </div>
                          </div>

                          <div className="flex flex-col w-75">
                            <p className="font-OpenSansSemiBold text-ft3 text-darkGrey-50">
                              Wallet Address
                            </p>
                            <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 pr-5 py-3.25 font-OpenSansRegular text-ft3">
                              <input
                                  onChange={(e) => updateSplits("walletAddress", e.target.value, index)}
                                  value={item.walletAddress}
                                  className="text-black-50 w-full focus:outline-none" readOnly={index === 0}></input>
                            </div>
                          </div>

                         { index === 0 ? "" :
                            <button className="font-OpenSansSemiBold text-ft2 text-darkGrey-50 w-65 flex j gap-2 mt-12.5" onClick={() => {removeSplit(index)}}>
                            <img alt="" src="/images/ic-delete.svg" className=""></img>
                            Delete role
                          </button>}
                        </div>
                    )
                )}


                <button className="font-OpenSansSemiBold text-ft3 flex mt-7.5 text-blue-50 gap-2.5" onClick={addSplits}>
                  <img alt="" src="/images/ic-addmore.svg" className=""></img> Add Role
                </button>

                <p className="text-red-50">{ percentageError }</p>
                <p className="text-red-50">{ addressesError }</p>
                <p className="text-red-50">{ invalidKlaytnAddressErr }</p>

                <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 pt-12.5">
                Secondary Sale Royalties
                </h1>
                <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
                  Percentage you can get when someone resell your event.
                </p>

                <div className="flex flex-col w-full pt-12.5">
                  <p className="font-OpenSansRegular text-ft3 text-darkGrey-50">
                    Royalty percentage
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 mr-87.75">
                    <input
                        type="number"
                        min="0"
                        id={"royaltyPercentage"}
                        onChange={(e) => props.handleChange(e)}
                        value={props.state.royaltyPercentage}
                        className="text-black-50 w-full focus:outline-none">
                         {/*onWheel={(e)=> e.target.blur()}*/}

                        </input>
                  </div>
                </div>

                <div className="flex flex-col w-full pt-12.5">
                  <p className="font-OpenSansRegular text-ft3 text-darkGrey-50">
                    Royalty Wallet Address
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 pl-5 py-3.25 font-OpenSansRegular text-ft3 mr-87.75">
                    <input
                        id={"royaltyWalletAddress"}
                        onChange={(e) => props.handleChange(e)}
                        value={props.state.royaltyWalletAddress}
                        className="text-black-50 w-full focus:outline-none"></input>
                  </div>
                </div>


                 {/* <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 pt-12.5">
                  Wallet Address
                </h1>
                <p className="font-OpenSansRegular text-ft3 text-darkGrey-100 pt-2.5">
                  Lorem ipsum dolor sit amet, consectetur
                 </p>
                <div className="flex flex-col w-full pt-10 pb-14">
                  <p className="font-OpenSansRegular text-ft3 text-darkGrey-50">
                    Wallet Address
                  </p>
                  <div className="flex rounded-lg border-grey-400 border focus:outline-none mt-4 mb-16 pl-5 py-3.25 font-OpenSansRegular text-ft3 mr-87.75">
                    <input className="text-black-50 w-full focus:outline-none" value={window.caver.utils.toChecksumAddress(window.caver?.currentProvider?.selectedAddress)}></input>
                  </div>
                </div>  */}
              </div>
            </div>
            <footer className="fixed bottom-0 left-0 flex justify-end py-5 bg-white w-screen shadow-2xl">
              <button className=" rounded-full py-3.75 px-15 text-black-50 border border-darkGrey-50 font-OpenSansSemiBold text-ft3 mr-5" onClick={goBackToTickets}>
                Back
              </button>
              {" "}
              {props.state.isPublishing ?
                  (<button className="bg-blue-50 rounded-full py-3.75 px-12.5 text-white font-OpenSansSemiBold text-ft3 mr-12.5">
                    Minting...
                  </button>)
              :
                  (<button className="bg-blue-50 rounded-full py-3.75 px-12.5 text-white font-OpenSansSemiBold text-ft3 mr-12.5" onClick={publish}>
                    Mint
                  </button>)}

            </footer>
          </div>
        </div>
      </>
  );
}

export default Publish;
