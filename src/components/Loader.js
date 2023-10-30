import React, { Component } from "react";
import loading from "./loading.gif";
const Loader = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loader;
