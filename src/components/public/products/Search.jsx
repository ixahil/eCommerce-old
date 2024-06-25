import { SearchIcon } from "lucide-react";
import React from "react";

const Search = ({ classNames, onChange }) => {
  return (
    // <form className="flex items-center bg-gray-200/50 px-2">
    //     <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

    //   <SearchIcon size={18} className="text-gray-500" />
    //   <input
    //     className="DocSearch-Input w-full pl-2 p-2 bg-gray-200/0 focus:ring-0"
    //     aria-autocomplete="both"
    //     aria-labelledby="docsearch-label"
    //     id="docsearch-input"
    //     autoComplete="off"
    //     autoCorrect="off"
    //     autoCapitalize="off"
    //     enterKeyHint="search"
    //     spellCheck="false"
    //     placeholder="Search documentation"
    //     maxLength="64"
    //     type="search"
    //   />
    // </form>

    <div className={`flex items-center ${classNames}`}>
      <div className="relative bg-gray-200/50">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon size={18} className="text-gray-500" />
        </div>
        <input
          type="search"
          id="default-search"
          className="bg-gray-100/50 block w-full p-3 ps-10 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search brand..."
          required
          onChange={onChange}
          onReset={onChange}
        />
      </div>
    </div>
  );
};

export default Search;
