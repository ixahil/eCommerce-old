import { cn } from "@/utils/cn";
import React from "react";

const PageHeading = ({ children, className }) => {
  return (
    <h1 className={cn("text-lg sm:text-xl capitalize xl:text-2xl", className)}>
      {children}
    </h1>
  );
};

const Title = ({ children, className }) => {
  return (
    <h2
      className={cn(
        "text-base sm:text-lg capitalize xl:text-xl font-medium",
        className
      )}
    >
      {children}
    </h2>
  );
};

const SubTitle = ({ children, className }) => {
  return (
    <h4 className={cn("text-sm sm:text-base xl:text-lg capitalize", className)}>
      {children}
    </h4>
  );
};

const NormalText = ({ children, className }) => {
  return (
    <p className={cn("text-xs sm:text-sm xl:text-base", className)}>
      {children}
    </p>
  );
};

export { PageHeading, Title, SubTitle, NormalText };
