import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WebFont from "webfontloader"
import React from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';

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
      
      <Header></Header>
      <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      </Routes>
        
      <Footer></Footer>
    </Router>
    
  );
}

export default App;
