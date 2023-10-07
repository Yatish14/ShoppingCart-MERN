import React from "react";
import { Button, Form, Image } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cart.css";
import { AiFillDelete } from "react-icons/ai";
import { Ratings } from "./Ratings";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FilterItems.css";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState();
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

  const deleteItem = (item) => {
    axios
      .delete(`http://localhost:5000/cart-items/${item._id}`)
      .then((Response) => {
        console.log(Response.data);
        fetchCartItems();
      })
      .catch((error) => {});
  };
  useEffect(() => {
    setTotalPrice(
      cart?.reduce(
        (acc, current) => acc + Number(current.price)*current.quantity,
        0
      )
    );
  }, [cart]);
  const handleQuantityChange = (event, item) => {
    const newQuantity = parseInt(event.target.value);
    setcart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );
    axios
      .put(`http://localhost:5000/cart-items/${item._id}`, { quantity: newQuantity })
      .then((Response) => {
        console.log(Response.data);
        fetchCartItems();
      })
      .catch((error) => {});
  };
  
  return (
    <div className="Homepage">
      <div className="CartItemDiv">
        <ListGroup>
          {cart?.map((item) => {
            return (
              <ListGroup.Item >
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded style={{objectFit: "contain"}}/>
                  </Col>
                  <Col md={2}>
                    <span>{item.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>₹ {item.price}</span>
                  </Col>
                  <Col md={2}>
                    <Ratings rating={item.rating} />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                    >
                      {[...Array(item.inStock).keys()].map((num) => (
                        <option key={num + 1}>{num + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button onClick={() => deleteItem(item)}>
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      <div className="filter subtotal">
        <span className="title">Subtotal ({cart?.length}) Items</span>
        <span>Total : ₹ {totalPrice} </span>
        <Button disabled={cart?.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
