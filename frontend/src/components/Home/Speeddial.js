import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import { clearErrors, getproducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Speeddial = () => {
  const alert = useAlert();
  const {isAuthenticated,user}=useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const options = [{ icon: <ExitToApp />, name: "Logout", func: logoutUser }];

  const { loading, allproducts, error, productsCount } = useSelector(
    (state) => state.products
  );
  function logoutUser() {
    dispatch(logout());
    alert("Logout successfully");
    navigate("/");
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, error, alert]);

  return (
    <>
      <div className="speedDial">
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          direction="down"
          icon={
            <img
            src={
              user.avatar.url !== "avatar url"
                ? user.avatar.url
                : "/user.jpg"
            }
              alt="Profile"
              className="avatarimg"
              onClick={()=>navigate('/account')}
            ></img>
          }
        >
          {options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
            ></SpeedDialAction>
          ))}
        </SpeedDial>
      </div>
    </>
  );
};

export default Speeddial;
