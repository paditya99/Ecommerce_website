import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Loader from "../layout/Loader";
import PageNav from "../Home/PageNav";
import MetaData from "../layout/MetaData";


const Login = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginemail, setLoginEmail] = useState("");
  const [loginpasswd, setLoginPasswd] = useState("");

  const [user, setUser] = useState({ email: "", password: "" });

  const emailref = useRef();
  const passref = useRef();
  const alert = useAlert();

  const { email, password } = user;

  const handleEmail = (e) => {
    e.preventDefault();
    setLoginEmail(e.target.value);
    checkEmail(loginemail);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswd = (e) => {
    e.preventDefault();
    setLoginPasswd(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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

  const submitform = () => {
    checkPass(loginpasswd);
    const myform = new FormData();

    myform.set("email", email);
    myform.set("password", password);

    dispatch(login(loginemail, loginpasswd));
    
  };

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Login successfully");
      navigate("/");
    }
    
  }, [dispatch, error, alert, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
        <MetaData title="Login | EcoCart"></MetaData>
        
        <div class="wrapper">
          <header>Login Form</header>
          <form action="#" onSubmit={submitform}>
            <div class="field email">
              <div class="input-area">
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
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
                  name="password"
                  placeholder="Password"
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
            <input type="submit" value="Login" />
          </form>
          <div class="sign-txt">
            Not yet member? <a href="/signup">Signup now</a>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Login;
