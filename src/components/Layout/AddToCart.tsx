import { Product } from "@/utils/types";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

interface AddToCartProp {
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
  product: Product | null;
}
const AddToCart = ({
  onDecrement,
  onIncrement,
  count,
  product,
}: AddToCartProp) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          onClick={onDecrement}
          className="w-8 h-8 cursor-pointer text-red-600 flex items-center justify-center"
        >
          <AiOutlineMinus size={20} />
        </button>
        <span className="w-8 h-8 flex items-center justify-center text-black">
          {count}
        </span>
        {count === product?.stock ? (
          <button className="w-8 h-8 text-gray-400 cursor-pointer flex items-center justify-center">
            <GrFormClose size={20} />
          </button>
        ) : (
          <button
            onClick={onIncrement}
            className="w-8 h-8 cursor-pointer text-blue-600 flex items-center justify-center"
          >
            <AiOutlinePlus size={20} />
          </button>
        )}
      </div>

      {product && product.stock !== undefined ? (
        <div className="w-full h-[2px] bg-gray-400 relative rounded">
          <div
            style={{
              width: `${(count / product.stock) * 100}%`,
            }}
            className={`${
              count === 1
                ? "bg-green-600"
                : count === product.stock - 1
                ? "bg-red-600"
                : "bg-blue-700"
            }   my-auto h-[3px] rounded`}
          ></div>
        </div>
      ) : null}
    </div>
  );
};

export default AddToCart;
