import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import {getProduct} from "../../actions/productsAction";
import { Spin, Button, Carousel } from 'antd';
import NavBar from "../general/NavBar";
import { Rate, Modal, Alert, Tabs } from 'antd';
import {isEmpty} from "lodash";
import { List } from "rc-field-form";
import {Link} from "react-router-dom";
import { getProfile } from "../../actions/profileActions";
import { addToCart } from "../../actions/cartActions";
import { decodeUser } from "../../util";
import "bootstrap/dist/css/bootstrap.min.css";

class ProductDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            products: null,
            visible: false,
            images: [],
            gotProfile: false,
        }
        

        
    }
    
    

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps && nextProps.product)
        {
            const product = nextProps.product;
            let images = [];
            images.push(product.thumbnail);
            images = [...images, ...product.images];
            this.setState({product, images});
            //preventing an infinite loop of receiving props from server
            if(!this.state.gotProfile){
                this.props.getProfile(product.userId);
                this.setState({gotProfile: true});
            }
        }
    }
    showModal = () => {
        this.setState({visible:true});
      };
    
    handleOk = () => {
        this.setState({visible:false});
      };
    
    handleCancel = () => {
        this.setState({visible:false});
      };

    registerModal = (product) =>{
        return(
            
             <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer= {[
                 <Button key="back" onClick={this.handleCancel}>Close</Button>
             ]}>
        <div>
            <br/>
            <Alert
            message={
                <center>
                    <span>
                        <strong>Added</strong> {product.name} to cart
                    </span>
                </center>
            }
            type="success"/>
            <br/>
            <center>
                <Link to="/cart?redirect=/cart">
                    <Button key="submit" type="primary">Go to cart</Button>
                </Link>
            </center>
        </div>
      </Modal>);
    }

    async addProductToCart(product) {
        //checking if user is signed in
        //if the user is not signed in, we will save the product to the local storage until the user signs in
        if(!localStorage.getItem("token")){
            //checking if there's a "products" array in the local storage
            const productExists = !isEmpty(localStorage.getItem("products"))
            if(productExists){
                const products = JSON.parse(localStorage.getItem("products"))
                //xx.push adds an item to the end of an array
                products.push(product._id);
                this.showModal()
                return localStorage.setItem("products", JSON.stringify([product._id]));
            }
            //setting a "products" array in the local storage if there isn't one
            else{
                this.showModal()
                return localStorage.setItem("products", JSON.stringify([product._id]));
            }
        }

        const userId = decodeUser().user.id;
        
        const context = {products:[product._id], userId};
        await this.props.addToCart(context);
        this.showModal();
    }

    render(){
        const {product, images} =this.state;
        const {profile} = this.props;
        const {TabPane} = Tabs;
        let facebook, instagram, twitter, linkedin, youtube = "";
        if(profile && profile.socialMedia){
            if(profile.socialMedia.facebook && !profile.socialMedia.facebook.substring(0, 4).includes("http")){
                    facebook = `http://${profile.socialMedia.facebook}`;
            }
            else {
                    facebook = profile.socialMedia.facebook;
            }
            if(profile.socialMedia.instagram && !profile.socialMedia.instagram.substring(0, 4).includes("http")){
                instagram = `http://${profile.socialMedia.instagram}`;
            }
            else {
                instagram = profile.socialMedia.instagram;
            }
            if(profile.socialMedia.twitter && !profile.socialMedia.twitter.substring(0, 4).includes("http")){
                twitter = `http://${profile.socialMedia.twitter}`;
            }
            else {
                twitter = profile.socialMedia.twitter;
            }
            if(profile.socialMedia.linkedin && !profile.socialMedia.linkedin.substring(0, 4).includes("http")){
                linkedin = `http://${profile.socialMedia.linkedin}`;
            }
            else {
                linkedin = profile.socialMedia.linkedin;
            }
            if(profile.socialMedia.youtube && !profile.socialMedia.youtube.substring(0, 4).includes("http")){
                youtube = `http://${profile.socialMedia.youtube}`;
            }
            else {
                youtube = profile.socialMedia.youtube;
            }
        }
        
        return(
            
            <Fragment>

            <NavBar />
            <div className="container">
             
                {product ? 
                <Fragment>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                    <Carousel autoplay>
                        {images.map((image, index) =>(
                            <div>
                                <img
                          className="d-block"
                          style={{width:"300px"}}
                          src={image}
                          alt="First slide"
                        />
                            </div>
                        ))}
                    </Carousel>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                            <h1 style={{margin:"0"}}>{product.name}</h1>
                            <p className="lead" style={{margin:"0"}}>{product.description}</p>
                            <ul style={{margin:"0", position:"relative", right:"25px"}}>
                                {product.features.map((feature, index)=>
                                feature !== "" ? <li key={index} >-{feature}</li> : <li key={index} >{feature}</li>)}
                            </ul>
                            <Rate disabled defaultValue={product.rating} style={{margin:"0"}} />
                            <p className="lead" style={{margin:"0"}}>Stock:{product.quantity}</p>
                            <h1 style={{margin:"0"}}>${product.price}</h1>
                            <button 
                            className="btn btn-primary"
                            //the function is called in call back
                            //if we don't do that the function will run the moment the button loads and not when it's clicked 
                            onClick={(_) => this.addProductToCart(product)}>
                                Add to cart
                                </button>

                        </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <h1>Product Details</h1>
                <p className="lead"><b><ul style={{margin:"0", position:"relative", right:"25px"}}>
                                {product.features.map((feature, index)=>
                                feature !== "" ? <li key={index} >-{feature}</li> : <li key={index} >{feature}</li>)}
                            </ul></b></p>
                            <p>No more features listed</p>
                </Fragment>
                :<Spin size="large"/> }
                <br/>
                <h3>Seller's information</h3>
                
                {this.props.profile &&  <Fragment>
                <Tabs defaultActiveKey="1" >
    <TabPane tab="About seller" key="1">
      {profile.bio && <p className="lead">{profile.bio}</p>}
    </TabPane>
    <TabPane tab="Contact info" key="2">
      <p className="lead">Address: {profile.address}</p>
      {profile.website && <p className="lead">Website: {profile.website}</p>}
    </TabPane>
    <TabPane tab="Social Media" key="3">
        <h4>Follow us on:</h4>
      <div className="flex">
          {facebook && <span className="social_icons"><a href={facebook} target="_blank"><i className="fab fa-facebook fa-2x"></i>

</a></span>}
{instagram && <span className="social_icons"><a href={instagram} target="_blank"><i class="fab fa-instagram fa-2x"></i>

</a></span>}
{twitter && <span className="social_icons"><a href={twitter} target="_blank"><i class="fab fa-twitter fa-2x"></i>

</a></span>}
{youtube && <span className="social_icons"><a href={youtube} target="_blank"><i class="fab fa-youtube fa-2x"></i>

</a></span>}
{linkedin && <span className="social_icons"><a href={linkedin} target="_blank"><i class="fab fa-linkedin fa-2x"></i>

</a></span>}

      </div>
    </TabPane>
  </Tabs>
  </Fragment>}
            </div>
            {product && this.registerModal(product)}
            </Fragment>
            
        );
    }
}


const mapStateToProps=(state)=>({
    //state.products is calling the reducer, state.products.product is calling the specific object inside the state
    product: state.products.product,
    profile: state.profile.profile,
});


export default connect(mapStateToProps, {getProduct, addToCart, getProfile})(ProductDetails);