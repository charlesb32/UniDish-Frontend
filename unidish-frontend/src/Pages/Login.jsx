import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { login, getUserByToken } from "../Axios/APICalls";
import { setAuthToken } from "../Axios/setAuthToken";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../Redux/userActions";
import "../Styling/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await login(formData);
      if (loginResponse && localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        setAuthToken(token);
        const userResponse = await getUserByToken(token);
        dispatch(setUserInfo(userResponse.data));
        navigate("/restaurants/100");
        // const userResponse = await getUser();
      }
    } catch (err) {
      console.log("Error during login:", err);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={Logo} alt="App Logo" />
          <h2>UniDish</h2>
          <p>
            Note: sign in with username: timSands@gmail.com and password: VT if
            you want to see what it is like to be university admin and
            create/modify/delete dining halls, restaurants, and menus{" "}
          </p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <TextField
            className="login-field"
            placeholder="email"
            required
            type="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <TextField
            className="login-field"
            placeholder="password"
            required
            onChange={handleChange}
            name="password"
            value={formData.password}
            type="password"
          />
          <div className="login-actions">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
