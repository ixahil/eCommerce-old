import { ArrowDown } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <div className="py-16 max-w-full mx-auto space-y-44">
      <div className="">
        <h1 className="text-9xl tracking-[0.4em] font-extrabold text-center">
          SPORTS<span className="underline decoration-accent">WEAR</span>
        </h1>
      </div>
      <div className="grid grid-flow-col grid-cols-2 ">
        <div></div>
        <div className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Men's & Women</h2>
            <h3>Online store selling high-quality sportwear</h3>
          </div>
          <div className="">
            <button className="w-1/2 py-4 bg-accent text-xl font-medium">
              Buy Now
            </button>
            <button className="w-1/2 py-4 text-xl font-medium">
              Watch Video
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="w-fit mx-auto py-2 px-8 bg-accent">
          <ArrowDown strokeWidth={1} size={36} className="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
