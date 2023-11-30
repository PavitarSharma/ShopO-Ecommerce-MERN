import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { Product, User } from "../models";
import { findUser } from "../services";

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find().populate({
      path: "vendor",
      select: "_id name email coverImage phone address",
    });

    if (products.length === 0)
      return next(createError("No product found with this vendor"));

    res.status(200).json(products);
  }
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id).populate({
      path: "vendor",
      select: "_id name email coverImage phone address",
    });

    if (product === null) return next(createError("No product found"));

    res.status(200).json(product);
  }
);

export const addToWishlist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, isFavorite } = req.body;
    const product = await Product.findById(id);

    if (!product) return next(createError(404, "Product not found"));

    const user = await findUser(req.user?._id as string);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (isFavorite) {
      // Add product to wishlist
      if (!user.wishlists.includes(id)) {
        user.wishlists.push(id);
        await user.save();
      }
    } else {
      const index = user.wishlists.indexOf(id);
      if (index !== -1) {
        user.wishlists.splice(index, 1);
        await user.save();
      }
    }

    product.isFavorite = isFavorite;
    await product.save();

    res.status(200).json(product);
  }
);

// ********************* Cart ************************************
export const addToCart = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    const profile = await findUser(user._id);
    const { id, unit } = req.body;
    let cartItems = Array();

    const product = await Product.findById(id);

    if (product === null)
      return res.status(404).json({ message: "Product not found" });

    if (profile) {
      cartItems = profile?.cart;

      if (cartItems.length > 0) {
        const existingProductItem = cartItems.filter(
          (item) => item.product._id.toString() === id
        );

        if (existingProductItem.length > 0) {
          const index = cartItems.indexOf(existingProductItem[0]);

          if (unit > 0) {
            cartItems[index] = { product, unit };
          } else {
            cartItems.splice(index, 1);
          }
        } else {
          cartItems.push({ product, unit });
        }
      } else {
        cartItems.push({ product, unit });
      }

      if (cartItems) {
        profile.cart = cartItems as any;
        const cartResult = await profile.save();
        return res.status(200).json(cartResult.cart);
      }
    }
  }

  return res.status(500).json({ message: "Unable to add to cart" });
};

export const getCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("mab");
  }
);

export const incrementDecrementCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const profile = await findUser(req.user?._id as string);

    if (!profile) return next(createError(404, "User not logged in"));

    const { id, unit } = req.body;
    const cartItems = profile?.cart;

    const existingProductItem = cartItems.filter(
      (item) => item.product._id.toString() === id
    );

    const index = cartItems.indexOf(existingProductItem[0]);
    if (index === -1) {
      return next(createError(404, "Product not found in the cart"));
    }

    cartItems[index].unit = unit;

    const cartResult = await profile.save();

    res.status(200).json(cartResult.cart);
  }
);

export const decrementCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);

    res.status(200).json("mab");
  }
);

export const deletFromCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(createError(401, "User not authenticated"));
    }

    const productIdToDelete = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const updatedCart = user.cart.filter(
      (item) => item.product.toString() !== productIdToDelete
    );

    user.cart = updatedCart;
    await user.save();

    res.status(200).json(user.cart);
  }
);

export const delteAllCartItems = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    user.cart = [];

    // Save the updated user document
    await user.save();
  }
);

export const addAllItemsToCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) return next(createError(401, "User not authenticated"));

    const profile = await findUser(user._id);

    if (!profile) return next(createError(404, "User not found!"));

    const itemsToAdd = req.body 
console.log(req.body);

    res.status(200).json(req.body)

    // const allProducts = await Product.find();

    // if (!allProducts || allProducts.length === 0)
    //   return next(createError(404, "No products found"));

    // const cartItems = allProducts.map((product) => {
    //   const itemToAdd = itemsToAdd.find(
    //     (item) => item.productId === product._id.toString()
    //   );
    //   const unit = itemToAdd ? itemToAdd.unit : 1;

    //   return {
    //     product,
    //     unit,
    //   };
    // });

    // profile.cart = cartItems as any;

    // const cartResult = await profile.save();
    // res.status(200).json(cartResult.cart);
  }
);
