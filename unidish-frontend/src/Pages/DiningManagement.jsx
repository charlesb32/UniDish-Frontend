import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { getDiningHallsWithRestaurants } from "../Axios/APICalls";
import AddRestaurant from "../Components/AddRestaurant";
import DeleteRestaurant from "../Components/DeleteRestaurant";
import EditRestaurant from "../Components/EditRestaurant";
import AddDiningHall from "../Components/AddDiningHall";
import EditDiningHall from "../Components/EditDiningHall";
import DeleteDiningHall from "../Components/DeleteDiningHall";
import EditMenu from "../Components/EditMenu";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../Styling/DiningManagement.css";
const DiningManagement = () => {
  const diningUpdateCount = useSelector(
    (state) => state.diningUpdateFlag.updateCounter
  );
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDiningHall, setSelectedDiningHall] = useState(null);
  const [openAddRestaurantModal, setOpenAddRestaurantModal] = useState(false);
  const [openDeleteRestaurantModal, setOpenDeleteRestaurantModal] =
    useState(false);
  const [openEditRestaurantModal, setOpenEditRestaurantModal] = useState(false);
  const [openAddDiningHallModal, setOpenAddDiningHallModal] = useState(false);
  const [openEditDiningHallModal, setOpenEditDiningHallModal] = useState(false);
  const [openDeleteDiningHallModal, setOpenDeleteDiningHallModal] =
    useState(false);
  const [openEditMenuModal, setOpenEditMenuModal] = useState(false);

  const handleAddRestaurantClick = (diningHall) => {
    setOpenAddRestaurantModal(true);
    setSelectedDiningHall(diningHall.dining_hall);
  };

  const handleAddDiningHallClick = () => {
    setOpenAddDiningHallModal(true);
  };

  const handleEditDiningHallClick = (diningHall) => {
    setSelectedDiningHall(diningHall.dining_hall);
    setOpenEditDiningHallModal(true);
  };
  const handleCloseAddRestaurant = () => {
    setOpenAddRestaurantModal(false);
  };

  const handleCloseDeleteRestaurant = () => {
    setOpenDeleteRestaurantModal(false);
  };

  const handleCloseDeleteDiningHall = () => {
    setOpenDeleteDiningHallModal(false);
  };

  const handleCloseEditRestaurant = () => {
    setOpenEditRestaurantModal(false);
  };

  const handleCloseAddDiningHall = () => {
    setOpenAddDiningHallModal(false);
  };

  const handleCloseEditDiningHall = () => {
    setOpenEditDiningHallModal(false);
  };

  const handleDeleteDiningHall = (diningHall) => {
    setSelectedDiningHall(diningHall);
    setOpenDeleteDiningHallModal(true);
  };

  const handleCloseEditMenu = () => {
    setOpenEditMenuModal(false);
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
  }, [diningUpdateCount]);

  return (
    <div className="DiningHall-Management-Container">
      <div className="add-dining-hall-button-container">
        <Button variant="contained" onClick={handleAddDiningHallClick}>
          Add New Dining Hall
        </Button>
      </div>
      <Grid container spacing={2} className="DiningHall-Management-Card">
        {data.length > 0 &&
          data.map((diningHall) => (
            <Grid item xs={12} sm={6} md={4} key={diningHall.id}>
              <Card>
                <CardContent>
                  <div className="Manage-Dining-Hall-Card-Header">
                    <Typography variant="h6">
                      {diningHall.dining_hall[1]}
                    </Typography>
                    <div className="Button-Group">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleAddRestaurantClick(diningHall)}
                      >
                        add restaurant
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handleEditDiningHallClick(diningHall)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handleDeleteDiningHall(diningHall)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <ul>
                    {diningHall.restaurants.map((restaurant) => (
                      <div className="Manage-Restaurant" key={restaurant.id}>
                        <li>{restaurant.name}</li>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, restaurant)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </div>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setOpenEditRestaurantModal(true);
            handleMenuClose();
          }}
        >
          Edit Restaurant Info
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenEditMenuModal(true);
            handleMenuClose();
          }}
        >
          Edit Menu
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteRestaurantModal(true);
            handleMenuClose();
          }}
        >
          Delete Restaurant
        </MenuItem>
      </Menu>
      <AddRestaurant
        open={openAddRestaurantModal}
        onClose={handleCloseAddRestaurant}
        diningHall={selectedDiningHall}
      />
      <EditRestaurant
        open={openEditRestaurantModal}
        onClose={handleCloseEditRestaurant}
        restaurant={selectedRestaurant}
      />
      <DeleteRestaurant
        open={openDeleteRestaurantModal}
        onClose={handleCloseDeleteRestaurant}
        restaurant={selectedRestaurant}
      />
      <AddDiningHall
        open={openAddDiningHallModal}
        onClose={handleCloseAddDiningHall}
      />
      <EditDiningHall
        open={openEditDiningHallModal}
        onClose={handleCloseEditDiningHall}
        diningHall={selectedDiningHall}
      />
      <DeleteDiningHall
        open={openDeleteDiningHallModal}
        onClose={handleCloseDeleteDiningHall}
        diningHall={selectedDiningHall}
      />
      <EditMenu
        open={openEditMenuModal}
        onClose={handleCloseEditMenu}
        restaurant={selectedRestaurant}
      />
    </div>
  );
};

export default DiningManagement;
