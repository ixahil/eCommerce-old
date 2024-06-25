import React from "react";
import { cn } from "@/utils/cn";
import { PageHeading } from "@/components/ui/text";
const Card = ({ children, className }) => {
  return (
    <div className={cn("w-1/3 mx-auto space-y-8 capitalize", className)}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <PageHeading>{children}</PageHeading>;
};
const CardBody = ({ children }) => {
  return children;
};
const CardFooter = ({ children }) => {
  return children;
};

export { Card, CardHeader, CardBody, CardFooter };
