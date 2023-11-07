import { Modal, Box, Typography, Button } from "@mui/material";
import { deleteRestaurant } from "../Axios/APICalls";
import { useDispatch } from "react-redux";
import { incrementUpdateCounter } from "../Redux/diningUpdateActions";

const DeleteRestaurant = ({ open, onClose, restaurant }) => {
  //   console.log(restaurant);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await deleteRestaurant(restaurant.id);
    dispatch(incrementUpdateCounter());
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="Edit-Profile-Box">
        <Typography variant="h6">
          Are you sure you want to delete {restaurant ? restaurant.name : ""} ?
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginRight: 8 }}
          >
            Confirm Delete
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteRestaurant;
