import React from "react";
export function SearchInput({ onSubmit, handleChange, value }) {
  return (
    <div className=" h-11.25 flex justify-between rounded-3xl px-5 items-center w-75 bg-white border border-grey-200">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className=" focus:outline-none w-57.75"
          placeholder="Search"
          value={value}
          onChange={(ev) => handleChange("searchQuery", ev.target.value)}
        />
      </form>
      <img onClick={onSubmit} alt="" src="/images/ic-search.svg" className=" h-4 w-4 cursor-pointer"></img>
    </div>
  );
}
