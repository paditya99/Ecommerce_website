import React, { useState,useEffect } from 'react'
import MetaData from '../layout/MetaData'
import './Contact.css'
import PageNav from './PageNav'
import { createContact } from "../../actions/contactActions";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";

const Contact = () => {
  const dispatch=useDispatch();
  const [contact,setContact]=useState({name: "", email: "", contactno: "", message: ""})

  const { name,email,contactno,message } = contact;
  const alert=useAlert();  

  const handleName = (e) => {
    e.preventDefault();
    
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleEmail = (e) => {
    e.preventDefault();
    
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleContactno = (e) => {
    e.preventDefault();
    
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleMessage = (e) => {
    e.preventDefault();
    
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitform = (e) => {
    e.preventDefault();
    
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("contact_no", contactno);
    myform.set("message", message);
    dispatch(createContact(myform));
    console.log(myform)
    alert.success("Message sent");
  };

 
  return (
    <>
    <MetaData title="Contact us | EcoCart"></MetaData>
    <PageNav></PageNav>
    <div class="background" id="back">
  <div class="container" id="contain">
    <div class="screen">
      <div class="screen-header">
        <div class="screen-header-left">
          <div class="screen-header-button close"></div>
          <div class="screen-header-button maximize"></div>
          <div class="screen-header-button minimize"></div>
        </div>
        <div class="screen-header-right">
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
        </div>
      </div>
      <div class="screen-body">
        <div class="screen-body-item left">
          <div class="app-title">
            <span>CONTACT</span>
            <span>US</span>
          </div>
          <div class="app-contact">CONTACT INFO : +91 81786 78449</div>
        </div>
        <form onSubmit={submitform}>
        <div class="screen-body-item">
          <div class="app-form">
            <div class="app-form-group">
              <input name="name" class="app-form-control" placeholder="NAME" onChange={handleName}/>
            </div>
            <div class="app-form-group">
              <input name="email" class="app-form-control" placeholder="EMAIL" onChange={handleEmail}/>
            </div>
            <div class="app-form-group">
              <input name="contactno" class="app-form-control" placeholder="CONTACT NO" onChange={handleContactno}/>
            </div>
            <div class="app-form-group message">
              <input name="message" class="app-form-control" placeholder="MESSAGE" onChange={handleMessage}/>
            </div>
            <div class="app-form-group buttons">
              
              <button class="app-form-button" type='submit'>SEND</button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
    
  </div>
</div>

    </>
  )
}

export default Contact