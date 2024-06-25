"use client";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createUrl } from "@/utils/helpers";

const HeaderSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (e) => {
    e.preventDefault();
    const val = e.target;
    const search = val.search;

    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("keywords", search.value);
    } else {
      newParams.delete("keywords");
    }

    router.push(createUrl("/search", newParams));
  };
  // w-max-[550px] relative w-full lg:w-80 xl:w-4/5 flex items-center
  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full w-max-[550px] lg:w-80 xl:w-4/5 flex items-center"
    >
      <input
        key={searchParams?.get("q")}
        defaultValue={searchParams?.get("q") || ""}
        name="search"
        type="text"
        autoComplete="off"
        placeholder="Search for products"
        className="w-full border-b-4 border-accent bg-white px-4 py-2 text-sm outline-0 ring-0 placeholder:text-neutral-500   focus:ring-0 focus-visible:outline-offset-0 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <button>
          <SearchIcon size={20} className="text-gray-500" />
        </button>
      </div>
    </form>
  );
};

export default HeaderSearch;
