import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useProductViewModal from "@/hooks/useProductViewModal";
import useUserProfile from "@/hooks/useUserProfile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SelectAuthState } from "@/redux/slices/authSlice";
import { getProduct } from "@/redux/slices/productSlice";
import { currencyFormat } from "@/utils/CurrencyFormat";
import { handleApiError } from "@/utils/handleApiError";
import { Product } from "@/utils/types";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";

interface ProductProp {
  product: Product | null;
  isCart?: boolean;
}

const ProductListView = ({ product, isCart }: ProductProp) => {
  const axiosPrivate = useAxiosPrivate();
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite);
  const { isAuth } = useAppSelector(SelectAuthState);
  const productViewModal = useProductViewModal();
  const { mutate } = useUserProfile();
  const dispatch = useAppDispatch();

  const onToggle = useCallback(() => {
    productViewModal.onOpen();
    if (product) {
      dispatch(getProduct(product));
    }
  }, [productViewModal, dispatch, product]);

  const toggleIsFavorite = useCallback(async () => {
    if (!isAuth) {
      toast.error("You are not logged in. Please login");
      return;
    }
    setIsFavorite((prevState) => !prevState);
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
  }, [isAuth, axiosPrivate, product, isFavorite, mutate]);

  const name = product?.name;
  return (
    <>
      <div className={`relative bg-white shadow ${isCart && "border border-gray-300"} p-2 rounded-lg sm:flex`}>
        <div className="absolute right-4 top-4 flex flex-col">
          <button onClick={toggleIsFavorite}>
            {isFavorite ? (
              <AiFillHeart color="red" size={24} title="Favorite" />
            ) : (
              <AiOutlineHeart color="#333" size={24} title="Favorite" />
            )}
          </button>
          <button onClick={onToggle}>
            <AiOutlineEye size={24} title="View" color="#333" />
          </button>
          <button onClick={() => {}}>
            <AiOutlineShoppingCart size={24} title="Cart" color="#333" />
          </button>
        </div>
        <Link to={`/products/abc`}>
          <img
            src={product?.images[0]?.url}
            alt={product?.name}
            loading="lazy"
            className="w-full h-[170px] object-contain p-2"
          />
        </Link>

        <div>
          <p className="text-blue-600 capitalize">{product?.brand}</p>

          <h5 className="break-words font-semibold w-80 my-2 md:text-xl text-lg">
            {isCart
              ? name && name.length > 30
                ? name.substring(0, 50) + "..."
                : name
              : name}
          </h5>

          <div className="flex items-center">
            <AiFillStar size={20} color="#f6ba00" />
            <AiFillStar size={20} color="#f6ba00" />
            <AiFillStar size={20} color="#f6ba00" />
            <AiFillStar size={20} color="#f6ba00" />
            <AiOutlineStar size={20} color="#f6ba00" />
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="relative flex">
              {/* <h5 className={`${styles.productDiscountPrice}`}>
                {product?.price === 0
                  ? product?.price
                  : product?.discount_price}
                $
              </h5> */}
              <h5 className="font-semibold">
                {currencyFormat(product?.originalPrice as number)}
              </h5>
              <del className="text-red-600 text-xs -mt-2 ml-1">
                {currencyFormat(product?.discountPrice as number)}
              </del>
            </div>

            <p className="text-green-600 font-medium">
              {product?.sold_out} Sold
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListView;
