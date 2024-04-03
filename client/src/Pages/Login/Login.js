import React, { useEffect, useState } from "react";
import { login } from "../../redux/actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, Link } from "react-router-dom";
import "./styleLogin.css";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../../utils";
const Login = () => {
  const navigate = useNavigate();
  const { loading, isAuth, role, error } = useSelector(
    (state) => state.LoginReducer
  );
  useEffect(() => {
    setTimeout(() => {
      /* eslint-disable-next-line*/
      if (isAuth && role == 1) {
        navigate("/dashboard-instructor");
        /* eslint-disable-next-line*/
      } else if (isAuth && role == 2) {
        navigate("/dashboard-student");
      }
    }, 2000);
    /* eslint-disable-next-line*/
  }, [isAuth]);

  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    if (!loginDetails.email.includes("@")) {
      errorToast("Email Not Valid");
    }
    e.preventDefault();
    dispatch(login(loginDetails));
  };

  useEffect(() => {
    errorToast(error);
  }, [error]);

  return (
    <>
      <div className="wrapper">
        <div className="form-box">
          <div className="login-container" id="login">
            <div className="top">
              <span>
                Don't have an account?
                <a href="#">Sign Up</a>
              </span>
              <header>Login</header>
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Username or Email"
              />
              <i className="fa-solid fa-user" />
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
              <input type="submit" className="submit" defaultValue="Sign In" />
            </div>
            <div className="two-col">
              <div className="one">
                <input type="checkbox" id="login-check" />
                <label htmlFor="login-check"> Remember Me</label>
              </div>
              <div className="two">
                <label>
                  <a href="#">Forgot password?</a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
