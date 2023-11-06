import { Modal, Box, Typography, Button } from "@mui/material";
import { deleteDiningHall } from "../Axios/APICalls";

const DeleteDiningHall = ({ open, onClose, diningHall }) => {
  console.log(diningHall);

  const handleSubmit = async () => {
    await deleteDiningHall(diningHall.dining_hall[0]);
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="Edit-Profile-Box">
        <Typography variant="h6">
          Are you sure you want to delete{" "}
          {diningHall && diningHall.dining_hall
            ? diningHall.dining_hall[1]
            : ""}{" "}
          Dining Hall? <br />
          Warning: Deleteing this dining hall will also delete all of its
          restaurants and the associated menu items.
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

export default DeleteDiningHall;
