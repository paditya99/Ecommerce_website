import React, { useEffect, useState } from "react";
import { clearErrors, getproducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import Rating from '@mui/material/Rating';
import "./Products.css";

const categories = [
  "All",
  "Laptops",
  "Footwear",
  "Tops",
  "Bottom",
  "Mobiles",
  "camera",
  "plants",
  "cosmetics",
];

const Products = () => {
  const dispatch = useDispatch();
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
  }, [dispatch, error, word, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="products">
            <div className="homeheading">Featured Products</div>
            <div className="container1">
              {allproducts &&
                allproducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  ></ProductCard>
                ))}
            </div>
          </div>
          
          <div className="priceSlider">
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
                  onClick={() => setCategory(category)}
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
