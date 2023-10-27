import axios from "axios";

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
