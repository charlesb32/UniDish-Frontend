import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../Axios/APICalls";
import RestaurantHeader from "../Components/RestaurantHeader";
import RestaurantReviews from "../Components/RestaurantReviews";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const rest = await getRestaurantById(restaurantId);
        setRestaurant(rest);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);
  return (
    <div className="Restaurant-Content">
      <div className="Restaurant-Card-Header">
        {restaurant && <RestaurantHeader restaurant={restaurant.restaurant} />}
      </div>
      <div className="Restaurant-Reviews">
        {restaurant && <RestaurantReviews restaurant={restaurant.restaurant} />}
      </div>
    </div>
  );
};

export default Restaurant;
