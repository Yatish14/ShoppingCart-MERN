import { Card } from "react-bootstrap"
import { Ratings } from "./Ratings"
import { Button } from "react-bootstrap";
import axios from "axios"
import { useState, useEffect } from 'react';
import notify from "../Notify/Notification";

import "./SingleItem.css";
export const SingleItem = ({item}) => {
  const [cart, setcart] = useState();

  const fetchCartItems = () => {
    axios
      .get("http://localhost:5000/cart-items")
      .then((response) => {
        setcart(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(fetchCartItems, [cart]);

  const addItem = () =>
  {
    axios.post('http://localhost:5000/cart-items', item)
    .then((Response) => {
        console.log(Response.data)
        fetchCartItems();
        notify("success", "Product Added to Cart ");
    })
    .catch((err) => {
      console.log("Error",err)
    })
  }
        
  const deleteItem = () => {
    axios.delete(`http://localhost:5000/cart-items/${item._id}`)
    .then((Response) => {
        console.log(Response.data)
        fetchCartItems();
    })
    .catch(error => {
      console.log("Error",error)
      })

  }

  return (
    <div className="singleItem">
      <Card>
        <Card.Img variant='top' src = {item.image} alt={item.name} style={{width: "100%",height: 200,objectFit: "contain"}}/>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle style={{paddingBottom: 10}}>
            <span>
              ₹ {item.price}
            </span>
            {item.fastDelivery ? (<div>Fast Delivery</div>) : (<div>3 days Delivery</div>)}
            <Ratings rating={item.rating}/>
          </Card.Subtitle>
          {
            cart?.some(cartId => cartId._id === item._id) ? (
            <Button 
              onClick={deleteItem}
              variant="danger"
            >Remove from Cart
            </Button>) : (
            <Button
              onClick={addItem}
              disabled={!item.inStock}
            >
              {!item.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>)
          }
        </Card.Body>
      </Card>
    </div>
  )
}
