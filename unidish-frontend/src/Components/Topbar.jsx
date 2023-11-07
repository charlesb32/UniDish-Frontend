import { Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../Redux/store";
import EditProfile from "./EditProfile";
import CreateUniversityAdmin from "./CreateUniveristyAdmin";
const Topbar = () => {
  // let currUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.userInfo.user.sub);
  const [openProfile, setOpenProfile] = useState(false);
  const [openUniversityAdminCreateModal, setOpenUniversityAdminCreateModal] =
    useState(false);
  console.log(currUser);
  const handleLogout = () => {
    localStorage.removeItem("token");
    const persistor = persistStore(store);
    persistor.purge(); // This will purge the persisted state
    dispatch(logout()); // Dispatch the logout action to clear user-related state
    navigate("/login");
  };

  const handleCloseUniversityAdminCreateModal = () => {
    setOpenUniversityAdminCreateModal(false);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };
  return (
    <div className="topbar">
      <div className="topbar-left">
        <img className="topbar-logo" src={Logo} alt="App Logo" />
        <h3 className="topbar-title">UniDish</h3>
        <h3 className="topbar-welcome">
          Welcome {currUser ? currUser.firstname : ""}
        </h3>
      </div>
      <div className="topbar-buttons">
        {currUser.type === "university admin" && (
          <Button
            className="topbar-button"
            variant="contained"
            onClick={() => navigate("diningManagement")}
          >
            Manage Dining Halls
          </Button>
        )}
        {currUser.type === "admin" && (
          <Button
            className="topbar-button"
            variant="contained"
            onClick={() => setOpenUniversityAdminCreateModal(true)}
          >
            Create University Admins
          </Button>
        )}
        <Button
          className="topbar-button"
          variant="contained"
          onClick={() => setOpenProfile(true)}
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
      <EditProfile open={openProfile} onClose={handleCloseProfile} />
      <CreateUniversityAdmin
        open={openUniversityAdminCreateModal}
        onClose={handleCloseUniversityAdminCreateModal}
      />
    </div>
  );
};

export default Topbar;
