import express, { Request, Response } from "express";
import {
  addAllItemsToCart,
  addToCart,
  addToWishlist,
  decrementCart,
  deletFromCart,
  delteAllCartItems,
  getCart,
  getProduct,
  getProducts,
  incrementDecrementCart,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

router.use(Authenticate);
router.post("/wishlist", addToWishlist);

// Cart
router.post("/cart", addToCart);
router.post("/cart/increment-decrement", incrementDecrementCart);
router.post("/cart/decrement", decrementCart);
router.post("/cart/all", addAllItemsToCart);
router.get("/cart");
router.delete("/cart/:id", deletFromCart);
router.delete("/cart/all", delteAllCartItems);

export { router as ProductRoutes };
