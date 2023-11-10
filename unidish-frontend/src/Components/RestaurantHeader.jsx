import { Button, Typography, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { getOverallRestaurantRating } from "../Axios/APICalls";
import WriteReview from "./WriteReview";
import { useSelector } from "react-redux";

const RestaurantHeader = ({ restaurant }) => {
  const [overallRating, setOverallRating] = useState();
  const [openWriteReviewModal, setOpenWriteReviewModal] = useState(false);
  const reviewUpdateCount = useSelector(
    (state) => state.diningUpdateFlag.updateCounter
  );

  useEffect(() => {
    const fetchOverallRating = async () => {
      try {
        console.log(restaurant);
        const rating = await getOverallRestaurantRating(restaurant[0]);
        setOverallRating(rating.averageRating);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchOverallRating();
  }, [restaurant, reviewUpdateCount]);

  const handleCloseWriteReviewModal = () => {
    setOpenWriteReviewModal(false);
  };

  return (
    <div className="Restaurant-Card-Header">
      <div>
        <Typography variant="h4" component="h1">
          {restaurant[1]}
        </Typography>
        <Typography variant="p" component="p">
          Overall Rating:
          <Rating
            name="read-only"
            value={parseFloat(overallRating)}
            precision={0.1}
            readOnly
            size="small"
            sx={{ paddingLeft: "16px", top: "3px" }}
          />
        </Typography>
      </div>
      <div className="button-group">
        <Button variant="contained">Menu</Button>
        <Button
          variant="contained"
          onClick={() => setOpenWriteReviewModal(true)}
        >
          Write Review
        </Button>
      </div>
      <WriteReview
        open={openWriteReviewModal}
        onClose={handleCloseWriteReviewModal}
        restaurant={restaurant}
      />
    </div>
  );
};

export default RestaurantHeader;
