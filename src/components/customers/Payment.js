import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { getServer } from "../../util";
import { message } from "antd";

export const Payment = (props) => {
  let handleToken = async (token, address) => {
    const config = {
      headers: {
        "Content-Type": "application/json", //setting the headers in React like in Postman
      },
    };
    const context = {
      token,
      cart: props.cart,
      total: props.total * 100,
    };
    const res = await axios.post(`${getServer()}/api/payment`, context, config);
    if (res.data.status === 200) {
      message.success("Thank you for your purchase!");
      window.location.replace("/");
    } else {
      message.error("Something went wrong");
    }
  };
  handleToken = handleToken.bind(this);
  return (
    <div>
      {/* stripe checkout is a component for collecting and processing payment info
                appears as a pay button, on execution, it generates a modal */}
      <StripeCheckout
        stripeKey="pk_test_51JmbjQCjbjmMgMWBsxF2dqyRi96i5xmFL0RfcuybAcBsTwIlLjvUp73lw8iqNa3WLTPHQ8TnAashYBMQRgGjPZxn00pUAPnpiU"
        // what to do when you get a token
        token={handleToken}
        shippingAddress
        billingAddress
        //pay attention! price is always in cents
        amount={props.total * 100}
        name="Check out"
      />
    </div>
  );
};
