import { Button, Typography, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { getOverallRestaurantRating } from "../Axios/APICalls";

const RestaurantHeader = ({ restaurant }) => {
  const [overallRating, setOverallRating] = useState();
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
  }, [restaurant]);
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
        <Button variant="contained">Write Review</Button>
      </div>
    </div>
  );
};

export default RestaurantHeader;
