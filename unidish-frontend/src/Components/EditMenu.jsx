import {
  Box,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  addMenuItem,
  editMenuItem,
  getMenuItemsForRestaurant,
} from "../Axios/APICalls";

const EditMenu = ({ open, onClose, restaurant }) => {
  console.log(restaurant);
  const [menuItems, setMenuItems] = useState([
    { name: "", price: "", calories: "", description: "" },
  ]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    calories: "",
    description: "",
    restaurantId: "",
  });
  useEffect(() => {
    if (restaurant) {
      setNewMenuItem({
        name: "",
        price: "",
        calories: "",
        description: "",
        restaurantId: restaurant.id,
      });
    }
    const fetchMenuItems = async () => {
      if (restaurant) {
        try {
          const menu = await getMenuItemsForRestaurant(restaurant.id);
          const formattedMenuItems = menu.menu_items.map((item) => ({
            id: item[0], // Assuming the first element is the id
            name: item[1],
            calories: item[2],
            price: item[3],
            description: item[4],
            restaurant_id: item[5], // Assuming the last element is the restaurant_id
          }));
          console.log(menu.menu_items);
          //   setMenuItems(menu.menu_items);
          setMenuItems(formattedMenuItems);
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      }
    };
    fetchMenuItems();
  }, [restaurant]);

  const handleInputChange = (e, itemIndex, attributeIndex) => {
    console.log(menuItems);
    const { name, value } = e.target;
    // console.log(name, value, itemIndex);
    if (itemIndex >= 0) {
      // Update an existing item
      const newMenuItems = [...menuItems];
      newMenuItems[itemIndex] = { ...newMenuItems[itemIndex], [name]: value };
      setMenuItems(newMenuItems);
    } else {
      // Update the form for a new item
      console.log(name, value);
      //   setMenuItems({ ...menuItems, [name]: value });
      setNewMenuItem({ ...newMenuItem, [name]: value });
    }
  };

  const handleUpdate = async (menuItem) => {
    console.log(menuItem);
    // const response = await editMenuItem(menuItem);
    editMenuItem(menuItem);
  };

  const handleAdd = async (menuItem) => {
    console.log(menuItem);
    addMenuItem(newMenuItem);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="Edit-Profile-Box">
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Menu at {restaurant ? restaurant.name : ""}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item, index) => {
              console.log(item);
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <TextField
                      name="name"
                      value={item.name}
                      onChange={(e) => handleInputChange(e, index, 1)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="price"
                      value={item.price}
                      onChange={(e) => handleInputChange(e, index, 3)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="calories"
                      value={item.calories}
                      onChange={(e) => handleInputChange(e, index, 2)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="description"
                      value={item.description}
                      onChange={(e) => handleInputChange(e, index, 4)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <TextField
                  name="name"
                  //   value={menuItems.name}
                  onChange={(e) => handleInputChange(e, -1)}
                  placeholder="Name"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="price"
                  //   value={menuItems.price}
                  onChange={(e) => handleInputChange(e, -1)}
                  placeholder="Price"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="calories"
                  //   value={menuItems.calories}
                  onChange={(e) => handleInputChange(e, -1)}
                  placeholder="Calories"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="description"
                  //   value={menuItems.description}
                  onChange={(e) => handleInputChange(e, -1)}
                  placeholder="Description"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAdd(newMenuItem)}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};

export default EditMenu;
