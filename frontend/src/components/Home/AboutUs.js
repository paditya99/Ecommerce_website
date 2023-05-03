import React from "react";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./AboutUs.css";
import "./Home.css";
import PageNav from "./PageNav";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
    <MetaData title="About us | EcoCart"></MetaData>
    <PageNav></PageNav>
      <div class="responsive-container-block bigContainer">
        <div class="responsive-container-block Container">
          <p class="text-blk heading">About Us</p>
          <p class="text-blk subHeading">
            Welcome to our ecommerce website! We are dedicated to providing our
            customers with the best shopping experience possible. Our focus is
            on offering high-quality products at competitive prices, and we are
            constantly adding new and exciting items to our collection.<br></br>
            We believe that shopping online should be easy and hassle-free, so
            we've designed our website to be user-friendly and easy to navigate.
            Whether you're looking for something specific or just browsing, we
            make it simple to find what you need.<br></br>
            Thank you for choosing to shop with us. We appreciate your support
            and look forward to providing you with a great shopping experience.
            <br></br>
            <br></br>
            <Button
              variant="dark"
              onClick={() => navigate("/products")}
              className="explorebtn"
            >
              Explore products
            </Button>
          </p>

          <div class="social-icons-container">
            <a
              class="social-icon"
              href="https://www.facebook.com/profile.php?id=100005213804787"
            >
              <img
                class="socialIcon image-block"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb33.png"
              ></img>
            </a>
            <a
              class="social-icon"
              href="https://www.linkedin.com/in/aditya-pathak-7ab7b2173/"
            >
              <img
                class="socialIcon image-block"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb34.png"
              ></img>
            </a>
            <a class="social-icon" href="https://www.instagram.com/aditya__pk/">
              <img
                class="socialIcon image-block"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb35.png"
              ></img>
            </a>
            <a class="social-icon" href="https://twitter.com/pathak__aditya">
              <img
                class="socialIcon image-block"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb36.png"
              ></img>
            </a>
          </div>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
