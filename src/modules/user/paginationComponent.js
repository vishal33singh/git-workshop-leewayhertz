import React from "react";

function Pagination() {
  return (
    <div className="flex items-center justify-between w-full mt-3  ">
      <div className="flex items-center gap-5 ">
        <div className="font-OpenSansRegular text-ft3 text-Slate-350">
          show
          <span className="text-black-50 "> 1 </span>to
          <span className="text-black-50 "> 5 </span>of
          <span className="text-black-50 "> 50 </span>
        </div>
        <div className=" flex rounded-lg items-center justify-between h-8 w-13 bg-white">
          <span className="ml-2.5 font-OpenSansSemiBold text-ft3">5 </span>{" "}
          <img
            className="w-3 mr-3 cursor-pointer "
            alt=""
            src="/images/down-arrow.svg"
          />
        </div>
      </div>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px h-9.5 "
          aria-label="Pagination"
        >
         <span
          
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-Slate-350 bg-white text-sm font-medium text-Slate-350 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <img
            className="w-4  cursor-pointer "
            alt=""
            src="/images/backarrow-icon.svg"
          />
          </span>
         <span
            
            aria-current="page"
            className="z-10 bg-indigo-50 border-Slate-350 font-OpenSansRegular relative inline-flex items-center px-2 py-1 border text-sm font-medium"
          >
            {" "}
            1{" "}
          </span>
         <span
           
            className="bg-white border-Slate-350  font-OpenSansRegular text-Slate-350  hover:bg-gray-50 relative inline-flex items-center px-2 py-1 border text-sm font-medium"
          >
            {" "}
            2{" "}
          </span>
         <span
           
            className="bg-white border-Slate-350  font-OpenSansRegular text-Slate-350 hover:bg-gray-50 hidden md:inline-flex relative items-center px-2 py-1 border text-sm font-medium"
          >
            {" "}
            3{" "}
          </span>
          <span className="relative inline-flex items-center px-2 py-1 border border-Slate-350 text-Slate-350   bg-white text-sm font-medium ">
            {" "}
            ...{" "}
          </span>
         <span
           
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-Slate-350  bg-white text-sm font-medium text-Slate-350  hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <img
            className="w-4 cursor-pointer "
            alt=""
            src="/images/forwardarrow-icon.svg"
          />
         
          </span>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
