import mongoose from "mongoose";

const CartSchema = mongoose.Schema([{
  name: { type: String, required: "Product must have a Name"},
  price: { type: Number, required: "Product must have a Price"},
  image: { type: String, required: "Product must have an Image"},
  inStock: { type: Number, default: 4},
  fastDelivery: { type: Boolean},
  rating: { type: Number, default: 3},
  quantity: { type: Number, default: 1 },
  }]);

export default mongoose.model("CartItem", CartSchema)