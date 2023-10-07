import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import cart from "./routes/cart.js"
import dotenv from 'dotenv';
import Products from "./routes/product.js";
dotenv.config();


const app = express();
app.use(express.json({limit : "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get('/',(req, res) => {
    res.send("Shopping Cart API")
})

app.use(cart)
app.use('/',Products)

const PORT = process.env.PORT || 5000

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT,() => {console.log(`server running  port ${PORT}`)}))
    .catch((err) => console.log(err.message))