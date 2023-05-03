import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { useParams } from "react-router-dom";
import Products from "./Products";
const Search = () => {

  const navigate = useNavigate();
  const [word, setKeyword] = useState("");
  
  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/products/${word}`);
    
  };

  return (
    <>
      <form
        className="example"
        onSubmit={submitSearch}
      >
        <input type="text" placeholder="Search..." name="search2" onChange={e=>setKeyword(e.target.value)}/>
        <button type="submit" className="searchbtn">
          <i className="fa fa-search"></i>
        </button>
      </form>
      
    </>
  );
};

export default Search;
