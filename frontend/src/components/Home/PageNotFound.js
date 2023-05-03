import React from "react";
import MetaData from "../layout/MetaData";
import PageNav from "./PageNav";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
    <MetaData title="Page Not Found"></MetaData>
    <PageNav></PageNav>
      <section class="page_404">
        <div class="container" id="containerid">
          <div class="row" id="rowidpage">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Page Not Found !!</h3>

                  <p>the page you are looking are not available</p>

                  <a href="/" class="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
