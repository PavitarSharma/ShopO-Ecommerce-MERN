import { Button } from "@/components/ui/button";
import useCart from "@/hooks/product/useCart";
import { currencyFormat } from "@/utils/CurrencyFormat";
import { Product } from "@/utils/types";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CartProductProp {
  product: Product | null;
}

const CartProduct = ({ product }: CartProductProp) => {
  const { handleDecrement, handleIncrement, count, addToCart } = useCart({
    product,
  });

  const productName = product?.name;

  const handelAddToCart = async () => {
    if (product) {
      await addToCart(product?._id, count);
    }
  };

  return (
    <div className="flex sm:flex-row flex-col  rounded-md shadow-md sm:h-[200px] h-auto gap-4 drop-shadow-md bg-white border border-gray-200 p-4 last:mb-0 sm:last:mb-10 mb-10">
      <div className="sm:w-1/2 w-full h-32 sm:h-full">
        <img
          src={product?.images[0]?.url}
          alt="product"
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col justify-between h-full">
        <div>
          <p className=" text-sm font-semibold text-gray-700">
            {productName && productName?.length > 50
              ? productName.substring(0, 80) + "..."
              : productName}
          </p>
        </div>

        <div className="flex items-center justify-between sm:mt-0 mt-4">
          <p>
            <span className="text-sm">$</span>
            <span className="text-lg font-semibold">
              {currencyFormat(product?.originalPrice as number)}
            </span>
          </p>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <button onClick={handleDecrement}>
                <AiOutlineMinus />
              </button>
              <div>{count}</div>
              <button onClick={handleIncrement}>
                <AiOutlinePlus />
              </button>
            </div>
            <Button onClick={handelAddToCart} size="sm">
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
