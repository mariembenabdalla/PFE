import React, { useState } from "react";
import "./styleSignup.css";
import Navbar from "../../layouts/Navbar/Navbar";
import Footer from "../../layouts/Footer/Footer";
import axiosApi from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("client");
  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setShowAdditionalField(e.target.value === "handMade");
  };

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [carteCin, setCarteCin] = useState("");
  const [diplome, setDiplome] = useState("");

  const navigate = useNavigate();

  const signup = () => {
    let data = {
      fullName: `${firstname} ${lastname}`,
      email: email,
      password: password,
      address: address,
      phone: phone,
      role: role,
    };

    if (role === "handMade") {
      data = {
        ...data,
        city: city,
        town: town,
        carteCin: carteCin,
        diplome: diplome,
      };
    }

    axiosApi
      .post("http://localhost:5000/user", data)
      .then((res) => {
        if (res.status === 201) {
          Swal.fire("Good job!", "User created Succesfully", "success");
          navigate("/Signin");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <i className="fa-solid fa-user icon-green" />
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <i className="fa-solid fa-user icon-green" />
            </div>
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa-solid fa-envelope icon-green" />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <i className="fas fa-map-marker-alt  icon-green " />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="PhoneNumber"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <i className="fas fa-phone-alt icon-green" />
          </div>

          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                <input
                  type="text"
                  className="input-field"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <i className="fas fa-city icon-green" />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Town"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                />
                <i className="fas fa-building icon-green" />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Carte Cin"
                  value={carteCin}
                  onChange={(e) => setCarteCin(e.target.value)}
                />
                <i className="far fa-id-card icon-green" />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Diplôme"
                  value={diplome}
                  onChange={(e) => setDiplome(e.target.value)}
                />
                <i className="fas fa-graduation-cap icon-green" />
              </div>
            </>
          )}
          <br />
          <div className="input-box">
            <input
              type="submit"
              className="submit"
              value="Sign Up"
              onClick={signup}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
