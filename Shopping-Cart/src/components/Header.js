import
{
    Container,
    FormControl,
    Nav,
    Navbar,
    Dropdown,
    Badge,
    Button
} 
from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from 'react-icons/fa';
import { Link,useLocation } from "react-router-dom";
import "./Header.css";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { FilterContext } from "../Context/ContextAPI";

const Header = () => {
    const [cart, setcart] = useState();
    const {FilterDispatch} = useContext(FilterContext);

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
    <Navbar bg="dark" variant="dark" style={{height: 60,marginBottom: 10}}>
        <Container>
            <Navbar.Brand>
                <Link to = "/" style={{fontSize: 30,color: "white",textDecoration: "none"}}>Shopping Cart</Link>
            </Navbar.Brand>
            {useLocation().pathname!== "/Shopping-Cart/cart" && (
            <Navbar.Text className="searchbar">
                <FormControl 
                    placeholder = "Search the Products..."
                    style = {{width : 500}}
                    className = "m-auto"
                    onChange={(e) => {FilterDispatch({type: "Filter_by_Search",payload: e.target.value})}}
                />
            </Navbar.Text>
            )}
            <Nav>
                <Dropdown align={{ sm:"right" }}>
                    <Dropdown.Toggle variant = "success">
                        <FaShoppingCart />
                        <Badge bg="">{cart?.length}</Badge>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{minWidth : 300,padding: 10}}>
                    {
                        cart?.length ? (
                        <>
                            {cart.map((item) => {
                                return(
                                <span className="eachcartItem" key={item.id}>
                                    <img
                                        src={item.image}
                                        className="eachcartItemImage"
                                        alt={item.name}
                                    />
                                    <div className="cartItemBody">
                                    <span>{item.name}</span>
                                    <span>₹ {item.price}</span>
                                    </div>
                                    <AiFillDelete
                                        style={{ cursor: "pointer" }}
                                        onClick={() => deleteItem(item)}
                                    />
                                </span>
                            )})}
                            <Link to="/cart">
                                <Button style={{width: "95%",margin: "0 10px"}}>Go to Cart</Button>
                            </Link>
                        </>
                        
                        ) : (<span style={{padding : 8}}>Your Cart is Empty!</span>)
                    }
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header