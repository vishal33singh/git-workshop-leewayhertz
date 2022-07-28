import React from "react";

function CommonImages({ classes, title, handleSorting, required, sortByNameHandler }) {
  return (
    <th onClick={sortByNameHandler} className={`flex ${classes} whitespace-nowrap	`}>
      {title}
      {!required ? (
        <img
          onClick={() => {
            if (handleSorting) handleSorting();
          }}
          alt="sort"
          className="ml-3 inline cursor-pointer"
          src="/images/ic-eventsPage-sort.png"
        />
      ) : (
        ""
      )}
    </th>
  );
}

export default CommonImages;
