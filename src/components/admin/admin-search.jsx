"use client";
import { cn } from "@/utils/cn";
import { SearchIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { createUrl } from "@/utils/helpers";
import Link from "next/link";
import { Button } from "../ui";

const AdminSearch = ({ className, placeholder, searchParams, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const onSubmit = (e) => {
    e.preventDefault();
    const val = e.target;
    const search = val.search;

    const newParams = new URLSearchParams(searchParams);

    if (search.value) {
      newParams.delete("page");
      newParams.set("keywords", search.value);
    } else {
      newParams.delete("keywords");
    }

    router.push(createUrl(pathname, newParams));
  };

  return (
    <form
      className={cn("flex items-center w-fit gap-4", className)}
      onSubmit={onSubmit}
    >
      <div className="relative bg-gray-200/50 flex items-center  border rounded-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon size={18} className="text-gray-500" />
        </div>
        <input
          name="search"
          type="search"
          key={searchParams?.keywords}
          defaultValue={searchParams?.keywords || ""}
          id="default-search"
          className={cn(
            "bg-gray-100/50 block w-full p-3 ps-10 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
          placeholder={placeholder}
        />

        <Button type="submit">Filter</Button>
      </div>
      <Link href={pathname} className="">
        <Button
          type="reset"
          value="Clear"
          className="p-3 border rounded-md bg-transparent"
        >
          Clear
        </Button>
      </Link>
      {children}
    </form>
  );
};

export default AdminSearch;
