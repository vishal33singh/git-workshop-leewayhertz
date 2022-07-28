import React, { useState } from "react";
import CloseIfClickOutside from "../../common/components/closeIfClickOutside";

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function TableItems({ item, handleChange }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <CloseIfClickOutside setIsOpen={setShowMenu}>
      <tr className="h-19.75 w-full pl-7.5 pr-12.5 flex justify-between items-center border-b border-grey-50 font-OpenSansRegular text-left text-ft3 text-black-50 ">
        <td className="w-15per break-all truncate">
          {titleCase(item?.buyer?.name)}
        </td>
        <td className="w-15per break-all truncate">{item?.event?.name}</td>
        <td className="w-15per break-all truncate">{item?.buyer?.email}</td>
        <td className="w-15per break-all truncate">{item?.buyer?.phone}</td>
        <td className="w-15per break-all truncate">
          {item?.ticket?.type.charAt?.(0).toUpperCase() +
            item?.ticket?.type.slice(1).toLowerCase()}
        </td>
        <td className="w-10per break-all truncate">{item?.numberOfTickets}</td>
        <td className="w-10per break-all truncate">{item?.ticket?.price}</td>
        {/*<td className="relative" onClick={() => setShowMenu(true)}>*/}
        {/*  <img*/}
        {/*    alt=""*/}
        {/*    src="/images/ic-action.svg"*/}
        {/*    className="cursor-pointer pr-8"*/}
        {/*    */}
        {/*  />*/}
        {/*  {showMenu && (*/}
        {/*    <div className="absolute bottom-8 right-0 w-53.75 h-17.5 py-2.5 bg-white shadow-xl  " onClick={() => setShowMenu(false)}>*/}
        {/*      <div*/}
        {/*        className=" h-12.5 flex items-center pl-6 font-OpenSansRegular text-ft4 text-left text-darkGrey-100 hover:bg-Slate-100"*/}
        {/*        onClick={() => {*/}
        {/*          handleChange("selectedUser", item?.buyer);*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        Block*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</td>*/}
      </tr>
    </CloseIfClickOutside>
  );
}

export default TableItems;
