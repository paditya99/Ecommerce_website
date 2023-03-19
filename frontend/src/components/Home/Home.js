import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import ProductCard from "./ProductCard";
import Offcanvas from "react-bootstrap/Offcanvas";
import MetaData from "../layout/MetaData";
import { clearErrors, getproducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import Search from "../Product/Search";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, allproducts, error, productsCount } = useSelector(
    (state) => state.products
  );
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getproducts());
  }, [dispatch, error, alert]); 

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <MetaData title="ECO-CART"></MetaData>
          
          <div className="banner">
            <svg
              className="menuicon"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
              onClick={handleShow}
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
            <Search></Search>
            <p>Welcome to ECO-CART</p>
            <h1>Find Amazing products here.</h1>
            <a href="#container1">
              <button>Scroll</button>
            </a>
          </div>
          <Offcanvas show={show} onHide={handleClose} id="offcanvas">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>ECO-CART MENU</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="fragment">
                <div className="svgicon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10px"
                    viewBox="0 0 24 24"
                    width="10px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>

                <div className="link">
                  <a href="/">Home</a>
                </div>
              </div>

              <div className="fragment">
                <div className="svgicon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="10px"
                    fill="#000000"
                  >
                    <g>
                      <rect fill="none" />
                    </g>
                    <g>
                      <path d="M20,2H4C3,2,2,2.9,2,4v3.01C2,7.73,2.43,8.35,3,8.7V20c0,1.1,1.1,2,2,2h14c0.9,0,2-0.9,2-2V8.7c0.57-0.35,1-0.97,1-1.69V4 C22,2.9,21,2,20,2z M15,14H9v-2h6V14z M20,7H4V4h16V7z" />
                    </g>
                  </svg>
                </div>

                <div className="link">
                  <a href="/products">Product</a>
                </div>
              </div>

              <div className="fragment">
                <div className="svgicon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="10px"
                    fill="#000000"
                  >
                    <rect fill="none" height="24" width="24" />
                    <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M12,10c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2s-2-0.9-2-2 C10,10.9,10.9,10,12,10z M16,18H8v-0.57c0-0.81,0.48-1.53,1.22-1.85C10.07,15.21,11.01,15,12,15c0.99,0,1.93,0.21,2.78,0.58 C15.52,15.9,16,16.62,16,17.43V18z" />
                  </svg>
                </div>

                <div className="link">
                  <a href="/contact">Contact</a>
                </div>
              </div>

              <div className="fragment">
                <div className="svgicon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10px"
                    viewBox="0 0 24 24"
                    width="10px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>

                <div className="link">
                  <a href="/about">About</a>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          <div>
            <div className="homeheading">Featured Products</div>
            <div className="container1" id="container1">
              {allproducts &&
                allproducts.map((product) => <ProductCard product={product} />)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
