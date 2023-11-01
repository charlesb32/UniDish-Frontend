import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { updateUserInfo } from "../Axios/APICalls";
import ChangePassword from "./ChangePassword";

const EditProfile = ({ open, onClose }) => {
  const currUser = useSelector((state) => state.user.userInfo.user.sub);
  const [userData, setUserData] = useState({
    firstname: currUser.firstname,
    lastname: currUser.lastname,
    email: currUser.email,
    username: currUser.username,
    profile_description: currUser.profile_description,
    type: currUser.type,
  });
  console.log(currUser);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handlePasswordModalClose = () => {
    setPasswordModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    console.log(userData);
    await updateUserInfo(userData);
    onClose();
  };
  return (
    // <div>
    <>
      <Modal open={open} onClose={onClose}>
        <Box className="Edit-Profile-Box">
          <Typography variant="h6">Profile Details</Typography>

          <Typography variant="body1">
            Firstname: {currUser.firstname}
          </Typography>

          <Typography variant="body1">Lastname: {currUser.lastname}</Typography>

          <Typography variant="body1">Email: {currUser.email}</Typography>

          <Typography variant="body1">Username: {currUser.username}</Typography>

          <Typography variant="body1">User Type: {currUser.type}</Typography>

          <TextField
            fullWidth
            label="Profile Description"
            variant="outlined"
            multiline
            rows={4}
            value={userData.profile_description}
            onChange={handleChange}
            name="profile_description"
          />

          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "10px" }}
              onClick={() => setPasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Modal>
      <ChangePassword
        open={passwordModalOpen}
        closeModal={handlePasswordModalClose}
        currUser={currUser}
      />
    </>
    // </div>
  );
};

export default EditProfile;
