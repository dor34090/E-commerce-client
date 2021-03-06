import React from "react";
import NavBar from "../general/NavBar";
import Background from "./background";
import Products from "./products";
import Filter from "../general/Filter";

const index = () => {
  return (
    <div>
      <NavBar />
      <Background />
      <Products />
    </div>
  );
};

export default index;
