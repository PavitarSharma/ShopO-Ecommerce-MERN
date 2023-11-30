import { useAppSelector } from "@/redux/hooks";
import useAxiosPrivate from "../useAxiosPrivate";
import { SelectAuthState } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";
import useUserProfile from "../useUserProfile";
import { CartItem, Product } from "@/utils/types";
import { useCallback, useState } from "react";

interface RequestBody {
  // Define the structure of your request body
  items: { productId: string; unit: number }[];
  // Add other properties if needed
}

interface CartProp {
  product: Product | null;
}
const useCart = ({ product }: CartProp) => {
  const axiosPrivate = useAxiosPrivate();
  const { isAuth } = useAppSelector(SelectAuthState);
  const { mutate, data: user } = useUserProfile();
  const cart = user?.cart;

  const [count, setCount] = useState<number>(
    (cart &&
      cart.find((item: CartItem) => item.product?._id === product?._id)
        ?.unit) ||
      1
  );

  const addToCart = async (id: string, unit: number = 1) => {
    if (!isAuth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      const { data } = await axiosPrivate.post("/products/cart", {
        id,
        unit,
      });
      mutate("/user/profile");
      console.log(data);
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };

  const incrementDecrementCart = async (id: string, unit: number = 1) => {
    if (!isAuth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      const { data } = await axiosPrivate.post(
        "/products/cart/increment-decrement",
        {
          id,
          unit,
        }
      );
      mutate("/user/profile");
      console.log(data);
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };

  const addAllItemsToCart = async (requestBody: RequestBody) => {
    if (!isAuth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      console.log(requestBody);

      // const { data } = await axiosPrivate.post(`/products/cart/all`, requestBody);
      // mutate("/user/profile");
      // console.log(data);
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };

  const deleteCartItem = async (id: string) => {
    if (!isAuth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      const { data } = await axiosPrivate.delete(`/products/cart/${id}`);
      mutate("/user/profile");
      console.log(data);
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };

  const deleteAllCartItems = async () => {
    if (!isAuth) {
      toast.error("You are not logged in. Please login");
      return;
    }

    try {
      const { data } = await axiosPrivate.delete(`/products/cart/all`);
      mutate("/user/profile");
      console.log(data);
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };

  const handleIncrement = useCallback(() => {
    if (product?.stock !== 0) {
      setCount((prevCount) =>
        prevCount === product?.stock ? prevCount : prevCount + 1
      );
    }
  }, [product?.stock]);

  const handleDecrement = useCallback(() => {
    setCount((prevCount) => (prevCount === 1 ? prevCount : prevCount - 1));
  }, []);

  const cartItems: CartItem[] = user?.cart;
  const isProductInCart = (product: Product, cartItem: Product): boolean => {
    return product._id === cartItem._id;
  };

  const isInCart = cartItems?.some((cartItem) => {
    const productInCart = cartItem.product;

    return isProductInCart(product as Product, productInCart);
  });

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, cartItem) => {
      const { product } = cartItem;
      return total + product.originalPrice * count;
    }, 0);
  };

  return {
    addToCart,
    isProductInCart,
    isInCart,
    count,
    setCount,
    handleDecrement,
    handleIncrement,
    getTotalPrice,
    incrementDecrementCart,
    deleteCartItem,
    deleteAllCartItems,
    addAllItemsToCart,
  };
};

export default useCart;
