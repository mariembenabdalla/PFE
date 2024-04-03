import React from "react";
import "./styleSignup.css";

const Signup = () => {
  return (
    <>
      <div class="wrapper-singup">
        <div className="signUp-container" id="register">
          <div className="top">
            <span>
              Have an account?
              <a href="#">Login</a>
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
              <i className="fa-solid fa-user" />
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Lastname"
              />
              <i className="fa-solid fa-user" />
            </div>
          </div>
          <div className="input-box">
            <input type="text" className="input-field" placeholder="Email" />
            <i className="fa-solid fa-envelope" />
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
            />
            <i className="fa-solid fa-lock-alt" />
          </div>
          <div className="input-box">
            <input type="submit" className="submit" defaultValue="Register" />
          </div>
          <div className="two-col">
            <div className="one">
              <input type="checkbox" id="register-check" />
              <label htmlFor="register-check"> Remember Me</label>
            </div>
            <div className="two">
              <label>
                <a href="#">Terms &amp; conditions</a>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
