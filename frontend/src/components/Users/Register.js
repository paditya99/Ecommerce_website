import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import "./Register.css";
import "./Login";
import MetaData from "../layout/MetaData";
import PageNav from "../Home/PageNav";

const Register = () => {
  const [registeremail, setRegisterEmail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");
  const [registername, setRegisterName] = useState("");

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [avatar, setAvatar] = useState();
  const [avatarpreview, setAvatarpreview] = useState("/user.png");

  const { name, email, password } = user;

  const emailref = useRef();
  const passref = useRef();
  const nameref = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleEmail = (e) => {
    e.preventDefault();
    setRegisterEmail(e.target.value);
    checkEmail(registeremail);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswd = (e) => {
    e.preventDefault();
    setRegisterPassword(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleName = (e) => {
    e.preventDefault();
    setRegisterName(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleAvatar = (e) => {
    e.preventDefault();
    setRegisterName(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarpreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  function checkName(x) {
    //checkPass function
    const form = document.querySelector("form");
    var nField = form.querySelector(".name");

    if (x.length < 4) {
      //if pass is empty then add error and remove valid class
      nField.classList.add("error");
      nField.classList.remove("valid");

      let errorTxt = nField.querySelector(".error-txt");
      x != ""
        ? (errorTxt.innerText = "Name length should be atleast 4")
        : (errorTxt.innerText = "");
    } else {
      //if pass is empty then remove error and add valid class
      nField.classList.remove("error");
      nField.classList.add("valid");
    }
  }

  function checkEmail(x) {
    //checkEmail function
    const form = document.querySelector("form");
    var eField = form.querySelector(".email");
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email

    if (!x.match(pattern)) {
      //if pattern not matched then add error and remove valid class

      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      x != ""
        ? (errorTxt.innerText = "Enter a valid email address")
        : (errorTxt.innerText = "");
    } else {
      //if pattern matched then remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass(x) {
    //checkPass function
    const form = document.querySelector("form");
    var pField = form.querySelector(".password");

    if (x.length < 4) {
      //if pass is empty then add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");

      let errorTxt = pField.querySelector(".error-txt");
      x != ""
        ? (errorTxt.innerText = "Password length should be greater than 4")
        : (errorTxt.innerText = "");
    } else {
      //if pass is empty then remove error and add valid class
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Registered successfully");
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated]);

  const submitform = (e) => {
    e.preventDefault();
    checkName(registername);
    checkPass(registerpassword);
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("password", password);
    myform.set("avatar", avatar);
    dispatch(register(myform));
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        
        <div class="wrapper">
          <header>Registration Form</header>
          <form action="#" onSubmit={submitform} encType="multipart/form-data">
            <div class="field name">
              <div class="input-area">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  onChange={handleName}
                  ref={nameref}
                />
                <i class="icon fas fa-envelope"></i>
                <i class="error error-icon fas fa-exclamation-circle"></i>
              </div>
              <div class="error error-txt">Name can't be blank</div>
            </div>
            <div class="field email">
              <div class="input-area">
                <input
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  required
                  onChange={handleEmail}
                  ref={emailref}
                />
                <i class="icon fas fa-envelope"></i>
                <i class="error error-icon fas fa-exclamation-circle"></i>
              </div>
              <div class="error error-txt">Email can't be blank</div>
            </div>
            <div class="field password">
              <div class="input-area">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={handlePasswd}
                  ref={passref}
                />
                <i class="icon fas fa-lock"></i>
                <i class="error error-icon fas fa-exclamation-circle"></i>
              </div>
              <div class="error error-txt">Password can't be blank</div>
            </div>
            <div class="pass-txt">
              <a href="/password/forgot">Forgot password?</a>
            </div>
            <div className="registerimage">
              <img src={avatarpreview} alt="Avatar Image"></img>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatar}
              ></input>
            </div>
            <input type="submit" value="Register" />
          </form>
          <div class="sign-txt">
            Already a member? <a href="/login">Login now</a>
          </div>
        </div>
      
      )}
    </>
  );
};

export default Register;
