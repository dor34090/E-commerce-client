import React, { useEffect, useState } from "react";
import { Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, setRole } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
//in react you can use link instead of href

const NavBar = (
  { auth: { isAuthenticated }, logout, setRole, auth },
  props
) => {
  const confirm = (e) => {
    e.preventDefault();
    setRole();
    message.success("You are now a merchant!");
    window.location.reload(false);
  };

  const cancel = (e) => {
    message.error("Role was not set");
  };

  const buyer = (
    <ul>
      <li>
        <Popconfirm
          title="Do you want to become a merchant?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Link to="">Become a merchant</Link>
        </Popconfirm>
      </li>

      <li>
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
          Cart
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt">
            <span className="hide-on-mobile"></span>
          </i>
          Sign Out
        </Link>
      </li>
    </ul>
  );
  const merchant = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard </Link>
      </li>
      <li>
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
          Cart
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt">
            <span className="hide-on-mobile"></span>
          </i>
          Sign Out
        </Link>
      </li>
    </ul>
  );
  const guest = (
    <ul>
      <li>
        <Link to="/cart?redirect=/cart">
          <i className="fas fa-shopping-cart"></i>
          Cart
        </Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard </Link>
      </li>
      <li>
        <Link to="/register?role=merchant">Merchants </Link>
      </li>
      <li>
        <Link to="/register?role=buyer">
          <i className="fas fa-user-plus"></i>Register{" "}
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt"></i>Login{" "}
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="main-navbar bg-main">
      <h1>
        <Link to="">
          <i className="fas fa-store"></i> e-Shop
        </Link>
      </h1>
      {isAuthenticated && auth.user.role === "buyer"
        ? buyer
        : isAuthenticated && auth.user.role === "merchant"
        ? merchant
        : guest}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, setRole })(NavBar);
