import { cn } from "@/utils/cn";
import React from "react";
import { Title } from "../ui/text";

const Container = ({ title, children, className }) => {
  return (
    <div
      className={cn("p-4 xl:p-8 rounded-md border space-y-6 w-full", className)}
    >
      {title && <Title>{title}</Title>}
      {children}
    </div>
  );
};

export default Container;
