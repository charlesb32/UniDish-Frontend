import {
  Box,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import { createReview } from "../Axios/APICalls";
import { useSelector } from "react-redux";
import { incrementUpdateCounter } from "../Redux/diningUpdateActions";
import { useDispatch } from "react-redux";

const WriteReview = ({ open, onClose, restaurant }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.userInfo.user.sub);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    reviewData.restaurantId = restaurant[0];
    reviewData.userId = currUser.id;
    const now = new Date();
    const newNow = now.toISOString().slice(0, 19).replace("T", " ");
    reviewData.date = newNow;
    await createReview(reviewData);
    dispatch(incrementUpdateCounter());
    handleClose();
  };

  const handleClose = () => {
    setReviewData({ rating: 0, description: "" });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="Edit-Profile-Box">
        <Typography>Review for {restaurant[1]}:</Typography>
        <label htmlFor="rating">
          <Typography>
            Rating:{" "}
            <Select
              id="rating"
              name="rating"
              value={reviewData.rating}
              displayEmpty
              onChange={handleChange}
              style={{ width: "100px" }}
              required
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={1.5}>1.5</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={2.5}>2.5</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={3.5}>3.5</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={4.5}>4.5</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </Typography>
        </label>

        <TextField
          fullWidth
          variant="outlined"
          multiline
          rows={6}
          value={reviewData.description}
          onChange={handleChange}
          name="description"
          placeholder="Write review here"
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginRight: 8 }}
          >
            Post
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WriteReview;
