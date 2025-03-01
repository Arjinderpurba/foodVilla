import { restaurantList } from "./config";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";

function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) => restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase()));
    
    return filterData;
    
}
//.tolowercase()?  .tolowercase

const Body = () => {

    const [allRestaurants, setallRestaurants] = useState([]);
    const [ filteredRestaurants , setfilteredRestaurants]  = useState([]);
    //searchText is a local state variable
    const [searchText, setsearchText] = useState("");//to create state variable
    // console.log(restaurants);
    
    useEffect(() => {
        getRestaurants();
    }, []);
    // console.log('hello');
     
    async function getRestaurants() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.6339793&lng=74.8722642&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        console.log(json);
        setallRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);  
    }
    
    //not render component(early)
    if(!allRestaurants) return null;

    if(filteredRestaurants?.length === 0) return <h1>No Restaurant match your Filter!!</h1>;
    
    return (allRestaurants.length === 0 ) ? <Shimmer/> : (
        <>
        <div className="search-container">
            <input type="text" 
            className="search-input" 
            placeholder="Search" 
            value={searchText}
            onChange={(e) => {
                //e.target.value = whatever u write in input
                setsearchText(e.target.value)
            }
            }
            />
            <button 
                className="search-btn"
                onClick={()=> {
                    // need to filter the data-reslist
                    const data = filterData(searchText,allRestaurants);
                    //update the state - restrnts
                    setfilteredRestaurants(data);
                }}
                
            >    
                Search
            </button>
        </div>
        <div className="restaurant-list">
            {/*Write logic for no restaurant found here*/}
            {filteredRestaurants.map(restaurant => {
                return <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
            })}
        </div>
        </>
    );
};

export default Body ;

