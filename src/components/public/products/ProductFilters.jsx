"use client";

import {
  Accordion,
  AccordionBody,
  AccordionBodyContent,
  AccordionBodyTitle,
  AccordionHeader,
} from "@/components/ui";
import { useState } from "react";
import Search from "./Search";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils/helpers";
// const brands = [
//   "react",
//   "vue",
//   "next",
//   "node",
//   "react",
//   "vue",
//   "next",
//   "node",
//   "react",
//   "vue",
//   "next",
//   "node",
//   "react",
//   "vue",
//   "next",
//   "node",
// ];

const ProductFilters = ({ brands, error }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [priceRange, setPriceRange] = useState(2500);
  const [selected, setSelected] = useState(searchParams.getAll("brand"));
  const [filteredBrands, setFilteredBrands] = useState(brands);

  const handleChange = (e) => {
    const { value, checked } = e.target;

    const newParams = new URLSearchParams(searchParams.toString());
    const currentValues = searchParams.getAll("brand");

    if (checked) {
      setSelected((prev) => [...prev, value]);
      newParams.append("brand", value);
    } else {
      const updatedValues = selected.filter((item) => item !== value);

      setSelected(updatedValues);
      newParams.delete("brand", value);
    }

    router.push(createUrl("", newParams) || "?");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setFilteredBrands(brands);
    }

    if (value.length > 2) {
      setFilteredBrands((prev) =>
        prev.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  return (
    <div className="h-1/2 text-sm space-y-4 select-none">
      <h2 className="text-center pb-4 text-2xl font-bold">Product Filter</h2>

      <Accordion classNames={""} isOpen={true} height={"250px"}>
        <AccordionHeader>Brand</AccordionHeader>
        <AccordionBody>
          <AccordionBodyTitle>
            <Search classNames={""} onChange={handleInputChange} />
          </AccordionBodyTitle>
          <AccordionBodyContent height={"200px"}>
            <div className="py-4 space-y-2 px-2">
              {error ? (
                <p className="text-center font-bold py-4">{error}</p>
              ) : !brands?.length ? (
                <p className="text-center font-bold py-4">No Brands found</p>
              ) : (
                filteredBrands.map((v, k) => (
                  <label
                    key={v.value + k}
                    className={`block space-x-8 cursor-pointer ${
                      selected.includes(v.label) && "text-blue-500 font-bold"
                    }`}
                  >
                    <input
                      checked={selected.includes(v.value)}
                      className="inline"
                      aria-selected={selected.includes(v.label)}
                      type="checkbox"
                      name=""
                      id=""
                      value={v.value}
                      onChange={handleChange}
                    />
                    <span className="inline capitalize">{v.label}</span>
                  </label>
                ))
              )}
            </div>
          </AccordionBodyContent>
        </AccordionBody>
      </Accordion>
      <Accordion classNames={""} open={true}>
        <AccordionHeader>Price Range</AccordionHeader>
        <AccordionBody>
          <span>0 - {priceRange}</span>
          <div className="flex gap-2">
            <input
              type="range"
              id="vol"
              name="vol"
              min="500"
              step={100}
              max="5000"
              defaultValue={priceRange}
              className="w-3/4 fill-black decoration-black"
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
