import React from "react";
import Section from "../layouts/Section";

const TBSkeleton = () => {
  return (
    <Section className={"bg-base-100 shadow-xl animate-pulse"}>
      <div className="bg-gray-300 h-10"></div>
      <div className="bg-gray-300 h-10"></div>
      <div className="flex justify-between flex-wrap space-y-2">
        <div className="flex gap-4 flex-wrap">
          <div className=" bg-gray-300 w-60 h-12"></div>
          <div className="bg-gray-300 h-12 w-24"></div>
        </div>
        <div className="bg-gray-300 h-12 w-24"></div>
      </div>
      <div className="space-y-2">
        <div className="bg-gray-300 h-10"></div>
        <div className="bg-gray-300 h-72"></div>
      </div>
    </Section>
  );
};

export default TBSkeleton;
