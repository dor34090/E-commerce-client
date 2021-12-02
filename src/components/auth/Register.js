import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Input from "../general/Input";
import {register} from "../../actions/authActions";
import { message } from "antd";
import NavBar from "../general/NavBar";
import { sortedLastIndex } from "lodash";
import { decodeUser } from "../../util";
import {addToCart} from "../../actions/cartActions";

class Register extends Component {
    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            password:"",
            password2:""
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

        if(nextProps && nextProps.auth.errors && nextProps.auth.errors.length > 0){
            nextProps.auth.errors.forEach((error) =>{
              message.error(error.msg)  
            });
        }
        if(nextProps.auth.isAuthenticated){
            if(split && hasRedirect){
                if(split === "/cart" && localStorage.getItem("token")&& localStorage.getItem("products")){
                    //sending all saved products to user's cart, if they exist
                    const userId= decodeUser().user.id;
                    const products = JSON.parse(localStorage.getItem("products"));
                    const context = {products: products, userId};
                    this.props.addToCart(context);
                    localStorage.removeItem("products");
                }

                this.props.history.push(split);
            }
            else{
                message.success("Sign up successful");
            setTimeout(()=> this.props.history.push("/", 3000));
            }
            
        }
    }
    onChange(e){
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    };
    //}
    onSubmit(){
        let role =this.props.location.search.split("?role=");
        role = role[role.length -1];
        const {name, email, password} = this.state
        const newUser ={
            name,
            email,
            password,
            role,
        };
        if(password === this.state.password2){
            this.props.register(newUser);
        }
        else{
            message.error("password don't match");
        }
    }
    render() {
        const {name, password, password2, email} = this.state;
        
        return(
            <div>
                <NavBar/>
            <div className="container">
                <h1 className="large text-primary">Register</h1>
                <p className="lead"><i className="fas fa-user"></i>Create a new account</p>
                <div className="form">
                    <Input name="name" type="text" placeholder="Enter Name" value={name} onChange={this.onChange}/>
                </div>
                <div className="form">
                    <Input name="email" type="email" placeholder="Enter Email" value={email} onChange={this.onChange}/>
                </div>
                <div className="form">
                    <Input name="password" type="password" placeholder="Enter Password" value={password} onChange={this.onChange}/>
                </div>
                <div className="form">
                    <Input name="password2" type="password" placeholder="Confirm Password" value={password2} onChange={this.onChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.onSubmit}>Register now!</button>
            </div>
            </div>
        )
    }
}
//each form div is a part of the registration process made simpler with the Input component
const mapStateToProps = (state) =>({
    auth: state.auth,
});

export default connect(mapStateToProps, {register, addToCart})(withRouter(Register));