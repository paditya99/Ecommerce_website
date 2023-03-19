import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ReactStars from 'react-rating-stars-component'
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert=useAlert();
 
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
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

      <div class="container d-flex justify-content-center">
        <figure class="card2 card-product-grid card-lg">
          {" "}
          <div class="img-wrap" data-abc="true">
            {product.images &&
              product.images.map((item, i) => (
                <img src={item.url} key={item.url} alt={`${i} Slide`}></img>
              ))}
          </div>
          <figcaption class="info-wrap">
            <div class="row">
              <div class="col-md-6 col-xs-6">
                {" "}
                <div class="title" data-abc="true">
                  {product.name}
                </div>{" "}
                <span class="rated">{product.category}</span>{" "}
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
                  <div class="rating text-right">{product._id}</div>
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
                    <b>Description:</b> {product.description}
                  </div>
                </div>
              </div>
            </figcaption>
          </div>
          <div className="cartinput">
            <div class="col-md-6 col-xs-6">
              <input type="number"></input>
              <Button id="cartreview">Add to cart</Button>{" "}
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
