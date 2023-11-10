import axios from "axios";
import { setAuthToken } from "./setAuthToken";

const baseURL = "http://localhost:5000/";
const instance = axios.create({ baseURL });

export const checkDBConnection = async () => {
  try {
    const response = await instance.get("/check_db_connection");
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await instance.post("/addUser", { userData });
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    return error;
  }
};

export const login = async (loginPayload) => {
  try {
    const response = await instance.post("/login", { loginPayload });
    const { token } = response.data;
    console.log(token);
    localStorage.setItem("token", token);
    setAuthToken(token);
    return token;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getUserByToken = async (token) => {
  const headers = {
    Authorization: `${token}`,
  };
  try {
    const user = await instance.get("/getUserByToken", { headers });
    return user;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getDiningHallsWithRestaurants = async () => {
  try {
    const response = await instance.get("/getDiningHallsWithRestaurants");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getRestaurantById = async (restId) => {
  try {
    const response = await instance.get("/getRestaurantById", {
      params: { restId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getMenuItemsForRestaurant = async (restId) => {
  try {
    const response = await instance.get("/getMenuItemsForRestaurant", {
      params: { restId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const updateUserInfo = async (userInfo) => {
  try {
    const response = await instance.put("/updateUserInfo", { userInfo });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const changePassword = async (passwordPayload, userId) => {
  try {
    const response = await instance.put("/updatePassword", {
      passwordPayload,
      userId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const addDiningHall = async (diningHallData) => {
  try {
    const response = await instance.post("/addDiningHall", { diningHallData });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const addRestaurant = async (restData) => {
  try {
    const response = await instance.post("/addRestaurant", { restData });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const deleteRestaurant = async (restId) => {
  try {
    const response = await instance.delete(`deleteRestaurant/${restId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const deleteDiningHall = async (diningHallId) => {
  try {
    const response = await instance.delete(`deleteDiningHall/${diningHallId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const editRestaurant = async (restData) => {
  try {
    const response = await instance.put("/editRestaurant", { restData });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const editDiningHall = async (diningHallData) => {
  try {
    const response = await instance.put("/editDiningHall", { diningHallData });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const editMenuItem = async (menuItem) => {
  try {
    const response = await instance.put("/editMenuItem", { menuItem });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const deleteMenuItem = async (menuItemId) => {
  try {
    const response = await instance.delete(`deleteMenuItem/${menuItemId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const addMenuItem = async (menuItem) => {
  try {
    const response = await instance.post("/addMenuItem", { menuItem });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getReviews = async (restId, currUserId) => {
  try {
    const response = await instance.get("/getReviews", {
      params: { restId: restId, currUserId: currUserId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await instance.get("/getUserById", {
      params: { userId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const likeReview = async (likeInfo) => {
  try {
    const response = await instance.post("/likeReview", { likeInfo });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const dislikeReview = async (dislikeInfo) => {
  try {
    const response = await instance.post("/dislikeReview", { dislikeInfo });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getOverallRestaurantRating = async (restId) => {
  try {
    const response = await instance.get("/getOverallRestaurantRating", {
      params: { restId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const createReview = async (reviewInfo) => {
  try {
    const response = await instance.post("/createReview", { reviewInfo });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};
