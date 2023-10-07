import express from "express";
const routes = express.Router();
import CartItem from "../models/cart.js";

routes.get('/cart-items', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

routes.post('/cart-items', async (req, res) => {
  try {
    const newItem = req.body;
    console.log(newItem);
    const cartItem = new CartItem(newItem);
    await cartItem.save();
    res.json({ message: "Item added to the cart" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

routes.delete('/cart-items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    await CartItem.findByIdAndDelete(itemId);
    res.json({ message: "Item removed from the cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

routes.put('/cart-items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItemData = req.body;
    await CartItem.findByIdAndUpdate(itemId, updatedItemData);
    res.json({ message: "Item updated in the cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default routes;
