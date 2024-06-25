"use client";
import { cn } from "@/utils/cn";
import { Field, Label, Textarea } from "@headlessui/react";
import { ArrowDown, ArrowDownNarrowWide } from "lucide-react";
import React, { useRef } from "react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";

const SelectBox = ({
  label,
  type = "text",
  options,
  register,
  error,
  ...props
}) => {
  return (
    <Field className={"cursor-pointer"}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <CreatableSelect
          isClearable
          {...register}
          {...props}
          options={options}
          className="pl-2 mt-3"
          // components={{ Option }}
          // getOptionValue={(option) => option.handle} // Ensure value is set correctly
        />
        {/* <option value={""}>Select {label}</option>
          {options?.map((v, k) => (
            <option value={v.handle} key={k} className="capitalize">
              {v.name}
            </option>
          ))} */}
      </div>
      {error && (
        <span className="normal-case text-red-500 text-xs pl-2">{error}</span>
      )}
    </Field>
  );
};

// const Option = (props) => {
//   const { name: label, handle: value } = props.data;

//   return <components.Option {...props} label={label} />;
// };

export default SelectBox;
