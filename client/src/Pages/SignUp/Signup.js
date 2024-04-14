import React, { useState } from "react";
import "./styleSignup.css";
import Navbar from "../../layouts/Navbar/Navbar";
import Footer from "../../layouts/Footer/Footer";

const Signup = () => {
  const [role, setRole] = useState("client");
  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setShowAdditionalField(e.target.value === "handMade");
  };

  return (
    <>
      <Navbar />
      <div className="wrapper-singup">
        <div className="signUp-container" id="register">
          <div className="top">
            <span>
              Have an account?
              <a href="/login">Sign In</a>
            </span>
            <header>Sign Up</header>
          </div>
          <div className="two-forms">
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Firstname"
              />
              <i className="fa-solid fa-user icon-green" />
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Lastname"
              />
              <i className="fa-solid fa-user icon-green" />
            </div>
          </div>
          <div className="input-box">
            <input type="text" className="input-field" placeholder="Email" />
            <i className="fa-solid fa-envelope icon-green" />
          </div>
          <div className="input-box">
            <input type="text" className="input-field" placeholder="Address" />
            <i className="fas fa-map-marker-alt  icon-green " />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="PhoneNumber"
            />
            <i className="fas fa-phone-alt icon-green" />
          </div>

          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
            />
            <i className="fa-solid fa-lock-alt icon-green" />
          </div>

          <div className="radio-box">
            <input
              type="radio"
              id="client"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={handleRoleChange}
            />
            <label htmlFor="client" className="bt-radio">
              Client
            </label>
            <input
              type="radio"
              id="handMade"
              name="role"
              value="handMade"
              checked={role === "handMade"}
              onChange={handleRoleChange}
            />
            <label htmlFor="handMade" className="bt-radio">
              Hand Made
            </label>
          </div>
          <br />

          {showAdditionalField && (
            <>
              <div className="input-box">
                <input type="text" className="input-field" placeholder="City" />
                <i className="fas fa-city icon-green" />
              </div>

              <div className="input-box">
                <input type="text" className="input-field" placeholder="Town" />
                <i className="fas fa-building icon-green" />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Carte Cin"
                />
                <i className="far fa-id-card icon-green" />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Diplôme"
                />
                <i className="fas fa-graduation-cap icon-green" />
              </div>
            </>
          )}
          <br />
          <div className="input-box">
            <input type="submit" className="submit" value="Sign Up" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
