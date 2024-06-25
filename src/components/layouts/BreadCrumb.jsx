"use client";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumb = () => {
  const pathName = decodeURI(usePathname());

  const paths = pathName.split("/").splice(2);
  const home = pathName.split("/")[1];
  const currentPath = paths.slice(-1)[0];

  return (
    <ul className="flex items-center gap-2 capitalize">
      <Link href={"/" + home}>
        <HomeIcon />
      </Link>
      <span>{">"}</span>
      {paths.map((v, k) => {
        return (
          <React.Fragment key={v}>
            <Link
              href={{
                pathname: "/" + home + "/" + paths.slice(0, k + 1).join("/"),
              }}
              className={`${currentPath === v && "font-medium"}`}
            >
              {v}
            </Link>
            {k !== paths.length - 1 && <span>{">"}</span>}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default BreadCrumb;
