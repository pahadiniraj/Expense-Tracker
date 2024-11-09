"use client";
import React, { useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";

const loading = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderRadius: "50%",
    color: "black",
    borderWidth: "2px",
  };
  const [color] = useState("#ffffff");

  return (
    <div className=" absolute top-6 right-6 z-40 ">
      <ClipLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default loading;
