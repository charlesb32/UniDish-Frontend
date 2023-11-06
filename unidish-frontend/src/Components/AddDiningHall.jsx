import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { addDiningHall } from "../Axios/APICalls";

const AddDiningHall = ({ open, onClose }) => {
  const [diningHallData, setDiningHallData] = useState({
    name: "",
    description: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiningHallData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setDiningHallData({
      name: "",
      description: "",
      address: "",
    });
  };

  const handleSubmit = async () => {
    console.log(diningHallData);
    const response = await addDiningHall(diningHallData);
    alert(response.message);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="Edit-Profile-Box">
        <TextField
          fullWidth
          label="name"
          variant="outlined"
          value={diningHallData.name}
          onChange={handleChange}
          name="name"
        />
        <TextField
          fullWidth
          label="description"
          variant="outlined"
          value={diningHallData.description}
          onChange={handleChange}
          name="description"
        />
        <TextField
          fullWidth
          label="address"
          variant="outlined"
          value={diningHallData.address}
          onChange={handleChange}
          name="address"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Dining Hall
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddDiningHall;
