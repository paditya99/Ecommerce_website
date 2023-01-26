import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/appstore.jpg'
import instagram from '../../../images/instagram.png'
import facebook from '../../../images/facebook.png'
import linkedin from '../../../images/linkedin.png'
//import { carticon2 } from '../svg/svg.js'
import '../Footer/footerStyle.css'
//import 'bootstrap/dist/css/bootstrap.min.css'


const carticon=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/></svg>
const Footer = () => {
  return (
    <footer>
        <div id="leftfooter">
          
            <h4>DOWNLOAD OUR APP</h4>
            <p>You can download the app from Playstore and Appstore</p>
            <img src={playstore} alt="playstore"></img>
            <img src={appstore} alt="appstore"></img>
        </div>
        <div id="midfooter">
            
            <h2>{carticon} ECO-CART</h2>
            <p><i>Quality is assured</i></p>
            
            <br></br>
            <p>Copyright &copy; 2023 | All rights reserved.</p>
        </div>
        <div id="rightfooter">
            <h3>FOLLOW US ON:</h3>
           
            <a href="https://www.instagram.com/aditya__pk/" target="_blank"><img src={instagram} height="50" width="50"></img></a>
            <a href="https://google.com" target="_blank"><img src={facebook} height="50" width="50"></img></a>
            <a href="https://www.linkedin.com/in/aditya-pathak-7ab7b2173/" target="_blank"><img src={linkedin} height="50" width="50"></img></a>
          
            
        </div>
    </footer>
  )
}

export default Footer