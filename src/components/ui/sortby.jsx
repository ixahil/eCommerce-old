import React from "react";

const SortBy = ({ classNames }) => {
  return (
    <div className={classNames}>
      <label>Sort by</label>
      <select className="border-2 px-3 py-1 pr-16">
        <option>Deafult</option>
        <option>Trending</option>
        <option>Latest</option>
        <option>Price: Low to high</option>
        <option>Price: High to low</option>
      </select>
    </div>
  );
};

export default SortBy;
