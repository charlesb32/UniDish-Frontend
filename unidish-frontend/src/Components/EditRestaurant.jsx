import { Box, Modal, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { editRestaurant } from "../Axios/APICalls";
import { useDispatch } from "react-redux";
import { incrementUpdateCounter } from "../Redux/diningUpdateActions";

const EditRestaurant = ({ open, onClose, restaurant }) => {
  //   console.log(restaurant);
  const dispatch = useDispatch();
  const [restData, setRestData] = useState({
    name: "",
    description: "",
    menuName: "",
    menuDescription: "",
    diningHallId: "",
  });

  // This effect will update restData whenever the restaurant prop changes.
  useEffect(() => {
    if (restaurant) {
      setRestData({
        name: restaurant.name,
        description: restaurant.description,
        menuName: "",
        menuDescription: "",
        diningHallId: restaurant.id,
      });
    }
  }, [restaurant]); // Only re-run the effect if restaurant changes

  const handleClose = () => {
    onClose();
    setRestData({
      name: restaurant.name,
      description: restaurant.description,
      menuName: "",
      menuDescription: "",
      diningHallId: restaurant.id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(restData);
    const response = await editRestaurant(restData);
    dispatch(incrementUpdateCounter());
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
            Edit Restaurant
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditRestaurant;
