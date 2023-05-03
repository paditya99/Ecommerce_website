import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./PageNav.css";

const carticon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="14px"
    viewBox="0 0 24 24"
    width="14px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" />
  </svg>
);
function PageNav() {
  return (
    <>
    <Navbar className="pagenav" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <div className="logo">
          {carticon}
          <Navbar.Brand href="/" className="logoname">
            <b>EcoCart</b>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            
          >
            <Nav.Link href="/" id="links">Home</Nav.Link>
            <Nav.Link href="/contact" id="links">Contact</Nav.Link>
            <Nav.Link href="/about" id="links">About</Nav.Link>
            <Nav.Link href="/privacy" id="links">Privacy policy</Nav.Link>
            <Nav.Link href="/help" id="links">Help & FAQs</Nav.Link>

           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" id="searchbtn">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default PageNav;
