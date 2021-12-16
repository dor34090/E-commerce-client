import React, { useState, useEffect } from "react";
import Input from "../../general/Input";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addProduct } from "../../../actions/productsAction";
import Products from "./Products";
import { message } from "antd";

const AddProduct = (props) => {
  const [state, setState] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    brand: "",
    features: ["", "", "", "", ""],
    quantity: "",
    created: Date.now(),
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onFeatureChange = (index, e) => {
    const feature = state.features.slice();
    feature[index] = e.target.value;
    setState({ ...state, features: feature });
  };

  const onSubmit = () => {
    const {
      name,
      description,
      price,
      brand,
      quantity,
      category,
      features,
      created,
    } = state;
    const newProduct = {
      name,
      description,
      price,
      brand,
      quantity,
      category,
      features,
      created,
    };
    console.log(newProduct);
    if (name.length <= 0) {
      return message.error("Product name required");
    }
    if (description.length <= 0) {
      return message.error("Product description required");
    }
    if (price.length <= 0 || price <= 0) {
      return message.error("Price required");
    }
    if (brand.length <= 0) {
      return message.error("Product brand required");
    }
    if (quantity.length <= 0 || quantity <= 0) {
      return message.error("Quantity required");
    }
    if (category.length <= 0) {
      return message.error("Product category required");
    }
    props.addProduct(newProduct, props.history);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add a Product</h1>
      <div style={{ textAlign: "center" }}>
        <form>
          <Input
            name="name"
            type="text"
            placeholder="Product Name"
            value={state.name}
            onChange={onChange}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            name="description"
            type="text"
            placeholder="Product Description"
            value={state.description}
            onChange={onChange}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            name="price"
            type="text"
            placeholder="Price"
            value={state.price}
            onChange={onChange}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            name="brand"
            type="text"
            placeholder="Brand"
            value={state.brand}
            onChange={onChange}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            name="quantity"
            type="text"
            placeholder="Current stock"
            value={state.quantity}
            onChange={onChange}
            style={{ width: "360px", height: "35px" }}
          />
        </form>

        <div className="form-group">
          <select
            name="category"
            value={state.category}
            onChange={onChange}
            style={{ width: "360px", height: "35px" }}
          >
            <option value="0">Select category</option>
            <option value="Clothing">Clothing</option>
            <option value="scam">Scams</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <h4>Product's features (up to 5, optional)</h4>
        <form>
          <Input
            type="text"
            placeholder="Feature 1"
            value={state.features[0]}
            onChange={onFeatureChange.bind(this, 0)}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            type="text"
            placeholder="Feature 2"
            value={state.features[1]}
            onChange={onFeatureChange.bind(this, 1)}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            type="text"
            placeholder="Feature 3"
            value={state.features[2]}
            onChange={onFeatureChange.bind(this, 2)}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            type="text"
            placeholder="Feature 4"
            value={state.features[3]}
            onChange={onFeatureChange.bind(this, 3)}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <form>
          <Input
            type="text"
            placeholder="Feature 5"
            value={state.features[4]}
            onChange={onFeatureChange.bind(this, 4)}
            style={{ width: "360px", height: "35px" }}
          />
        </form>
        <button className="btn btn-primary" onClick={onSubmit}>
          Add a Product
        </button>
        <Link className="btn btn-light my-1" to="/dashboard/products">
          <i className="fas fa-undo-alt"></i>Return to your products
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));
//without withRouter you can't reroute the user after the product is created
