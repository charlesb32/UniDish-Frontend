import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { addUser } from "../Axios/APICalls";

const CreateUniversityAdmin = ({ open, onClose }) => {
  const [universityAdminInfo, setUniversityAdminInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    type: "university admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUniversityAdminInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await addUser(universityAdminInfo);
    alert(response.message);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="Edit-Profile-Box">
        <Typography variant="h6">Create Univeresity Admin Account</Typography>
        <TextField
          fullWidth
          label="firstname"
          variant="outlined"
          value={universityAdminInfo.firstname}
          onChange={handleChange}
          name="firstname"
        />
        <TextField
          fullWidth
          label="lastname"
          variant="outlined"
          value={universityAdminInfo.lastname}
          onChange={handleChange}
          name="lastname"
        />
        <TextField
          fullWidth
          label="email"
          variant="outlined"
          value={universityAdminInfo.email}
          onChange={handleChange}
          name="email"
        />
        <TextField
          fullWidth
          label="username"
          variant="outlined"
          value={universityAdminInfo.username}
          onChange={handleChange}
          name="username"
        />
        <TextField
          fullWidth
          label="password"
          variant="outlined"
          value={universityAdminInfo.password}
          onChange={handleChange}
          name="password"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Univeristy Admin
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateUniversityAdmin;
