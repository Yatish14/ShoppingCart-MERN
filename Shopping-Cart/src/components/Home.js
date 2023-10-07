import { SingleItem } from "./SingleItem"
import { useState,useEffect } from "react";
import axios from "axios";
import "./Home.css"
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/product-items')
      .then((response) => {
        console.log("API Data",response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="Homepage">
      <div className="cardItem">
        {data.map((item) => {
            return <SingleItem item={item} key={item.id}/>
        })}
      </div>
    </div>
  )
}

export default Home
