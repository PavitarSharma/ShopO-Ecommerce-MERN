import { useCallback, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useAppSelector } from "@/redux/hooks";
import { SelectAuthState } from "@/redux/slices/authSlice";
import useUserProfile from "../useUserProfile";
import { Product } from "@/utils/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { handleApiError } from "@/utils/handleApiError";


const useWishlist = () => {
  const axiosPrivate = useAxiosPrivate();
  const { isAuth } = useAppSelector(SelectAuthState);
  const { mutate } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);

  const toggleIsFavorite = useCallback(async (isFavorite: boolean, product: Product) => {
    if (!isAuth) {
      toast.error("You are not logged in. Please login");
      return;
    }
    
    try {
      await axiosPrivate.post("/products/wishlist", {
        id: product?._id,
        isFavorite: !isFavorite,
      });

      mutate("/user/profile");
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
  }, [isAuth, axiosPrivate, mutate]);

  const addWishListToCart = async (wishlists) => {
    if (!isAuth) {
      toast.error(
        "To add product to cart you are not logged in. Please login!"
      );
      return;
    }

    setIsLoading(true);
    try {
      await axiosPrivate.post("/products/cart/all", wishlists)
      console.log(wishlists);
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearWishlist = async (wishlists) => {
    if (!isAuth) {
      toast.error(
        "To add product to cart you are not logged in. Please login!"
      );
      return;
    }

    setIsLoading(true);

    try {
      console.log(wishlists);
    } catch (error) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    toggleIsFavorite,
    addWishListToCart,
    clearWishlist,
    isLoading,
  };
};

export default useWishlist;
