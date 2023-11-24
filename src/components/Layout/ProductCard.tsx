import useProductViewModal from "@/hooks/useProductViewModal";
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

const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const productViewModal = useProductViewModal();

  const onToggle = useCallback(() => {
    productViewModal.onOpen();
  }, [productViewModal]);

  const toggleIsFavorite = useCallback(() => {
    setIsFavorite((prevState) => !prevState);
  }, []);

 
  const name = "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour";
  return (
    <>
      <div className="relative bg-white shadow p-2 rounded-lg">
        <div className="absolute right-1 flex flex-col">
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
            src="/images/mobile.jpg"
            alt="product"
            loading="lazy"
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <div>
          <p className="text-blue-600">Apple inc.</p>
          <h5 className="font-semibold my-2 md:text-xl text-lg">
            {name?.length > 40 ? name?.slice(0, 40) + "..." : name}
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
              <h5 className="font-semibold">1049$</h5>
              <del className="text-red-600 text-xs -mt-2 ml-1">1099</del>
            </div>

            <p className="text-green-600 font-medium">35 Sold</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
