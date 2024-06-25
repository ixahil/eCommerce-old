import LinkTag from "@/components/ui/link";
import { getCollections, getData } from "@/lib/fetcher-server";
import React from "react";

export const Collections = async () => {
  const { data, error } = await getCollections();

  if (error) {
    return <p className="text-center font-bold">{error}</p>;
  }
  if (!data.collection)
    return <p className="text-center font-bold">No Collections found</p>;

  const NavMenuContent = data.collection.map((v, k) => (
    <LinkTag
      href={`/search/${v.value}`}
      key={k}
      activeColor="bg-accent"
      className={
        "rounded-none flex space-x-6 py-2 hover:bg-accent false w-full h-full px-4 justify-center items-center font-normal text-sm uppercase text-neutral-500 hover:underline hover:ease-in transition duration-150 ease-in-out underline-offset-4 hover:border-white"
      }
    >
      {v.label}
    </LinkTag>
  ));
  return (
    <nav className="select-none">
      {data?.collection && (
        <ul className="hidden h-12 justify-evenly border-2 border-t-accent border-t-4 divide-x-2 text-sm md:flex md:w-full md:items-center">
          {NavMenuContent}
        </ul>
      )}
    </nav>
  );
};
