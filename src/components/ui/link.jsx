"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LinkTag = ({
  href,
  children,
  className,
  activeColor = "bg-accent",
  ...props
}) => {
  const pathName = usePathname();
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        "py-4 px-2 rounded-lg flex items-center gap-4",
        {
          [activeColor]: pathName === href,
        },
        className,
        `hover:${activeColor}`
      )}
    >
      {children}
    </Link>
  );
};

export default LinkTag;
