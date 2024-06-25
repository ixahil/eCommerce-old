import Link from "next/link";
import React from "react";

const FilterPills = ({ searchParams, filters }) => {
  return (
    <ul className="text-sm flex gap-4 border-b leading-6 flex-wrap">
      {filters.map((nav, index) => {
        return (
          <li
            key={index}
            className={`py-2 ${
              searchParams.viewId?.includes(nav.viewId) ||
              (!searchParams.viewId && index === 0)
                ? "border-b-4 border-accent"
                : ""
            }`}
          >
            <Link href={{ query: { viewId: nav.viewId } }} className="p-2">
              {nav.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FilterPills;
