import React  from "react";
import {useEffect} from "react";
import {Provider } from "react-redux";
import { decodeUser } from "./util";
import {addToCart} from "./actions/cartActions";
import {Link, BrowserRouter as Router, Route,Switch } from "react-router-dom";
//importing general components
import ProtectedRoutes from "./components/general/protectedRoutes";
import './App.css';
//landing component
import landing from "./components/landing";
import ProductDetails from "./components/landing/ProductDetails";


import store from "./store";
import setAuthToken from "./util/setAuthToken";

//dashboard components
import AddImages from "./components/dashboard/components/AddImages";
import Dashboard from "./components/dashboard";
import Home from "./components/dashboard/components/Home";
import AddProduct from "./components/dashboard/components/AddProduct";
import products from "./components/dashboard/components/Products";
import AddProfile from "./components/dashboard/components/AddProfile";
import Profile from "./components/dashboard/components/Profile";
//customers components
import Cart from "./components/customers/Cart";
//user components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "antd/dist/antd.css";
import { setCurrentUser } from "./actions/authActions";
import Products from "./components/dashboard/components/Products";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App(props) {
  useEffect(() =>{
    store.dispatch(setCurrentUser())
  }, [])
  const grabProductsFromStorage = () => {
      const userId = decodeUser().user.id;
      const cartProducts = JSON.parse(localStorage.getItem("products"))
      //the context is what we send to the backend
      //the backend expects for a cart at least products and a user's id
      const context = {products: cartProducts, userId}
      store.dispatch(addToCart(context));
      localStorage.removeItem("products");
      //resetting the local storage after we added the products to the user's cart
  }
  if(localStorage.getItem("token")&& localStorage.getItem("products")){
      grabProductsFromStorage()
  }
  return (
    //now the app is interacting with everything in the store.js
    <Provider store={store}>
    <Router>
    <div className="App">

      <Route exact path="/" component= {landing} />
      <Route exact path="/products/:id" component= {ProductDetails} />
      <Switch>
      <ProtectedRoutes exact path="/dashboard" component = {()=>(<Dashboard {...props} nestedRoute={Home}/>)} />
      <ProtectedRoutes exact path="/dashboard/addProduct" component = {()=>(<Dashboard {...props} nestedRoute={AddProduct}/>)} />
      <ProtectedRoutes exact path="/dashboard/products/:id/addImages" component = {()=>(<Dashboard {...props} nestedRoute={AddImages}/>)} />
      <ProtectedRoutes exact path="/dashboard/products" component = {()=>(<Dashboard {...props} nestedRoute={Products}/>)} />
      <ProtectedRoutes exact path="/dashboard/profile" component = {()=>(<Dashboard {...props} nestedRoute={Profile}/>)} />
      <ProtectedRoutes exact path="/dashboard/addProfile" component = {()=>(<Dashboard {...props} nestedRoute={AddProfile}/>)} />
      <ProtectedRoutes exact path="/cart" component={Cart}/>
      <Route exact path="/register" component= {Register}/>
      <Route exact path="/login" component= {Login}/>
      </Switch>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
