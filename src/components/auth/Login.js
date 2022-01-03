import React, { useEffect, useState } from "react";
import Input from "../general/Input";
import { Link } from "react-router-dom";
import { message } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../../actions/authActions";
import { combineReducers } from "../../reducers";
import { decodeUser } from "../../util";
import { addToCart } from "../../actions/cartActions";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  //gives me the option to type in my forms{

  useEffect(() => {
    const search = props.location.search;
    let split = search.split("redirect=");
    const hasRedirect = search.includes("redirect=");
    split = split[split.length - 1];

    if (props && props.errors && props.errors.length > 0) {
      props.errors.forEach((error) => {
        message.error(error.msg);
      });
    }
    if (props.isAuthenticated) {
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
        message.success("Sign in successful");
        setTimeout(() => props.history.push("/", 3000));
        props.history.push(split);
      } else {
        message.success("Sign in successful");
        setTimeout(() => props.history.push("/", 3000));
      }
    }
  }, [props]);

  let onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  let onSubmit = (e) => {
    const { email, password } = state;
    const user = {
      email,
      password,
    };
    props.login(user);
  };

  const detectEnter = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  onChange = onChange.bind(this);
  onSubmit = onSubmit.bind(this);

  const search = props.location.search;
  //returns an array of everything before and after the value
  const split = search.split("redirect=");
  const redirect = split[split.length - 1];
  //making sure that conditions for lines 50-53 were met
  //if not, then we know they weren't even executed
  const hasRedirect = redirect.length > 0 && search.includes("redirect");
  return (
    <div className="login-container" onKeyDown={(e) => detectEnter(e)}>
      <div className="inner-login-container">
        <div className="sign-in-header-text">
          <h1 className="large text-primary">Sign in</h1>
          <p className="lead">
            <i className="fas fa-user"></i>Sign into your account
          </p>
        </div>

        <div className="form">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={state.email}
            onChange={onChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={state.password}
            onChange={onChange}
          />
        </div>

        <div className="login-actions">
          <button className="btn btn-primary" onClick={onSubmit}>
            Sign in!
          </button>
          <p className="my-1">
            No account?{" "}
            <Link
              to={`/register?role=customer${
                hasRedirect ? "&redirect=" + redirect : ""
              }`}
            >
              Sign up!
            </Link>
          </p>
        </div>
      </div>

      <div className="ball-1"> </div>
      <div className="ball-2"> </div>
      <div className="ball-3"> </div>
      <div className="ball-4"> </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, addToCart })(
  withRouter(Login)
);
