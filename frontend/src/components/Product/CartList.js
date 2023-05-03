import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../../actions/cartActions";
import {Link, useNavigate} from "react-router-dom"
import "./CartList.css";
import "./Products.css";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";


const CartList = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {cartItems}=useSelector((state)=>state.cart)
  const {isAuthenticated}=useSelector((state)=>state.user)
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  //increase quantity of items in cart
  const increaseCount=(id,count,stock)=>{
    const newCount=count+1;
    if(stock<=count){
      return;
    }
    dispatch(addToCart(id,newCount));
  }

  //decrease quantity of items in cart
  const decreaseCount=(id,count)=>{
    const newCount=count-1;
    if(count<=1){
      return;
    }
    dispatch(addToCart(id,newCount));
  }

  //delete items of cart
  const deleteCartItems=(id)=>{
    dispatch(removeFromCart(id));
  }

  
  
  
  //display cart items
  const handlecartevent=()=>{
    if(cartItems.length>0){
      return cartItems.map((item)=> (
        <div className="row border-top border-bottom">
        <div className="row main align-items-center">
        <Link to={`/products/${item.product}`}>
          <div className="col-2">
            <img 
              className="img-fluid"
              src={item.image}
              alt={item.name}
            />
          </div>
          <div className="col" id="colid">
            <div className="row" id="itemname">{item.name}</div>
            <div className="row text-muted" id="itemprice">₹ {item.price}</div>
          </div>
          </Link>
          <div className="col" id="colid2">
            <button id="minusplusbtn" onClick={()=>decreaseCount(item.product,item.count)}>
              -
            </button>
            <a href="#" id="border">
              {item.count}
            </a>
            <button id="minusplusbtn" onClick={()=>increaseCount(item.product,item.count,item.stock)}>
              +
            </button>
          </div>
          <div className="col" id="priceid">
          <p>₹ {item.count * item.price} </p>
          
          <svg onClick={() => deleteCartItems(item.product)} className="deletesvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
          </div>
        </div>
      </div>

      ))
    }
    else{
      return <p className="noreview">No Products in cart</p>
    }
  }

  //display Grand Total Price 
  const handleGrandTotalPrice=()=>{
    if(cartItems.length>=1){
      return <div className="col text-right" id="colid">
      {`₹ ${40 + cartItems.reduce((acc,item)=> acc+item.count * item.price,0)}`}
     </div>
    }
    else{
      return <div className="col text-right" id="colid">
      {`₹ 0`}
     </div>
    }
  }
  
  return (
    <>
    {
      loading? 
      <Loader></Loader>: 
      <>
      <MetaData title="Cart | EcoCart"></MetaData>
       <div className="cartcard">
      <div className="row">
        <div className="col-md-8 cart">

          {/* Title row */}
          <div className="title" id="titleid">
            <div className="row">
              <div className="col" id="colid">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div
                className="col align-self-center text-right text-muted"
                id="colid"
              >
                Total items: {cartItems.length}
              </div>
            </div>
          </div>

          {/* Each Cart Items List */}

          {
            handlecartevent()
          }
         
          
         
          <div className="back-to-shop">
            
            <span id="backtoshop" onClick={()=>navigate('/products')}><i class="fa fa-arrow-circle-left"></i>   Back to shop</span>
          </div>
        </div>
        <div className="col-md-4 summary">
          <div>
            <h5 className="h5className">
              <b>Summary</b>
            </h5>
          </div>
          <hr className="hrclassName" />
          <div className="row1">
            <div className="col" id="colid">
              ITEMS {cartItems.length}
            </div>
            {/* style="padding-left:0;" */}
            <div className="col text-right" id="colid">
            {`₹ ${cartItems.reduce((acc,item)=> acc+item.count * item.price,0)}`}
            </div>
          </div>
          <form className="shippingform">
            <p>SHIPPING</p>
            <select>
              <option className="text-muted">
                Delivery Charges- ₹ 40.00
              </option>
            </select>
            <p>GIVE CODE</p>
            <input id="code" placeholder="Enter your code" />
          </form>
          <div className="row2">
            {/* style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;" */}
            <div className="col" id="colid">
              TOTAL PRICE
            </div>
            {
              handleGrandTotalPrice()
            }
          </div>
          <button className="checkoutbtn" onClick={()=>navigate('/shipping')}>CHECKOUT</button>
        </div>
      </div>
    </div>
      </>
    }
    
   
    </>
  );
};

export default CartList;
