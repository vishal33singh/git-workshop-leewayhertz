import React, { useState } from "react";

function TableItems({ item, index, editTicket, deleteTicket}) {
  const [showMenu, setShowMenu] = useState(false);

  function intToString (value) {
       var newValue = value;
      if (value >= 1000) {
          var suffixes = ["", "K", "M", "B","T","Q"];
          var suffixNum = Math.floor( (""+value).length/3 );
          var shortValue = '';
          for (var precision = 2; precision >= 1; precision--) {
              shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
              var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
              if (dotLessShortValue.length <= 2) { break; }
          }
          if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
          newValue = shortValue+suffixes[suffixNum];
      }
      return newValue;
  
}

  return (
    <div className=" h-29 flex w-full items-center pl-12.5 pr-12.5 border-t border-darkGrey-50 font-OpenSansSemiBold text-ft3 text-black-50  ">
      <span className="w-29.75 2xl:w-14per flex ">
        <img className="w-16.25  h-16.25 rounded" src={item.images[1]} alt="" />
      </span>
      <span className="w-29.75 2xl:w-14per">
        <img className="w-16.25 h-16.25 rounded" src={item.gifts.giftImages[1]} alt="" />
      </span>
      <span className=" text-ft4 text-black-50 font-OpenSansSemiBold text-left w-86.5 2xl:w-28per">
        <div className="whitespace-nowrap">{item?.name?.length > 14 ?  `${item?.name?.slice(0, 14)}...` : item?.name} </div>
        <div className="text-ft3 text-darkGrey-100 font-OpenSansRegular text-left pt-1.25">
          {"Ends "+ new Date(item?.saleEndDate).toLocaleString()}
        </div>
      </span>
      <span className="w-45.75 text-ft4 text-black-50 font-OpenSansRegular text-left  2xl:w-14per">
        {"0/"+intToString(item?.availableForSale)}
      </span>
      <span className="w-38 text-ft4 text-black-50 font-OpenSansRegular text-left  2xl:w-14per">
        {"$"+intToString(item?.price)}
      </span>
      <span className="relative w-10 2xl:w-14per " onClick={() => setShowMenu(!showMenu)}>
        <img alt="" src="/images/ic-action.svg" className="cursor-pointer"></img>
        {showMenu && (
          <div className="absolute bottom-8 right-0 w-53.75 h-auto py-2.5 bg-white shadow-xl  ">
            <div className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100" onClick={()=>{editTicket(index)}}>
              View
            </div>
            {/* <div className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100" onClick={()=>{editTicket(index)}}>
              Edit
            </div> */}
            {/* <div className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100">
              Share
            </div> */}
            <div className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100" onClick={()=>{deleteTicket(index)}}>
              Delete
            </div>
          </div>
        )}
      </span>
    </div>
  );
}

export default TableItems;
