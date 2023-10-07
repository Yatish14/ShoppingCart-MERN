import express from "express";
const routes = express.Router();
import Products from "../models/Products.js";

routes.get('/product-items', async (req, res) => {
    try {
        const allProducts = await Products.find();
        res.json(allProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "An error occurred" });
    }
});

export default routes;