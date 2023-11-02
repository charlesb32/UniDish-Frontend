import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { changePassword } from "../Axios/APICalls";

const ChangePassword = ({ open, closeModal, currUser }) => {
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(passwordInfo, currUser);
    const response = await changePassword(passwordInfo, currUser.id);
    if (response.message === "User Password updated successfully") {
      alert("User Password updated successfully");
      closeModal();
    }
    setPasswordInfo({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Box className="Change-Password-Box">
        <TextField
          className="signup_login_field"
          placeholder="old password"
          type="password"
          required
          id=""
          onChange={handleChange}
          name="oldPassword"
          value={passwordInfo.oldPassword}
        />
        <TextField
          className="signup_login_field"
          placeholder="new password"
          type="password"
          required
          id="newPassword"
          onChange={handleChange}
          name="newPassword"
          value={passwordInfo.newPassword}
        />
        <TextField
          className="signup_login_field"
          placeholder="confirm new password"
          type="password"
          required
          id="confirmNewPassword"
          onChange={handleChange}
          name="confirmNewPassword"
          value={passwordInfo.confirmNewPassword}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePassword;
