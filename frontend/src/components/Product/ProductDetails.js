import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import "./Products.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ReactStars from 'react-rating-stars-component'
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import PageNav from "../Home/PageNav";


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const alert=useAlert();
  

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const {isAuthenticated}=useSelector(state=>state.user)
  

  const [count,setCount]=useState(1);
 
  const decrease=(e)=>{
    if(count>1){
      setCount(count=>count-1)
    }
      
    
  }
  const increase=(e)=>{
    if(count<product.stock){
      setCount(count=>count+1);
      
    }
    
}
  const { id } = useParams();
useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }
    
    
  }, [dispatch, id,error,alert,product]);
  


  const handleCart=()=>{
    
    dispatch(addToCart(id,count))
    alert.success("Items added to cart")
  }

  


  const options={
    edit: false,
    value: product.ratings,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600? 15:18
  }

  return (
    <>
    {loading ? (
      <Loader></Loader>
    ):(
      <>
      {/* <MetaData title={`${product.name} | EcoCart`}></MetaData>
      <PageNav></PageNav> */}
      {/* <div className='ProductDetails'>
        <div>
        <Carousel>
            {
              
              product.images && product.images.map((item,i)=>(
                
                <img className='CarouselImage' src={item.url} key={item.url} alt={`${i} Slide`}></img>
              ))
            }
          </Carousel>
        </div>
        <div>
          <div className="display-block-1">
            <h1></h1>
          </div>
        </div>
    </div> */}
    {
      isAuthenticated && <svg onClick={()=>navigate('/cart')} className="cartsvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
    }
  
  <div className="homeheading">Product Details</div>
      <div class="container d-flex justify-content-center" id="productDetailsContainer">
        <figure class="card2 card-product-grid card-lg">
          {" "}
          <div class="img-wrap" data-abc="true">
            {product.images &&
              product.images.map((item, i) => (
                <img src={item.url} key={item.url} alt={`${i} Slide`}></img>
              ))}
          </div>
          <figcaption class="info-wrap">
            <div class="row" id="rowid">
              <div class="col-md-6 col-xs-6">
                {" "}
                <div class="title" data-abc="true">
                  {product.name}
                </div>{" "}
                
              </div>
              <div class="col-md-6 col-xs-6">
                <div class="rating text-right">
                  {" "}
                  
                  <ReactStars {...options}></ReactStars>
                  <span class="rated">{product.noOfReviews} Reviews</span>{" "}
                </div>
              </div>
            </div>
          </figcaption>
          <div class="bottom-wrap-payment">
            <figcaption class="info-wrap">
              <div class="row">
                <div class="col-md-6 col-xs-6">
                  {" "}
                  <div class="title" data-abc="true">
                    ₹ {product.price}
                  </div>
                  {/* <span class="rated">VISA Platinum</span>  */}
                </div>
                <div class="col-md-6 col-xs-6">
                  <div class="rating text-right"><b>Category: </b>{product.category}</div>
                </div>
              </div>
            </figcaption>
          </div>
          <div class="bottom-wrap-payment">
            <figcaption class="info-wrap">
              <div class="row">
                <div class="col-md-6 col-xs-6">
                  {" "}
                  <div class="title" data-abc="true">
                    Status: {" "}
                    <b className={product.stock<1 ? "redcolor":"greencolor"}>
                        {product.stock <1? "Out of Stock" : "In Stock"}
                    </b>
                    
                  </div>
                  {/* <span class="rated">VISA Platinum</span>  */}
                </div>
                <div class="col-md-6 col-xs-6">
                  <div class="rating text-right">
                    <b>Description: </b> {product.description}
                  </div>
                </div>
              </div>
            </figcaption>
          </div>
          <div className="cartinput">
            <div class="col-md-6 col-xs-6">
              <div className="quantbox">
            <div className="inputquantity">
              <button className="plusbtn" onClick={decrease}>-</button>
              <input type="number" min="1" max="10" value={count} readOnly className="abc"></input>
              <button className="minusbtn" onClick={increase}>+</button>
            </div>
            {
              isAuthenticated && <Button id="cartreview" onClick={handleCart}>Add to cart</Button>
            }
            {
              !isAuthenticated && <Button id="cartreview" onClick={()=>navigate('/login')}>Add to cart</Button>
            }
              
              
              </div>
            </div>
            <div class="col-md-6 col-xs-6">
              
            <Button variant="outline-dark" id="submitreview">Submit Review</Button>
            </div>
          </div>
        </figure>
      </div>
      
      <div className="homeheading">Reviews</div>
      {product.reviews && product.reviews[0] ? (
          <div className="reviewContainer">
            {product.reviews && product.reviews.map((review) =><ReviewCard review={review}></ReviewCard>)}
          </div>
      ): <p className="noreview">No reviews yet</p> }
    </>
    )}
    </>
  );
};

export default ProductDetails;
