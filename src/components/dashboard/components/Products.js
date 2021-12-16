import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getInstructorProducts } from "../../../actions/productsAction";
import Product from "../../general/Product";
import { decodeUser } from "../../../util";

const Products = (props) => {
  const [state, setState] = useState({ merchantProducts: [] });

  useEffect(() => {
    //setting the next props as an array of the user's products
    props.getInstructorProducts(decodeUser().user.id);
  }, []);

  useEffect(() => {
    if (props && props.products && props.products.products.length > 0) {
      //retreiving that array
      const merchantProducts = props.products.products;
      setState({ merchantProducts });
    }
  }, [props]);

  const productDetails = (product) => {
    return (
      <ul>
        <li>${product.price}</li>
        <li>Stock:{product.quantity}</li>
      </ul>
    );
  };

  const { merchantProducts } = state;
  return (
    <div className="row">
      {merchantProducts.map((product, index) => (
        <Product
          product={product}
          description={productDetails(product)}
          buttonName="Add Images"
          buttonLink={`/dashboard/products/${product._id}/addImages`}
          thumbnail={product.thumbnail}
          showBtn={true}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getInstructorProducts })(Products);
