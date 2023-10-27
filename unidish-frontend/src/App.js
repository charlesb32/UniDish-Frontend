import "./App.css";
import React, { useState } from "react";
// import { checkDBConnection } from "./Axios/APICalls";
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import DiningHall from "./Pages/DiningHall";
// import Button from "@mui/material/Button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (isLoggedIn) {
    return (
      <div className="App">
        <BrowserRouter>
          <Topbar />
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<DiningHall />} />
              {/* <Route path="/" element={<DiningHall />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
        {/* <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "300px" }}
        onClick={async () => {
          const res = await checkDBConnection();
          console.log(res);
          alert(
            "Connection successful to db! The first dining hall if represented in a table as: \n" +
              res.data
          );
        }}
      >
        Check DB Connection
      </Button> */}
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Redirect to /login by default if none of the above routes match */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
