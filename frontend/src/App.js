import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WebFont from "webfontloader"
import React from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Sidebar from './components/layout/Header/Sidebar';
import Products from './components/Product/Products';
import Search from './components/Product/Search';

function App() {

  React.useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    })
  },[])

  return (
    
    <Router>
      
      {/* <Header></Header> */}
      {/* <Sidebar></Sidebar> */}
      <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/products/:id' element={<ProductDetails></ProductDetails>}></Route>
      <Route path='/products' element={<Products></Products>}></Route>
      <Route path='/products/:word' element={<Products></Products>}></Route>
      <Route path='/search' element={<Search></Search>}></Route>
      
      </Routes>
        
      <Footer></Footer>
    </Router>
    
  );
}

export default App;
