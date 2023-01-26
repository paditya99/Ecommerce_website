import Spinner from 'react-bootstrap/Spinner';
import React from 'react'
import '../layout/Loader.css'
const Loader = () => {
  return (
    <>
    <div className='loaderdiv'>
    <Spinner animation="border" id="loader"/>
    </div>
    
    </>
  )
}

export default Loader