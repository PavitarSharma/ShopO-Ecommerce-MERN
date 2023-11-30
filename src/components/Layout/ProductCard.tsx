import useCart from "@/hooks/product/useCart";
import useWishlist from "@/hooks/product/useWishlist";
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
import AddToCart from "./AddToCart";
import { Button } from "../ui/button";

interface ProductProp {
  product: Product | null;
}

const ProductCard = ({ product }: ProductProp) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    product?.isFavorite || false
  );
  const productViewModal = useProductViewModal();
  const { addToCart, count, handleDecrement, handleIncrement } = useCart({
    product,
  });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  const { toggleIsFavorite } = useWishlist();

  const handleFavorte = async () => {
    setIsFavorite((prevState) => !prevState);
    await toggleIsFavorite(isFavorite, product as Product);
  };

  const onToggle = useCallback(() => {
    productViewModal.onOpen();
    if (product) {
      dispatch(getProduct(product));
    }
  }, [productViewModal, dispatch, product]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product?._id, count);
    }
  };

  const handleButtonClick = () => {
    setVisible((prev) => !prev);
    setHover(false); // Reset hover state when button is clicked
  };

  const name = product?.name;

  return (
    <>
      <div className="relative bg-white shadow p-2 rounded-lg">
        <div className="absolute right-1 flex flex-col">
          <button onClick={handleFavorte}>
            {isFavorite ? (
              <AiFillHeart color="red" size={24} title="Favorite" />
            ) : (
              <AiOutlineHeart color="#333" size={24} title="Favorite" />
            )}
          </button>
          <button onClick={onToggle}>
            <AiOutlineEye size={24} title="View" color="#333" />
          </button>
          <button
            disabled={product?.stock === 0}
            onClick={handleButtonClick}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <AiOutlineShoppingCart size={24} title="Cart" color="#333" />
          </button>
        </div>

        <div
          className={`z-10 h-[150px] w-full absolute -bottom-0 bg-white border-t shadow left-0 right-0 ${
            hover || visible ? "opacity-1" : "opacity-0"
          } duration-300 transition-all flex flex-col justify-center items-center gap-2`}
        >
          {product?.stock === 0 ? (
            <Button>Not in Stock</Button>
          ) : (
            <>
              <AddToCart
                count={count}
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                product={product}
              />
              <Button className="mt-3" onClick={handleAddToCart}>
                <span className="mr-2">Add to Cart</span>
                <AiOutlineShoppingCart size={20} />
              </Button>
            </>
          )}
        </div>
        <div>
          <Link to={`/products/abc`}>
            <img
              src={product?.images[0]?.url}
              alt={product?.name}
              loading="lazy"
              className="w-full h-[170px] object-contain"
            />
          </Link>
        </div>

        <div>
          <p className="text-blue-600 capitalize mt-2">{product?.brand}</p>
          <h5 className="font-semibold my-2 md:text-xl text-lg">
            {name && name?.length > 40 ? name?.slice(0, 40) + "..." : name}
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

export default ProductCard;
