import React from "react";
import NavBar from "../general/NavBar";
import Background from "./background";
import Products from "./products";
import Filter from "../general/Filter";

const index = () => {
  // let array = [-1, -1, -3, -4, -6, -2, -1];

  // const findMax = () => {
  //   for (let i = 1; i <= 100; i++) {
  //     let bool = false;
  //     if (i % 5 !== 0 && i % 3 !== 0) console.log("i", i);
  //     if (i % 5 === 0 && i % 3 === 0) {
  //       console.log("Dor Eden");
  //       bool = true;
  //     }
  //     if (!bool) {
  //       if (i % 3 === 0) console.log("Dor", i);
  //       if (i % 5 === 0) console.log("Eden", i);
  //     }
  //   }
  // };

  return (
    <div>
      <NavBar />
      <Background />
      {/* <Filter /> */}
      <Products />
    </div>
  );
};

export default index;
