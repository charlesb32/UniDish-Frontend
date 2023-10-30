import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMenuItemsForRestaurant,
  getRestaurantById,
} from "../Axios/APICalls";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState();
  const [menuItems, setMenuItems] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const rest = await getRestaurantById(restaurantId);
        const menu = await getMenuItemsForRestaurant(restaurantId);
        console.log(menu);
        setRestaurant(rest);
        setMenuItems(menu);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]); // Adding restaurantId as a dependency
  return (
    <div>
      {restaurant && menuItems && (
        <div>Restaurant: {restaurant.restaurant[1]}</div>
      )}
    </div>
  );
};

export default Restaurant;
