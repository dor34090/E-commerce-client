import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Input from "../general/Input";
import { register } from "../../actions/authActions";
import { message } from "antd";
import NavBar from "../general/NavBar";
import { sortedLastIndex } from "lodash";
import { decodeUser } from "../../util";
import { addToCart } from "../../actions/cartActions";

const Register = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //gives me the option to type in my forms{

  useEffect(() => {
    const search = props.location.search;
    let split = search.split("redirect=");
    const hasRedirect = search.includes("redirect=");
    split = split[split.length - 1];

    if (props && props.auth.errors && props.auth.errors.length > 0) {
      props.auth.errors.forEach((error) => {
        message.error(error.msg);
      });
    }
    if (props.auth.isAuthenticated) {
      if (split && hasRedirect) {
        if (
          split === "/cart" &&
          localStorage.getItem("token") &&
          localStorage.getItem("products")
        ) {
          //sending all saved products to user's cart, if they exist
          const userId = decodeUser().user.id;
          const products = JSON.parse(localStorage.getItem("products"));
          const context = { products: products, userId };
          props.addToCart(context);
          localStorage.removeItem("products");
        }

        props.history.push(split);
      } else {
        message.success("Sign up successful");
        setTimeout(() => props.history.push("/", 3000));
      }
    }
  }, [props]);
  let onChange = (e) => {
    console.log(e.target.name);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  //}
  let onSubmit = () => {
    let role = props.location.search.split("?role=");
    role = role[role.length - 1];
    const { name, email, password } = state;
    const newUser = {
      name,
      email,
      password,
      role,
    };
    if (password === state.password2) {
      props.register(newUser);
    } else {
      message.error("password don't match");
    }
  };
  onChange = onChange.bind(this);
  onSubmit = onSubmit.bind(this);
  const { name, password, password2, email } = state;

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="large text-primary">Register</h1>
        <p className="lead">
          <i className="fas fa-user"></i>Create a new account
        </p>
        <div className="form">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form">
          <Input
            name="password2"
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary" onClick={onSubmit}>
          Register now!
        </button>
      </div>
    </div>
  );
};
//each form div is a part of the registration process made simpler with the Input component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register, addToCart })(
  withRouter(Register)
);
