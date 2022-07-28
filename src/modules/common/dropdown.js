import React, { useRef, useState, useEffect } from "react";

export default function DropDown({
  handleChange,
  title,
  options,
  updationKey,
  value,
  top,
}) {
  const ref = useRef();
  const [type, setType] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (type && ref.current && !ref.current.contains(e.target)) {
        setType(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [type]);

  return (
    <div
      onClick={() => setType(!type)}
      ref={ref}
      className=" bg-white ml-2 h-11.25 w-42.75 px-5 py-3.25 text-ft3 font-OpenSansRegular text-black-50 flex   flex-row justify-between rounded-md cursor-pointer"
    >
      {value ? value : title}
      {type ? (
        <img
          alt=""
          className="w-3 cursor-pointer transform rotate-180"
          src="/images/down-arrow.svg"
        />
      ) : (
        <img
          alt=""
          className="w-3 cursor-pointer "
          src="/images/down-arrow.svg"
        />
      )}
      {type && (
        <div className="border bg-white  border-grey-200 w-42.5 h-26.9  absolute top-37.25 -ml-5 mt-3.5 rounded-md ">
          {options.map((item, index) => (
            <div
              key={index}
              className=" h-14 flex items-center pl-6   font-OpenSansRegular text-ft3 text-left text-black-50 cursor-pointer hover:bg-blue-50 hover:text-white w-full border-b border-Slate-350 rounded-sm "
              onClick={() => handleChange(updationKey, item.value, item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
