import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";


const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayement`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        //call further methods
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51I3NE2K6O26LlnI8kA08eV2RzMWhOyagOtg8hqG9qhiyiUIrdLFoKDUx0cQLvVCOkW5MM1VEg9opdo9VCqKMA7lj003nPemz5g"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
