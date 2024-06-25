import React from "react";

import BreadCrumb from "./BreadCrumb";
import { cn } from "@/utils/cn";
import { PageHeading } from "../ui/text";

const Section = ({ heading, children, className, breadCrumb }) => {
  return (
    <section className={cn("space-y-10 h-full", className)}>
      {breadCrumb && <BreadCrumb />}
      {heading && <PageHeading>{heading}</PageHeading>}
      {children}
    </section>
  );
};

export default Section;
