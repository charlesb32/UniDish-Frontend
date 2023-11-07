import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { addRestaurant } from "../Axios/APICalls";
import { useDispatch } from "react-redux";
import { incrementUpdateCounter } from "../Redux/diningUpdateActions";

const AddRestaurant = ({ open, onClose, diningHall }) => {
  const dispatch = useDispatch();
  console.log(diningHall);
  const [restData, setRestData] = useState({
    name: "",
    description: "",
    menuName: "",
    menuDescription: "",
    diningHallId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setRestData({
      name: "",
      description: "",
      menuName: "",
      menuDescription: "",
      diningHallId: "",
    });
  };
  const handleSubmit = async () => {
    restData.diningHallId = diningHall[0];
    console.log(restData);
    const response = await addRestaurant(restData);
    if (response.message === "Restaurant Added successfully") {
      dispatch(incrementUpdateCounter());
    }
    alert(response.message);
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="Edit-Profile-Box">
        <Typography variant="h6">
          Dining Hall: {diningHall ? diningHall[1] : ""}
        </Typography>
        <TextField
          fullWidth
          label="name"
          variant="outlined"
          value={restData.name}
          onChange={handleChange}
          name="name"
        />
        <TextField
          fullWidth
          label="description"
          variant="outlined"
          value={restData.description}
          onChange={handleChange}
          name="description"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Restaurant
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddRestaurant;
