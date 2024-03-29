import React,{useEffect,useState} from 'react'
import { Redirect } from 'react-router-dom';
import ImageHelper from '../user/helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
 import "../styles/card.css";

    
    const Card = ({product, addtoCart= true, removeFromCart=false,setReload=f=>f,reload=undefined
    }) => {


const [redirect, setRedirect]= useState(false)
const [count, setCount] = useState(product.count)

const cardTitle= product?product.name:'a photo'
const cardDescription= product?product.description:'a default description'
const cardPrice= product? product.price :'default'
const cardStock= product?product.stock: '0'
const cardCatName= product?product.category.name:'default category'

const addToCart=()=>{
  addItemToCart(product, ()=>setRedirect(true))
}

const getARedirect=(redirect)=>{
  if(redirect){
    return <Redirect to='/cart'/>
  }
}

const showAddToCart = addtoCart => {
  return (
    addtoCart && (
      <button
        onClick={addToCart}
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>
    )
  );
};


        const showRemoveFromCart=(removeFromCart)=>{
           return (
            removeFromCart&& ( <button
            onClick={() => {
              removeItemFromCart(product._id)
              setReload(!reload)
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
            
           ))
        }
        return (
          <div className="card text-white bg-dark border border-info " >
            <div className="card-header text-uppercase lead">{cardTitle}</div>
            <div className="card-body">
            {getARedirect(redirect)}
              <ImageHelper  product={product}/>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
              <div className="row">
              <p className="col-sm-6 mx-auto bg-info" >
               Stock: {cardStock}
              
              </p>
              {/* <p className="col-8 bg-warning"> Category:  {cardCatName}</p> */}
              </div>
              
              <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                 {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };
    
  export default Card;

// return (
//   <div class="card" style="width: 18rem;">
//     <ImageHelper  product={product} className="card-img-top"/>
//   <div class="card-body">
//   {getARedirect(redirect)}
           
//     <h5 class="card-title">{cardTitle}</h5>
//     <p class="card-text"> {cardDescription}</p>
//     <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
//               <div className="row">
//                 <div className="col-12">
//                   {showAddToCart(addtoCart)}
//                 </div>
//                 <div className="col-12">
//                  {showRemoveFromCart(removeFromCart)}
//                 </div>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>

//)