import React,{useState, useEffect} from 'react'
import {Link, useHistory } from 'react-router-dom'
import { cartEmpty, loadCart } from './helper/CartHelper'
import { getmeToken, processPayment } from './helper/PaymentHelper'
import {createOrder} from './helper/OrderHelper'
import { isAutheticated } from '../auth/helper'
import DropIn from "braintree-web-drop-in-react";
import GooglePayButton from '@google-pay/button-react';
import "../styles/payment.css"
import showRazorpay from './razorpay'


const  Payments=({products,setReload=f => f, reload=undefined})=> {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
      });
      
      const userId = isAutheticated() && isAutheticated().user._id;
      const token = isAutheticated() && isAutheticated().token;
    
      const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
          // console.log("INFORMATION", info);
          if (info.error) {
            setInfo({ ...info, error: info.error });
          } else {
            const clientToken = info.clientToken;
            setInfo({ clientToken });
          }
        });
      };
    
      const showbtdropIn = () => {
        return (
          <div>
            {info.clientToken !== null && products.length > 0 ? (
              <div>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={instance => (info.instance = instance)}
                />
               {!isAutheticated()? <button className="btn btn-block btn-warning" ><Link to="/signin">Sign In to buy the product</Link></button> : <button className="btn btn-block btn-success" onClick={onPurchase}>
                  Buy
                </button>}
              </div>
            ) : (
              <h3> Your Cart is Empty</h3>
            )}
          </div>
        );
      };
    
      useEffect(() => {
        getToken(userId, token);
        showbtdropIn()
        getAmount()
      }, []);
    
      const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processPayment(userId, token, paymentData)
            .then(response => {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              const orderData = {
                products: products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
                status: 'Recived' 
            };
              createOrder(userId, token, orderData);
              cartEmpty();
    
              setReload(!reload);
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });
      };
   
    const getAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
          
        });
         
        return amount;
      };
    
      return (
        <div>
          {products.length >0 ?<h3>Your bill is {getAmount()} $</h3>: ''}
          {showbtdropIn()}
          <h4>Or use</h4>
          <GooglePayButton
          className="gpaybutton"
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: `${getAmount()}`,
      currencyCode: 'USD',
      countryCode: 'US',
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION'],
    shippingAddressRequired: true,

  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
  onPaymentAuthorized={paymentData=>{
    console.log('Payment autharize success', paymentData);
    return {transactionState: 'SUCCESS'}
  }}

  buttonType="long"
/> 
{/* <h4>Or Use</h4>
<button type="button"  class="btn btn-primary btn-lg btn-block"><a onClick={showRazorpay}>Rezorpay</a></button> */}
        </div>
      );
    
}

export default Payments;



 