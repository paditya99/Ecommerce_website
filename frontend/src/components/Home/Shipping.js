import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Shipping.css";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const alert = useAlert();
  //const {shippingInfo}=useSelector(state=>state.cart);

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    country: "",
    pincode: "",
    state: "",
    phoneNo: "",
  });

  const { address, city, country, pincode, state, phoneNo } = shipping;

  const submitForm = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("address", address);
    myform.set("city", city);
    myform.set("country", country);
    myform.set("pincode", pincode);
    myform.set("state", state);
    myform.set("phoneNo", phoneNo);
    console.log(myform);
    dispatch(saveShippingInfo(myform));
    alert.success("order confirmed");
  };

  return (
    <>
      <div className="mainscreen">
        <div className="shippingcard">
          <div className="leftside">
            <img
              src="https://i.pinimg.com/originals/18/9d/dc/189ddc1221d9c1c779dda4ad37a35fa1.png"
              className="product"
              alt="Shoes"
            />
          </div>
          <div className="rightside">
            <form onSubmit={submitForm} encType="multipart/form-data">
              <h1>Shipping Form</h1>

              <p className="shippingp">Address</p>
              <input
                type="text"
                className="inputbox"
                name="address"
                required
                onChange={(e) =>
                  setShipping({ ...shipping, [e.target.name]: e.target.value })
                }
                value={address}
              />
              <p className="shippingp">City</p>
              <input
                type="text"
                className="inputbox"
                name="city"
                required
                onChange={(e) =>
                  setShipping({ ...shipping, [e.target.name]: e.target.value })
                }
                value={city}
              />
              <p className="shippingp">Pincode</p>
              <input
                type="number"
                className="inputbox"
                name="pincode"
                required
                onChange={(e) =>
                  setShipping({ ...shipping, [e.target.name]: e.target.value })
                }
                value={pincode}
              />
              <p className="shippingp">Phone number</p>
              <input
                type="number"
                className="inputbox"
                name="phoneNo"
                size="10"
                required
                onChange={(e) =>
                  setShipping({ ...shipping, [e.target.name]: e.target.value })
                }
                value={phoneNo}
              />

              <p className="shippingp">Country</p>
              <select
                className="inputbox"
                name="country"
                id="country"
                value={country}
                required
                onChange={(e) =>
                  setShipping({ ...shipping, [e.target.name]: e.target.value })
                }
              >
                <option value="">--Select a Country--</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>

              <p className="shippingp">State</p>
              {country && (
                <div>
                  <select
                    className="inputbox"
                    name="state"
                    id="state"
                    value={state}
                    required
                    onChange={(e) =>
                      setShipping({
                        ...shipping,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <option value="">--Select a State--</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <p></p>
              <button
                type="submit"
                className="confirmorderbutton"
                disabled={state ? false : true}
                onClick={handleShow}
              >
                Confirm Order
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Order status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your Order has been confirmed</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Close
                  </Button>
                  
                </Modal.Footer>
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
