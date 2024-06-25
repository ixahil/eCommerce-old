import { cn } from "@/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Pagination = ({
  totalPages,
  currentPage,
  totalCount,
  searchParams,
  productStartIndex,
}) => {
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (v, k) => startPage + k
  );
  const params = new URLSearchParams(searchParams);
  const limit = parseInt(params.get("limit")) || 8;

  const renderPages = pages.map((v, k) => {
    params.set("page", v);
    return (
      <Link
        scroll={false}
        key={v}
        href={{
          query: params.toString(),
        }}
        className={cn(
          "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:z-20 focus:outline-offset-0",
          { ["bg-accent"]: currentPage == v }
        )}
      >
        {v}
      </Link>
    );
  });

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <RenderButton
          prev={true}
          searchParams={searchParams}
          totalPages={totalPages}
        />
        <RenderButton
          next={true}
          searchParams={searchParams}
          totalPages={totalPages}
        />
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{productStartIndex}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * limit, totalCount)}
            </span>{" "}
            of <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <RenderButton
              prev={true}
              searchParams={searchParams}
              totalPages={totalPages}
            />
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {renderPages}
            {endPage != totalPages && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            )}

            <RenderButton
              next={true}
              searchParams={searchParams}
              totalPages={totalPages}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

const RenderButton = ({ prev, next, searchParams, totalPages }) => {
  const params = new URLSearchParams(searchParams);
  const currentPage = parseInt(params.get("page")) || 1;
  const page = prev ? Math.max(currentPage - 1, 1) : currentPage + 1;
  if (prev) params.set("page", page);
  else params.set("page", page);

  return (
    <Link
      scroll={false}
      href={{
        query: params.toString(),
      }}
      className={cn(
        "relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",

        {
          ["pointer-events-none"]:
            (currentPage === 1 && prev) ||
            (currentPage === totalPages && !prev),
        }
      )}
    >
      <span className="sr-only">{prev ? "Previous" : "Next"}</span>
      {prev ? (
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </Link>
  );
};

export default Pagination;
