import useProductViewModal from "@/hooks/useProductViewModal";
import { useAppDispatch } from "@/redux/hooks";
import { getProduct } from "@/redux/slices/productSlice";
import { currencyFormat } from "@/utils/CurrencyFormat";
import { Product } from "@/utils/types";
import { useCallback, useState } from "react";

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
}

const ProductListView = ({ product }: ProductProp) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const productViewModal = useProductViewModal();
  const dispatch = useAppDispatch();

  const onToggle = useCallback(() => {
    productViewModal.onOpen();
    if (product) {
      dispatch(getProduct(product));
    }
  }, [productViewModal, dispatch, product]);
  const toggleIsFavorite = useCallback(() => {
    setIsFavorite((prevState) => !prevState);
  }, []);

  const name = product?.name;
  return (
    <>
      <div className="relative bg-white shadow p-2 rounded-lg sm:flex">
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
            {name}
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
