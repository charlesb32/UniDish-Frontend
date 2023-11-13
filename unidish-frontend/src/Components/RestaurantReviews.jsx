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
import { dislike, getReviews, like } from "../Axios/APICalls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incrementUpdateCounter } from "../Redux/diningUpdateActions";
import Comment from "./Comment";

const RestaurantReviews = ({ restaurant }) => {
  const currUser = useSelector((state) => state.user.userInfo.user.sub);
  const reviewInteractionCount = useSelector(
    (state) => state.diningUpdateFlag.updateCounter
  );
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [currPost, setCurrPost] = useState({});
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews(restaurant[0], currUser.id);
        setReviews(reviewsData);
      } catch (error) {
        throw error;
      }
    };
    fetchReviews();
  }, [restaurant, reviewInteractionCount, currUser]);

  const handleLike = async (reviewId) => {
    const likePayload = {
      userId: currUser.id,
      postId: reviewId,
      likeType: "review",
    };
    await like(likePayload);
    dispatch(incrementUpdateCounter());
  };

  const handleDislike = async (reviewId) => {
    const dislikePayload = {
      userId: currUser.id,
      postId: reviewId,
      dislikeType: "review",
    };
    await dislike(dislikePayload);
    dispatch(incrementUpdateCounter());
  };

  const handleCommentClick = (review) => {
    setOpenCommentModal(true);
    setCurrPost(review);
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
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
              <IconButton
                aria-label="comment"
                color="primary"
                onClick={() => handleCommentClick(review)}
              >
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

      <Comment
        open={openCommentModal}
        onClose={handleCloseCommentModal}
        post={currPost}
      />
    </div>
  );
};

export default RestaurantReviews;
