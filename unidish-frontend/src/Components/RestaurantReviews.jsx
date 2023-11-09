import {
  Box,
  Card,
  Typography,
  CardContent,
  IconButton,
  Rating,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState, useEffect } from "react";
import { dislikeReview, getReviews, likeReview } from "../Axios/APICalls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incrementUpdateCounter } from "../Redux/diningUpdateActions";

const RestaurantReviews = ({ restaurant }) => {
  const currUser = useSelector((state) => state.user.userInfo.user.sub);
  const reviewInteractionCount = useSelector(
    (state) => state.diningUpdateFlag.updateCounter
  );
  const dispatch = useDispatch();
  //   console.log(currUser);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log(currUser);
        const reviewsData = await getReviews(restaurant[0], currUser.id);
        console.log(reviewsData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [restaurant, reviewInteractionCount, currUser]);

  const handleLike = async (reviewId) => {
    const likePayload = {
      userId: currUser.id,
      reviewId: reviewId,
    };
    console.log(likePayload);
    const response = await likeReview(likePayload);
    console.log(response);
    dispatch(incrementUpdateCounter());
  };

  const handleDislike = async (reviewId) => {
    const dislikePayload = {
      userId: currUser.id,
      reviewId: reviewId,
    };
    console.log(dislikePayload);
    await dislikeReview(dislikePayload);
    dispatch(incrementUpdateCounter());
  };

  return (
    <div>
      {reviews.map((review) => (
        <Card
          key={review.review_id}
          className="review-card"
          sx={{ marginBottom: 2, boxShadow: 3 }}
        >
          <CardContent>
            <Box
              className="review-box"
              sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                {review.user.username}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  name="read-only"
                  value={parseFloat(review.rating)}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: 2 }}
                >
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" color="text.primary" paragraph>
              {review.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton aria-label="comment" color="primary">
                <CommentIcon />
              </IconButton>
              <Box>
                <IconButton
                  aria-label="like"
                  // Apply green color if liked, otherwise default
                  sx={{
                    color: review.highlight === "like" ? "green" : "inherit", // 'inherit' will use the parent's color
                  }}
                  onClick={() => handleLike(review.review_id)}
                >
                  <ThumbUpIcon />
                  <Typography component="span">{review.likes}</Typography>
                </IconButton>
                <IconButton
                  aria-label="dislike"
                  // Apply red color if disliked, otherwise default
                  sx={{
                    color: review.highlight === "dislike" ? "red" : "inherit", // 'inherit' will use the parent's color
                    marginLeft: 1,
                  }}
                  onClick={() => handleDislike(review.review_id)}
                >
                  <ThumbDownIcon />
                  <Typography component="span">{review.dislikes}</Typography>
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantReviews;
