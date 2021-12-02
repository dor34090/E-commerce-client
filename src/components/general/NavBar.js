
import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
//in react you can use link instead of href

const NavBar= ({auth: {isAuthenticated}, logout, auth}) =>{
    
    const buyer = (
        <ul>
        <li>
            <Link to="/register?role=merchant">Become a Merchant </Link>
        </li>
        
        <li>
                <Link to="/cart"><i className="fas fa-shopping-cart"></i>

Cart</Link>
            </li>
        <li>
            <Link onClick={logout} to="#!">
            <i class="fas fa-sign-out-alt">
                <span className="hide-on-mobile">
                </span> 
                </i>
                Sign Out
                </Link>
        </li>
    </ul>
    )
    const merchant = (
        <ul>
        
        <li>
            <Link to="/dashboard">Dashboard </Link>
        </li>
        <li>
                <Link to="/cart"><i className="fas fa-shopping-cart"></i>

Cart</Link>
            </li>
        <li>
            <Link onClick={logout} to="#!">
            <i class="fas fa-sign-out-alt">
                <span className="hide-on-mobile">
                </span> 
                </i>
                Sign Out
                </Link>
        </li>
    </ul>
    )
    const guest = (
        <ul>
            <li>
                <Link to="/cart?redirect=/cart"><i className="fas fa-shopping-cart"></i>

Cart</Link>
            </li>
            <li>
            <Link to="/dashboard">Dashboard </Link>
        </li>
        <li>
            <Link to="/register?role=merchant">Merchants </Link>
        </li>
        <li>
            <Link to="/register?role=buyer"><i class="fas fa-user-plus"></i>Register </Link>
        </li>
        <li>
            <Link to="/login"><i class="fas fa-sign-in-alt"></i>Login </Link>
        </li>
    </ul>
    )
  return (
    <nav className="main-navbar bg-main" >
        <h1>
            <Link to="">
                <i className="fas fa-store"></i> e-Shop
            </Link>
        </h1>
        {isAuthenticated&&(auth.user.role === "buyer") ? buyer : isAuthenticated&&(auth.user.role === "merchant") ? merchant : guest}
    </nav>
  );
}

const mapStateToProps = state =>({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout})(NavBar);