import "./App.css";
import React, { useState } from "react";
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import DiningHall from "./Pages/DiningHall";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import Restaurant from "./Pages/Restaurant";
import ManageDiningHalls from "./Pages/DiningManagement";
import DiningManagement from "./Pages/DiningManagement";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currUser = useSelector((state) => state.user.userInfo.user.sub);
  const isLoggedIn = useSelector((state) => state.user.userInfo);

  if (isLoggedIn && currUser.type == "university admin") {
    return (
      <div className="App">
        <BrowserRouter>
          <Topbar />
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/DiningHalls" element={<DiningHall />} />
              <Route
                path="restaurants/:restaurantId"
                element={<Restaurant />}
              />
              <Route path="diningManagement" element={<DiningManagement />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  if (isLoggedIn) {
    return (
      <div className="App">
        <BrowserRouter>
          <Topbar />
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/DiningHalls" element={<DiningHall />} />
              <Route
                path="restaurants/:restaurantId"
                element={<Restaurant />}
              />
              {/* <Route path="/" element={<DiningHall />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
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
