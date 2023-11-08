import { useEffect, useState } from "react";
import { getDiningHallsWithRestaurants } from "../Axios/APICalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const diningUpdateCount = useSelector(
    (state) => state.diningUpdateFlag.updateCounter
  );

  useEffect(() => {
    // console.log("REDUX WORKED");
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

  const handleRestaurantClick = (rest) => {
    // console.log("CLICKED RESTAURANT: ", rest);
    navigate(`restaurants/${rest.id}`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* <h2>Dining Halls</h2> */}
        {data.length > 0 &&
          data.map((diningHall) => {
            // console.log(diningHall.dining_hall[1]);
            return (
              <div key={diningHall.id}>
                <h3>{diningHall.dining_hall[1]}</h3>
                <ul>
                  {diningHall.restaurants.map((restaurant) => (
                    <li
                      key={restaurant.id}
                      onClick={() => handleRestaurantClick(restaurant)}
                      style={{ cursor: "pointer" }}
                    >
                      {restaurant.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
