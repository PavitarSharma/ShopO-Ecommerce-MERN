import { MdClose } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useUserProfile from "@/hooks/useUserProfile";
import { CartItem, Product } from "@/utils/types";
import CartProduct from "@/components/Layout/Product/CartProduct";
import { useNavigate } from "react-router-dom";

const Cart = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { data: user } = useUserProfile();
  const cart = user?.cart;

  return (
    <div className="fixed z-[1000] w-full inset-0 bg-black/40 h-full">
      <div className="fixed text-black top-0 right-0  h-screen sm:w-[550px] w-[380px] bg-white flex flex-col justify-between shadow-md  rounded-l-xl overflow-y-hidden">
        <button onClick={onClose} className="absolute right-4 top-4">
          <MdClose size={24} />
        </button>
        <div className="flex justify-between flex-col">
          <div className="mt-12 h-[750px]  scrollbar overflow-y-auto p-4 sm:px-12">
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>

            {cart && cart?.length > 0 ? (
              <div className="mt-6 w-full flex flex-col gap-4">
                {cart?.map((item: CartItem) => {
                  const product: Product = item.product;

                  return <CartProduct key={product?._id} product={product} />;
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 mt-32 p-4 px-12">
                <div className="md:text-[150px] text-8xl text-gray-300">
                  <HiOutlineShoppingBag />
                </div>

                <div className="text-center">
                  <p className="text-xl font-bold text-black/80">
                    Your cart is empty
                  </p>
                  <p className="text-xs w-[80%] mx-auto text-gray-500 font-medium mt-1">
                    You have not added any products yet.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full bg-blue-50 z-10 sm:h-[20%] h-[100px] sm:static absolute bottom-0 left-0 right-0 mt-10 p-4 sm:px-12 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                navigate("/cart");
                onClose();
              }}
              className="bg-gray-200 hover:bg-gray-600 hover:text-white transition duration-300 w-full h-10 rounded-full text-[13px] font-medium"
            >
              VIEW MT CART({cart?.length})
            </button>
            <button
              onClick={() => {
                navigate("/cart");
                onClose();
              }}
              className="bg-blue-400 hover:bg-blue-600 transition duration-300 w-full h-10 rounded-full text-[13px] font-medium text-white"
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
