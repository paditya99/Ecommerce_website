import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Sidebar from "./components/layout/Header/Sidebar";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import store  from "./Store";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions";
import Speeddial from "./components/Home/Speeddial";
import Profile from "./components/Users/Profile";
import PageNotFound from "./components/Home/PageNotFound";
import AboutUs from "./components/Home/AboutUs";
import Contact from "./components/Home/Contact";
import CartList from "./components/Product/CartList";
import Shipping from "./components/Home/Shipping";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      {/* <Header></Header> */}
      {/* <Sidebar></Sidebar> */}
      <Routes>
        {/* {isAuthenticated ? <Speeddial user={user}></Speeddial> : <></>} */}
        {isAuthenticated ? (
          <Route path="/" element={<Home user={user}></Home>}></Route>
          
        ) : (
          <Route path="/" element={<Home></Home>}></Route>
          
          
        )}

        <Route
          path="/products/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
{/*         
        {isAuthenticated ? (
          <Route path="/products" element={<Products user={user}></Products>}></Route>
        ) : (
          <Route path="/products" element={<Products></Products>}></Route>
        )} */}
        <Route path="/products" element={<Products></Products>}></Route>
        <Route path="/products/:word" element={<Products></Products>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Register></Register>}></Route>
        <Route path="/account" element={<Profile></Profile>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        <Route path="/about" element={<AboutUs></AboutUs>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        
        {isAuthenticated ? (
          <Route path="/cart" element={<CartList></CartList>}></Route>
          
        ) : (
          <Route path="/cart" element={<Home></Home>}></Route>
          
          
        )}
        {isAuthenticated ? (
          <Route path="/shipping" element={<Shipping></Shipping>}></Route>
          
        ) : (
          <Route path="/shipping" element={<Home></Home>}></Route>
          
          
        )}
      </Routes>

      <Footer></Footer>
    </Router>
  );
}

export default App;
