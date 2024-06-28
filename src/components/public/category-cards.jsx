import { getCollections } from "@/lib/fetcher-server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCards = async () => {
  const {
    data: { collection },
  } = await getCollections();
  return (
    <>
      <div className={`grid grid-cols-2 gap-4`}>
        {collection.map((v, k) => {
          const even = k % 2 === 0;
          return (
            <div
              className={`flex h-64 ${
                even ? "bg-accent" : "bg-black text-white"
              }`}
              key={v + k}
            >
              <div
                className={`w-full text-center flex flex-col justify-between py-8 px-16 ${
                  even ? "items-end" : "items-start"
                }`}
              >
                <h2 className="text-4xl font-bold">{v.label}</h2>
                <Link
                  className={`py-2 px-12 hover:scale-105 ${
                    even ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  href={`search/${v.value}`}
                >
                  Go to
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryCards;
