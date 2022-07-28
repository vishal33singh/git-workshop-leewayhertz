import React, { useEffect, useRef, useState } from "react";
import CloseIfClickOutside from "../../common/components/closeIfClickOutside";
import { RoleConstant } from "../../constants";

function TableItems({ item, user, deleteUser, onEditClick }) {
  const [showMenu, setShowMenu] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);
  return (
    <CloseIfClickOutside setIsOpen={setShowMenu}>
         {user?.role === RoleConstant.ORGANISER ?
      <tr className="h-19.75 w-full pl-7.5 pr-12.5 flex justify-between items-center border-b border-grey-50 font-OpenSansRegular text-left text-ft3 text-black-50 ">
        <td className="w-15per break-all truncate">{item?.name}</td>
        <td className="w-15per break-all truncate">{item?.email}</td>
        <td className="w-15per break-all truncate">{item?.phone}</td>
        <td className="w-17.2per capitalize break-all truncate">
          {item?.permissions?.join(", ").charAt?.(0).toUpperCase() +
            item?.permissions?.join(", ").slice(1).toLowerCase()}
        </td>
        {user?.role === RoleConstant.ORGANISER && (
          <td className="" ref={ref} onClick={() => setShowMenu(!showMenu)}>
            <img
              alt=""
              src="/images/ic-action.svg"
              className="cursor-pointer pr-9 "
            />
            {showMenu && (
              <div className="absolute right-4 w-53.75 shadow-xl py-2.5 bg-white">
                {/*<div
                className=" h-14 flex items-center pl-6 my-1  font-OpenSansRegular text-ft3 text-left text-black-50 cursor-pointer hover:bg-Slate-100  w-full"
                onClick={() => onEditClick(item)}
              >
                Edit
              </div>*/}
                <div className="flex">
                  <div
                    className=" h-14 flex items-center pl-6 my-1 font-OpenSansRegular   text-ft3 text-left text-black-50 cursor-pointer hover:bg-Slate-100 w-full"
                    onClick={() => deleteUser(item.userId)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            )}
          </td>
        )}
      </tr>:(             <tr className="h-19.75 w-full pl-7.5 pr-12.5 flex justify-between items-center border-b border-grey-50 font-OpenSansRegular text-left text-ft3 text-black-50 ">
        <td className="w-15per">{item?.name}</td>
        <td className="w-15per">{item?.email}</td>
        <td className="w-15per">{item?.phone}</td>
          <td className="w-15per capitalize">
          {item?.permissions?.join(", ").charAt?.(0).toUpperCase() +
            item?.permissions?.join(", ").slice(1).toLowerCase()}
        </td>
        {user?.role === RoleConstant.ORGANISER && (
          <td className="" ref={ref} onClick={() => setShowMenu(!showMenu)}>
            <img
              alt=""
              src="/images/ic-action.svg"
              className="cursor-pointer pr-9 "
            />
            {showMenu && (
              <div className="absolute right-4 w-53.75 shadow-xl py-2.5 bg-white">
                {/*<div
                className=" h-14 flex items-center pl-6 my-1  font-OpenSansRegular text-ft3 text-left text-black-50 cursor-pointer hover:bg-Slate-100  w-full"
                onClick={() => onEditClick(item)}
              >
                Edit
              </div>*/}
                <div className="flex">
                  <div
                    className=" h-14 flex items-center pl-6 my-1 font-OpenSansRegular   text-ft3 text-left text-black-50 cursor-pointer hover:bg-Slate-100 w-full"
                    onClick={() => deleteUser(item.userId)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            )}
          </td>
        )}
      </tr>)}
    </CloseIfClickOutside>
  );
}

export default TableItems;
