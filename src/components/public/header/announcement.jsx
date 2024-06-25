import { Star } from "lucide-react";
import React from "react";

const Announcement = () => {
  return (
    <div className="bg-black text-white flex h-10 w-full justify-center overflow-hidden whitespace-nowrap py-2 text-text-primary">
      <div className="slider flex w-full justify-between gap-6 animate-slide">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <h2 className="flex gap-4 items-center">
      <Star fill="yellow" size={22} />
      FREE SHIPPING ON ORDERS OVER 2000 Rupess!
    </h2>
  );
};

export default Announcement;
