import mongoose from "mongoose";

const PrdouctSchema = mongoose.Schema([{
    name: { type: String, required: "Product must have a Name"},
    price: { type: Number, required: "Product must have a Price"},
    image: { type: String, required: "Product must have an Image"},
    inStock: { type: Number, default: 4},
    fastDelivery: { type: Boolean},
    rating: { type: Number, default: 3},
}])

export default mongoose.model("Products", PrdouctSchema)