"use client";
import React, { useState } from "react";

const useStatus = () => {
  const [status, setStatus] = useState(false);

  const toggleStatus = () => {
    setStatus((prev) => !prev);
  };

  const setToggleStatus = (status) => {
    setStatus(status);
  };

  return { status, toggleStatus, setToggleStatus };
};

export default useStatus;
