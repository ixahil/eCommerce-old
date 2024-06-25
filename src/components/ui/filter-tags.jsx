import { Cross, Delete, X } from "lucide-react";
import React from "react";

const FilterTags = ({ tags }) => {
  return (
    <div className="grid grid-cols-120px gap-2">
      {tags.map((v, k) => (
        <span
          key={k}
          className="flex px-3 py-1 border capitalize justify-between items-center"
        >
          {v}

          <X className="inline text-gray-500" size={16} />
        </span>
      ))}
      <span className="underline pl-8">Clear all</span>
    </div>
  );
};

export default FilterTags;
