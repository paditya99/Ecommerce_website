import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo192 from "../../../images/logo192.png"

const Header = () => {
  return (
    <div>
        <ReactNavbar
            burgerColor=	"black"
            burgerColorHover="grey"
            logo={logo192}
            logowidth="20vmax"
            navcolor1="white"
            logoHovberSize="10px"
            logoHoverColor="#eb4034"
            link1Text="Home"
            link2Text="Product"
            link3Text="Contact"
            link4Text="About"
            link1Url="/"
            link2Url="/product"
            link3Url="/contact"
            link4Url="/about"
            link1Size="1.3vmax"
            link1Color="white"
            link1ColorHover="#eb4034"
            link1Margin="1vmax"
            link1AnimationTime="1.5"
            link2AnimationTime="2"
            link3AnimationTime="2.5"
            link4AnimationTime="3"
            nav1alignItems	="center"
            nav1justifyContent="flex-end"
            nav2justifyContent="flex-end"
            nav3justifyContent="flex-start"
            nav4justifyContent="flex-start"
            profileIconColor="white"
            searchIconColor="white"
            cartIconColor="white"
            profileIconColorHover="#eb4034"
            searchIconColorHover="#eb4034"
            cartIconColorHover="#eb4034"
            ProfileIconElement={logo192}
            cartIconMargin="1vmax"
            style='background-color: #000fff'
        >

        </ReactNavbar>
    </div>
  )
}

export default Header