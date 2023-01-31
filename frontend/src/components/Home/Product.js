import React from 'react'
import '../Home/Product.css'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactStars from 'react-rating-stars-component'
//import { Card, CardHeader, CardBody, CardFooter, Image,Stack,Heading,Text,Divider,ButtonGroup,Button,SimpleGrid } from '@chakra-ui/react'



const Product = ({product, tshirt}) => {
  const options={
    edit: false,
    value: product.ratings,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600? 15:18
  }
  return (
    // <Link className='productCard' to={product._id}>
    //     <img src={tshirt} alt={product.name} height="500" width="200"></img>
    //     <p>{product.name}</p>
        // <div>
        //   <ReactStars {...options}></ReactStars>
        //   <span>(256 reviews)</span>

        // </div>
    //     <span>{product.price}</span>


    // </Link>
    <Link to={`products/${product._id}`}>
    <Card className="card">
      <Card.Img variant="top" src={product.images[0].url} className="cardimage"/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <div className='stars'>
          <ReactStars {...options}></ReactStars>
          <span>({product.noOfReviews} reviews)</span>

        </div>
        <span className='pricespan'><b>₹ {product.price}</b></span>

        <br></br>
        
        <Button variant="primary" className='buybtn'>Buy now</Button>
      </Card.Body>
    </Card>
  </Link>
  )
}

export default Product