import {
  Box,
  Modal,
  Typography,
  IconButton,
  Rating,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useEffect, useState } from "react";
import {
  createComment,
  dislike,
  getReviewComments,
  like,
} from "../Axios/APICalls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incrementUpdateCounter } from "../Redux/diningUpdateActions";

const Comment = ({ open, onClose, post }) => {
  const currUser = useSelector((state) => state.user.userInfo.user.sub);
  const dispatch = useDispatch();
  const reviewInteractionCount = useSelector(
    (state) => state.diningUpdateFlag.updateCounter
  );
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // console.log(currUser);
        const comments = await getReviewComments(post.review_id, currUser.id);
        console.log(comments);
        setComments(comments.comment);
        // const reviewsData = await getReviews(restaurant[0], currUser.id);
        // console.log(reviewsData);
        // setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchComments();
  }, [post, currUser.id, reviewInteractionCount]);
  console.log(post);

  const handleLike = async (commentId) => {
    const likePayload = {
      userId: currUser.id,
      postId: commentId,
      likeType: "comment",
    };
    console.log(likePayload);
    const response = await like(likePayload);
    console.log(response);
    dispatch(incrementUpdateCounter());
  };

  const handleDislike = async (commentId) => {
    const dislikePayload = {
      userId: currUser.id,
      postId: commentId,
      dislikeType: "comment",
    };
    console.log(dislikePayload);
    const response = await dislike(dislikePayload);
    console.log(response);
    dispatch(incrementUpdateCounter());
  };

  const handleSubmit = async () => {
    console.log(comment);
    const now = new Date();
    const newNow = now.toISOString().slice(0, 19).replace("T", " ");
    const response = await createComment({
      description: comment,
      reviewId: post.review_id,
      date: newNow,
      userId: currUser.id,
    });
    setComment("");
    console.log(response);
    dispatch(incrementUpdateCounter());
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="View-Comments-Box">
        <Box
          className="review-box"
          sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: "bold", marginBottom: 1 }}
          >
            {post.user ? post.user.username : ""}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="read-only"
              value={parseFloat(post.rating)}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: 2 }}
            >
              {new Date(post.date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" color="text.primary" paragraph>
          {post.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <IconButton
            aria-label="comment"
            color="primary"
            // onClick={() => handleCommentClick(review)}
          >
            <CommentIcon />
          </IconButton> */}
          <Box>
            <IconButton
              aria-label="like"
              // Apply green color if liked, otherwise default
              sx={{
                color: post.highlight === "like" ? "green" : "inherit", // 'inherit' will use the parent's color
              }}
              //   onClick={() => handleLike(post.review_id)}
            >
              <ThumbUpIcon />
              <Typography component="span">{post.likes}</Typography>
            </IconButton>
            <IconButton
              aria-label="dislike"
              // Apply red color if disliked, otherwise default
              sx={{
                color: post.highlight === "dislike" ? "red" : "inherit", // 'inherit' will use the parent's color
                marginLeft: 1,
              }}
              //   onClick={() => handleDislike(post.review_id)}
            >
              <ThumbDownIcon />
              <Typography component="span">{post.dislikes}</Typography>
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          Comments:
        </Typography>
        <Box
          sx={{
            maxHeight: "50%", // Set the maximum height to 50% of the parent container
            overflowY: "auto", // Enable vertical scrolling
            // Add other styling as needed
          }}
        >
          {comments.map((comment) => (
            <Card
              key={comment.review_id}
              className="review-card"
              sx={{ marginBottom: 2, boxShadow: 3 }}
            >
              <CardContent>
                <Box
                  className="review-box"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {comment.user ? comment.user.username : ""}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* <Rating
                name="read-only"
                value={parseFloat(post.rating)}
                precision={0.1}
                readOnly
                size="small"
              /> */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginLeft: 2 }}
                    >
                      {new Date(comment.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" color="text.primary" paragraph>
                  {comment.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <IconButton
                    aria-label="comment"
                    color="primary"
                    //   onClick={() => handleCommentClick(review)}
                  >
                    <CommentIcon />
                  </IconButton> */}
                  <Box>
                    <IconButton
                      aria-label="like"
                      // Apply green color if liked, otherwise default
                      sx={{
                        color:
                          comment.highlight === "like" ? "green" : "inherit", // 'inherit' will use the parent's color
                      }}
                      onClick={() => handleLike(comment.comment_id)}
                    >
                      <ThumbUpIcon />
                      <Typography component="span">{comment.likes}</Typography>
                    </IconButton>
                    <IconButton
                      aria-label="dislike"
                      // Apply red color if disliked, otherwise default
                      sx={{
                        color:
                          comment.highlight === "dislike" ? "red" : "inherit", // 'inherit' will use the parent's color
                        marginLeft: 1,
                      }}
                      onClick={() => handleDislike(comment.comment_id)}
                    >
                      <ThumbDownIcon />
                      <Typography component="span">
                        {comment.dislikes}
                      </Typography>
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          placeholder="Write Comment Here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
        </Box>
      </Box>
    </Modal>
  );
};

export default Comment;
