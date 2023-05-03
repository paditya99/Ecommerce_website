import React, { useEffect, useState } from "react";
import { clearErrors, getproducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import {useAlert} from "react-alert"
import Rating from "@mui/material/Rating";
import "./Products.css";
import PageNav from "../Home/PageNav";
import MetaData from "../layout/MetaData";
import Speeddial from "../Home/Speeddial";

const categories = [
  
  "Laptops",
  "Footwear",
  "Tops",
  "Bottom",
  "Mobiles",
  "camera",
  "Accessories",
  "Bags",
  "Households",
  "cosmetics",
  "Spectacles"

];

const filtericon= <svg className="filtericon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>
const Products = ({user}) => {
  const dispatch = useDispatch();
  const alert=useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);
  const { word } = useParams();

  //const word=match.params.word
  const { loading, allproducts, error, productsCount, resultsPerPage } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const handlePrice = (e, newval) => {
    setPrice(newval);
  };
  const handleRatings = (e, newval) => {
    setRatings(newval);
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getproducts(word, currentPage, price, category, ratings));
  }, [dispatch, error, word, currentPage, price, category, ratings, alert]);

  const handleevent=()=>{
    if(allproducts.length>0){
      return allproducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        ></ProductCard>
      ))
    }
    else{
      return <p className="noreview">This category has no items.</p>
    }
  }

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
        {
          user ? <Speeddial></Speeddial>: <></>
        }
        <MetaData title="PRODUCTS | EcoCart"></MetaData>
        <PageNav></PageNav>
          <div className="cover">
            <div className="products">
              <div className="homeheading">Featured Products</div>
              <div className="container1">
                
                { handleevent()}
                
              </div>
            </div>
            
            <div className="priceSlider">
            <p className="filter">{filtericon} Filters </p>
              <Typography>Price</Typography>
              <Slider
                getAriaLabel={() => "Minimum distance shift"}
                value={price}
                onChange={handlePrice}
                area-labelledby="range-slider"
                valueLabelDisplay="auto"
                disableSwap
                min={0}
                max={25000}
              />
              <Typography>Categories</Typography>
              <ul className="categoriesBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={()=>setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <Typography component="legend">Ratings above</Typography>
                <Rating
                  name="simple-controlled"
                  value={ratings}
                  onChange={handleRatings}
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
          </div>
          {/* Adding pagination to the page */}

          {resultsPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              ></Pagination>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
