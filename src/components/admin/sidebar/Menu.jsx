import LinkTag from "@/components/ui/link";
import { cn } from "@/utils/cn";
import React from "react";

const Menu = ({ data, className }) => {
  return (
    <nav className={cn("py-8", className)}>
      <ul className="space-y-2 flex flex-col max-sm:text-xs">
        {data.map((v) => (
          <LinkTag key={v.value + v.index} href={v.value}>
            {v.icon}
            {v.label}
          </LinkTag>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
