import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Menu,
  MenuItem,
} from "@mui/material";
import { getDiningHallsWithRestaurants } from "../Axios/APICalls";
import AddRestaurant from "../Components/AddRestaurant";
import DeleteRestaurant from "../Components/DeleteRestaurant";
import EditRestaurant from "../Components/EditRestaurant";

const DiningManagement = () => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDiningHall, setSelectedDiningHall] = useState(null);
  const [openAddRestaurantModal, setOpenAddRestaurantModal] = useState(false);
  const [openDeleteRestaurantModal, setOpenDeleteRestaurantModal] =
    useState(false);
  const [openEditRestaurantModal, setOpenEditRestaurantModal] = useState(false);

  const handleAddRestaurantClick = (diningHall) => {
    console.log(diningHall);
    setOpenAddRestaurantModal(true);
    setSelectedDiningHall(diningHall.dining_hall);
  };

  const handleCloseAddRestaurant = () => {
    setOpenAddRestaurantModal(false);
  };

  const handleCloseDeleteRestaurant = () => {
    setOpenDeleteRestaurantModal(false);
  };

  const handleCloseEditRestaurant = () => {
    setOpenEditRestaurantModal(false);
  };
  const handleMenuOpen = (event, restaurant) => {
    setAnchorEl(event.currentTarget);
    setSelectedRestaurant(restaurant);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedRestaurant(null);
  };

  useEffect(() => {
    const fetchDiningHallsAndRestaurants = async () => {
      try {
        const res = await getDiningHallsWithRestaurants();

        if (res && res.dining_halls) {
          setData(res.dining_halls);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDiningHallsAndRestaurants();
  }, []);

  return (
    <div>
      <Button variant="contained">Add New Dining Hall</Button>
      <div className="DiningHall-Management-Card">
        {data.length > 0 &&
          data.map((diningHall) => {
            // console.log(diningHall.dining_hall[1]);
            return (
              <Card sx={{ minWidth: 500 }}>
                <CardContent>
                  <div key={diningHall.id}>
                    <div className="Manage-Dining-Hall-Card-Header">
                      <h3>{diningHall.dining_hall[1]}</h3>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAddRestaurantClick(diningHall)}
                      >
                        add restaurant
                      </Button>
                    </div>
                    <ul>
                      {diningHall.restaurants.map((restaurant) => (
                        <div className="Manage-Restaurant">
                          <li key={restaurant.id} style={{ cursor: "pointer" }}>
                            {restaurant.name}
                          </li>
                          <Button
                            size="small"
                            onClick={(e) => handleMenuOpen(e, restaurant)}
                          >
                            •••
                          </Button>
                        </div>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            console.log("Edit restaurant:", selectedRestaurant);
            setOpenEditRestaurantModal(true);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Delete restaurant:", selectedRestaurant);
            setOpenDeleteRestaurantModal(true);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <AddRestaurant
        open={openAddRestaurantModal}
        onClose={handleCloseAddRestaurant}
        diningHall={selectedDiningHall}
      />
      <DeleteRestaurant
        open={openDeleteRestaurantModal}
        onClose={handleCloseDeleteRestaurant}
        restaurant={selectedRestaurant}
      />
      <EditRestaurant
        open={openEditRestaurantModal}
        onClose={handleCloseEditRestaurant}
        restaurant={selectedRestaurant}
      />
    </div>
  );
};

export default DiningManagement;
