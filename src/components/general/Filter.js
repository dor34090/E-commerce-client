import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "./Input";
import { connect } from "react-redux";
import { getProducts, getFilteredProducts } from "../../actions/productsAction";

const Filter = (props) => {
  const history = useHistory();

  const {
    getFilteredProducts,
    getProducts,
    products: { products },
    initialProducts,
  } = props;

  const [state, setState] = useState({
    products: products,
    name: "",
  });

  useEffect(() => {
    getFilteredProducts(state.name, products);
  }, [state.name]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const style = {
    width: "10rem",
    height: "35px",
    transform: "translateY(25%)",
  };

  return (
    <div className="row" id="filter">
      <i class="fas fa-search" />
      <Input
        name="name"
        type="text"
        placeholder="Search"
        value={state.name}
        onChange={onChange}
        style={{ width: "40%" }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  category: state.category,
});
export default connect(mapStateToProps, { getProducts, getFilteredProducts })(
  Filter
);
