import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsAction";
import { combineReducers } from "redux";
import { Card } from "antd";
import Product from "../general/Product";
import Filter from "../general/Filter";
const { Meta } = Card;

const Products = (props) => {
  const [state, setState] = useState({ _products: [] });
  const {
    getProducts,
    products: { products: products, filtered: filtered },
  } = props;

  useEffect(() => {
    getProducts();
  }, []);

  const productDetails = (product) => {
    return (
      <ul>
        <li>${product.price}</li>
        <li>Stock:{product.quantity}</li>
      </ul>
    );
  };

  let showProducts = products;
  if (filtered.length !== 0) showProducts = filtered;

  return (
    <div className="container-grid">
      {/* <div style={{ flexFlow: "column-wrap" }}> */}

      <Filter initialProducts={products} />

      {showProducts.map((showProducts, index) => (
        <Product
          key={showProducts._id}
          product={showProducts}
          description={productDetails(showProducts)}
          link={`products/${products._id}`}
          thumbnail={showProducts.thumbnail}
          style={{ paddingBottom: "1rem" }}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, { getProducts })(Products);
