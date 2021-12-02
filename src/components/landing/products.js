import React, {Component} from "react";
import {connect} from "react-redux";
import {getProducts} from "../../actions/productsAction";
import { combineReducers } from "redux";
import {Card} from "antd";
import Product from "../general/Product";
const {Meta}= Card;

class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }
    componentDidMount(){
        this.props.getProducts();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.products.products){
            const products = nextProps.products.products;
            this.setState({products});
        }
    }

    productDetails = (product)=>{
        return(
            <ul>
                <li>${product.price}</li>
                <li>Stock:{product.quantity}</li>
            </ul>
        )
    }
    render() {
        const {products} = this.state;
        console.log({products});
        return<div className="container-flex">
            
            <div className="row" style={{flexFlow:"column-wrap"}}>
                {products.map((products, index)=>(
                     <Product key={index} product={products} description={this.productDetails(products)} link={`products/${products._id}`} thumbnail={products.thumbnail}/>
                  
                ))}
            </div>
        </div>
            
            
    
    }
}

const mapStateToProps = (state) =>({
    products: state.products
});
export default connect(mapStateToProps, {getProducts}) (Products);