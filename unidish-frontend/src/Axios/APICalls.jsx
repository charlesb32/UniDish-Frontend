import axios from "axios";

const baseURL = "http://localhost:4000/";
const instance = axios.create({ baseURL });

export const checkDBConnection = async () => {
  try {
    const response = await instance.get("/check_db_connection");
    return response;
  } catch (err) {
    throw err;
  }
};
