import React, {Component} from "react";
import Input from "../general/Input";
import {Link} from "react-router-dom";
import { message } from "antd";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {login} from "../../actions/authActions"; 
import { combineReducers } from "../../reducers";
import NavBar from "../general/NavBar";
import {decodeUser} from "../../util";
import {addToCart} from "../../actions/cartActions";

class Login extends Component {
    constructor(){
        super()
        this.state={
            
            email:"",
            password:"",
            
        };
        //gives me the option to type in my forms{
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const search = this.props.location.search ;
        let split = search.split("redirect=");
        const hasRedirect = search.includes("redirect=");
        split = split[split.length-1];

        if(nextProps && nextProps.errors && nextProps.errors.length > 0){
            nextProps.errors.forEach((error) =>{
              message.error(error.msg)  
            });
        }
        if(nextProps.isAuthenticated){
                if(split && hasRedirect){
                    if(split === "/cart" && localStorage.getItem("token")&& localStorage.getItem("products")){
                        //sending all saved products to user's cart, if they exist
                        const userId= decodeUser().user.id;
                        const products = JSON.parse(localStorage.getItem("products"));
                        const context = {products: products, userId};
                        this.props.addToCart(context);
                        localStorage.removeItem("products");
                        console.log("1");
                    }
                    this.props.history.push(split);
                }else{
                    message.success("Sign in successful");
                    setTimeout(()=> this.props.history.push("/", 3000));
                }
            
        }
    }

    onChange(e){
        console.log(e)
        this.setState({[e.target.name]: e.target.value});
    };
onSubmit(e){
    const {email, password} = this.state
    const user = {
        email, password
    };
    this.props.login(user);
}

render(){
    const search = this.props.location.search ;
    //returns an array of everything before and after the value
    const split = search.split("redirect=");
    const redirect = split[split.length-1];
    //making sure that conditions for lines 50-53 were met
    //if not, then we know they weren't even executed
    const hasRedirect = redirect.length > 0 && search.includes("redirect");
    return(
        <div>
            <NavBar />
        
    <div className="container">
        <h1 className="large text-primary">Sign in</h1>
        <p className="lead"><i className="fas fa-user"></i>Sign into your account</p>
        <div className="form">
                    <Input name="email" type="email" placeholder="Enter Email" value={this.state.email} onChange={this.onChange}/>
                </div>
                <div className="form">
                    <Input name="password" type="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.onSubmit}>Sign in!</button>
                {/* if the user has a redirect (i.e coming from an attempt to create a cart)*/}
                {/* then the params should be passed to the register  */}
                <p className="my-1">No account? <Link to={`/register?role=customer${hasRedirect ? "&redirect=" + redirect : ""}`}>Sign up!</Link></p>
    </div>
    </div>)
}}

const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.auth.errors,
    isAuthenticated : state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login, addToCart})(withRouter(Login));
