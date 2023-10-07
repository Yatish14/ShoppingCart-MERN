import { SingleItem } from "./SingleItem";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { FilterContext } from "../Context/ContextAPI";
import { FilterItems } from "./FilterItems";
import { useContext } from "react";
const Home = () => {
  const [data, setData] = useState([]);
  const {FilterState: {byStock,byFastDelivery,byRating,sort,searchItem}, FilterDispatch} = useContext(FilterContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/product-items")
      .then((response) => {
        console.log("API Data", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const FilteredItems = () => {
    let filteredItems = data;
    if (sort) {
      filteredItems = filteredItems.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      filteredItems = filteredItems.filter((item) => item.inStock);
    }
    if (byFastDelivery) {
      filteredItems = filteredItems.filter((item) => item.fastDelivery);
    }
    if (byRating) {
      filteredItems = filteredItems.filter((item) => item.rating >= byRating);
    }
    if (searchItem) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchItem)
      );
    }
    return filteredItems;
  };

  return (
    <div className="Homepage">
      <FilterItems/>
      <div className="cardItem">
        {/* {data.map((item) => {
            return <SingleItem item={item} key={item.id}/>
        })} */}
        {FilteredItems().map((item) => {
          return <SingleItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
