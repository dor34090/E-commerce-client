import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsAction";
import { combineReducers } from "redux";
import { Card } from "antd";
import Product from "../general/Product";
const { Meta } = Card;

const Products = (props) => {
  const [state, setState] = useState({ products: [] });

  useEffect(() => {
    if (props && props.products.products) {
      const products = props.products.products;
      setState({ products });
    }
  }, [props]);

  useEffect(() => {
    props.getProducts();
  }, []);

  const productDetails = (product) => {
    return (
      <ul>
        <li>${product.price}</li>
        <li>Stock:{product.quantity}</li>
      </ul>
    );
  };
  const { products } = state;
  return (
    <div className="container-flex">
      <div className="row" style={{ flexFlow: "column-wrap" }}>
        {products.map((products, index) => (
          <Product
            key={products._id}
            product={products}
            description={productDetails(products)}
            link={`products/${products._id}`}
            thumbnail={products.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, { getProducts })(Products);
