import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { Empty, Button, List, Skeleton, Avatar } from "antd";
import NavBar from "../general/NavBar";
import { Payment } from "./Payment";
import { getCart, removeFromCart } from "../../actions/cartActions";

const Cart = (props) => {
  const [state, setState] = useState({
    cart: {},
  });

  useEffect(() => {
    props.getCart();
  });

  useEffect(() => {
    if (props && props.cart && props.cart.cart) {
      setState({ cart: props.cart.cart });
    }
  }, [props]);

  const removeProduct = (product) => {
    const id = props.cart.cart._id;
    const context = { id, product };
    props.removeFromCart(context).then((_) => {
      props.getCart();
      window.location.reload();
    });
  };

  const calculateTotal = () => {
    let total = 0;
    const cartProducts = state.cart.products;
    if (!isEmpty(cartProducts)) {
      cartProducts.forEach((product) => {
        total += product.price;
      });
    }

    return total;
  };

  const { cart } = state;
  return (
    <Fragment>
      <NavBar />
      <div className="container">
        {isEmpty(cart.products) ? (
          <div>
            <Empty
              image="\assets\images\shopping-cart.png"
              description="Your cart is empty, go shop!"
              imageStyle={{
                height: 60,
                width: 50,
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            >
              <Link to="/" className="btn btn-primary">
                Keep Shopping
              </Link>
            </Empty>
          </div>
        ) : (
          <div>
            <h1>Your current cart</h1>
            {/* rendering an antd list with the product's data */}
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={cart.products || []}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link to="#" keys="list-loadmore-edit">
                      <Button
                        style={{ border: "white", color: "#1e47a56" }}
                        onClick={(_) => removeProduct(item._id)}
                      >
                        Remove from cart
                      </Button>
                    </Link>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={100}
                          src={item.thumbnail}
                        />
                      }
                      title={
                        <Link to={`/products/` + item._id}>{item.name}</Link>
                      }
                      description={item.description}
                    />
                    <div>
                      <b>{`$ ${item.price}`}</b>
                    </div>
                  </Skeleton>
                </List.Item>
              )}
            />
            <div className="col-sm-4 col-md-4 col-lg-4">
              <br />
              <br />
              <h4>{`Subtotal: $ ${calculateTotal()}`}</h4>
              <Payment cart={cart} total={calculateTotal()} />
              <br />
              {cart.products && <Link to="/">Or keep shopping</Link>}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { getCart, removeFromCart })(Cart);
