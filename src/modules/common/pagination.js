import React, { useEffect, useState } from "react";

function Pagination({ numberOfPages, total, currentPage, getListByPage , numberOfItems }) {
  const [pages, setPages] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [count, setCount] = useState(3);
  const [paginationToggle, setPaginationToggle] = useState(false);
  useEffect(() => {
    let count = [],
      pagesToDisplay = [],
      flag = true;
    for (let index = 0; index < numberOfPages; index++) {
      count.push(index + 1);
      if (flag) pagesToDisplay.push(index + 1);
      if (!((index + 1) % 3)) {
        flag = false;
      }
    }
    setPageCount(count);
    setPages(pagesToDisplay);
  }, [numberOfPages]);
  const pagesCss =
    "w-7.5 flex items-center px-2 py-2 w-3 cursor-pointer border border-Slate-350  text-sm font-medium text-Slate-350  ";

  const updatePageListing = (isNext) => {
    let pageListing = [...pages];
    if (numberOfPages > 3) {
      if (isNext && count + 1 <= numberOfPages) {
        pageListing.shift();
        pageListing.push(count + 1);
        setCount(count + 1);
        setPages(pageListing);
      }
      if (!isNext && count > 3) {
        pageListing.pop();
        pageListing.unshift(pageListing[0] - 1);
        setCount(count - 1);
        setPages(pageListing);
      }
    }
  };

  return (
    <div  className="flex items-center justify-between mt-10">
      <div className="flex items-center gap-5 ">
        {/* <div className="font-OpenSansRegular text-ft3 text-Slate-350">
          Show
          <span className="text-black-50 "> {currentPage} </span>to
          <span className="text-black-50 "> {numberOfItems} </span>of
          <span className="text-black-50 "> {total} </span>
        </div> */}
        {/* <select
          className={`styled-select flex rounded-lg items-center justify-between h-9.5 w-13.5 px-1 outline-none bg-white ${paginationToggle ? "select-active" : "select-inactive"}`}
          onChange={(ev) => getListByPage(ev.target.value - 1)}
          value={currentPage}
          onClick={() => setPaginationToggle(!paginationToggle)}
        >
          {pageCount.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select> */}
      </div>
      <div className="flex rounded-md shadow-sm -space-x-px h-9.5 ">
        <div
          className="w-7.5 flex items-center px-2 py-2  rounded-l-md border border-Slate-350 bg-white text-sm font-medium text-Slate-350 hover:bg-gray-50"
          onClick={() => updatePageListing(false)}
        >
          <img
            className=" pl-1 transform cursor-pointer "
            alt=""
            src="/images/ic-eventsPage-backwardArrow.png"
          />
        </div>

        {pages.map((item, index) => (
          <div
            onClick={() => getListByPage(item - 1)}
            key={index}
            className={
              item === currentPage
                ? pagesCss + " bg-grey-50 text-black"
                : pagesCss + " bg-white"
            }
          >
            {item}
          </div>
        ))}
        {!!pages.length % 3 && !pages.includes(numberOfPages) ? (
          <div
            className="w-7.5 flex items-center px-2 py-2  cursor-pointer border border-Slate-350  bg-white text-sm font-medium text-Slate-350  hover:bg-gray-50"
            onClick={() =>{ updatePageListing(true);
              getListByPage(pages[2])}}
          >
            ...
          </div>
        ) : (
          ""
        )}

        <div
          className=" flex items-center px-2 py-2 w-7.5 rounded-r-md border border-Slate-350  bg-white text-sm font-medium text-Slate-350  hover:bg-gray-50"
          onClick={() => updatePageListing(true)}
        >
         <img
            className="pl-0.5 transform cursor-pointer "
            alt=""
            src="/images/ic-eventsPage-forwardArrow.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Pagination;
