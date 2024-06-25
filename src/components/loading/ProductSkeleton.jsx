import React from "react";

const ProductSkeleton = ({ repeat = 2 }) => {
  return (
    <div className="grid grid-cols-1fr gap-y-16">
      {Array.from(Array(repeat).keys()).map((v, k) => (
        <div
          key={k}
          className="card w-72 bg-base-100 shadow-xl border animate-pulse"
        >
          <div className="h-[200px] w-full bg-gray-300 rounded-b-lg"></div>
          <div className="p-8 space-y-4">
            <div className="h-4 w-1/2 bg-gray-300 rounded-lg"></div>
            <div className="h-4 w-1/4 bg-gray-300 rounded-lg"></div>
            <div className="h-4 w-1/6 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-full rounded-lg flex justify-end gap-2 px-4">
              <div className="h-4 w-1/6 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="flex border-t-2 border-gray-300 divide-x-2">
              <button className="h-8 bg-gray-300 w-full py-2"></button>
              <button className="h-8 bg-gray-300 w-full py-2"></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
