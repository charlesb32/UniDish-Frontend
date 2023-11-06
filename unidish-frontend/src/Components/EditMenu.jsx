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
import { getMenuItemsForRestaurant } from "../Axios/APICalls";

const EditMenu = ({ open, onClose, restaurant }) => {
  console.log(restaurant);
  const [menuItems, setMenuItems] = useState([
    { name: "", price: "", calories: "", description: "" },
  ]);
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menu = await getMenuItemsForRestaurant(restaurant.id);
        console.log(menu.menu_items);
        setMenuItems(menu.menu_items);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchMenuItems();
  }, [restaurant]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="Edit-Profile-Box">
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Menu Items
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
            {menuItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <TextField
                    name="name"
                    value={item.name}
                    // onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="price"
                    value={item.price}
                    // onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="calories"
                    value={item.calories}
                    // onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="description"
                    value={item.description}
                    // onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button>Update</Button>
                </TableCell>
              </TableRow>
            ))}
            {/* <TableRow>
              <TableCell>
                <TextField
                  name="name"
                  value={menuItems.name}
                //   onChange={(e) => handleInputChange(e, -1)}
                  placeholder="New item name"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="price"
                  value={menuItem.price}
                  onChange={(e) => handleInputChange(e, -1)}
                  placeholder="Price"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="calories"
                  value={menuItems.calories}
                //   onChange={(e) => handleInputChange(e, -1)}
                  placeholder="Calories"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="description"
                  value={menuItems.description}
                //   onChange={(e) => handleInputChange(e, -1)}
                  placeholder="Description"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Button>Add</Button>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};

export default EditMenu;
