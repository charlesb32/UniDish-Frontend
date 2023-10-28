import { Button } from "@mui/material";
import * as React from "react";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../Redux/store";
const Topbar = () => {
  // let currUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.userInfo);
  const handleLogout = () => {
    localStorage.removeItem("token");
    const persistor = persistStore(store);
    persistor.purge(); // This will purge the persisted state
    dispatch(logout()); // Dispatch the logout action to clear user-related state
    navigate("/login");
  };
  return (
    <div className="topbar">
      <div className="topbar-left">
        <img className="topbar-logo" src={Logo} alt="App Logo" />
        <h3 className="topbar-title">UniDish</h3>
        <h3 className="topbar-welcome">
          Welcome {currUser ? currUser.user.firstname : ""}
        </h3>
      </div>
      <div className="topbar-buttons">
        <Button
          className="topbar-button"
          variant="contained"
          //   onClick={() => navigate("/plans")}
        >
          Profile
        </Button>
        <Button
          className="topbar-button"
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
