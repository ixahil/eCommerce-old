"use client";
import { ArrowDown } from "lucide-react";
import React, { useContext, useState, createContext } from "react";

const AccordionContext = createContext({
  open: false,
  setOpen: () => {},
  height: "200px",
});

const Accordion = ({ children, header, classNames, isOpen }) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <AccordionContext.Provider value={{ open, setOpen }}>
      <div className={`accordion border ${classNames}`} style={{}}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionHeader = ({ children }) => {
  const { open, setOpen } = useContext(AccordionContext);
  return (
    <div
      className={`accordion-header ${open ? "open" : ""}`}
      aria-expanded={open}
      aria-controls="accordion-body"
    >
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-gray-500 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => setOpen(!open)}
        >
          <span className="">{children}</span>
          {<ArrowDown size={20} />}
        </button>
      </h2>
    </div>
  );
};

const AccordionBody = ({ children }) => {
  const { open } = useContext(AccordionContext);
  return (
    <>
      {open && (
        <div
          className={`accordion-body py-2 px-5 ${open ? "open" : "closed"}`}
          aria-hidden={!open}
          aria-labelledby="accordion-header"
        >
          {children}
        </div>
      )}
    </>
  );
};

const AccordionBodyContent = ({ children, height }) => {
  return (
    <div className="overflow-auto" style={{ maxHeight: height }}>
      {children}
    </div>
  );
};

const AccordionBodyTitle = ({ children }) => {
  return <div className="">{children}</div>;
};

export {
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionBodyContent,
  AccordionBodyTitle,
};
