import React, { useEffect } from 'react'
import {FaBeer} from 'react-icons/fa'
import '../Home/Home.css'
import Product from './Product'
import tshirt from '../../images/tshirt.jpg'
import MetaData from '../layout/MetaData'
import {getproducts} from '../../actions/productActions'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../layout/Loader'



const Home = () => {

  const dispatch=useDispatch();
  const {loading,allproducts,error,productsCount}=useSelector(state=>state.products)

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch])
  

  return (
   <>
   {
    loading? <Loader></Loader> :  <>
    <MetaData title="ECO-CART"></MetaData>
    
      <div className='banner'>
            <p>Welcome to ECO-CART</p>
            <h1>Find Amazing products here.</h1>
            <a href="#container1"> 
                <button>Scroll</button>
            </a>
              
            
      </div>
      <div className='homeheading'>
                Featured Products
              </div>
              
              <div className='container1' id='container1'>
                  {
                    allproducts && allproducts.map(product=> (<Product product={product}/>))
                  }
                  
              </div>
              
    </>
   }
   </>
  )
}

export default Home