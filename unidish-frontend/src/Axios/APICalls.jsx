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
    Authorization: `Bearer ${token}`,
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
