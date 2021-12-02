import React, {Component} from "react";
import { connect } from "react-redux";
import {getInstructorProducts} from "../../../actions/productsAction";
import Product from "../../general/Product";
import { decodeUser } from "../../../util";

class Products extends Component{

    constructor(props){
        super(props);
        this.state={
            merchantProducts:[]
        } 
    }

    componentDidMount(){
        //setting the next props as an array of the user's products
        this.props.getInstructorProducts(decodeUser().user.id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps&&nextProps.products&& nextProps.products.products.length > 0)
        {
            //retreiving that array
            const merchantProducts= nextProps.products.products;
            this.setState({merchantProducts});
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

    render(){
        const {merchantProducts} = this.state;
        return( <div className="row">
             {merchantProducts.map((product, index) =>(
                <Product product={product} description={this.productDetails(product)} buttonName="Add Images" buttonLink={`/dashboard/products/${product._id}/addImages`} thumbnail={product.thumbnail} showBtn={true}/>
             ))}

        </div>
        );
    }
}

const mapStateToProps=(state)=>({
    products: state.products,
});

export default connect(mapStateToProps, {getInstructorProducts})(Products);