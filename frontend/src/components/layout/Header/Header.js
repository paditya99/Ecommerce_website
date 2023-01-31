import React, {useState} from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo192 from "../../../images/logo192.png"
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        {/* <ReactNavbar
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

        </ReactNavbar> */}
         <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Header