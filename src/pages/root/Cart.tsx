import AddToCart from "@/components/Layout/AddToCart";
import Container from "@/components/Layout/Container";
import useCart from "@/hooks/product/useCart";
import useUserProfile from "@/hooks/useUserProfile";
import { currencyFormat } from "@/utils/CurrencyFormat";
import { CartItem, Product } from "@/utils/types";
import { Helmet } from "react-helmet";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { data: user } = useUserProfile();
  const cartItems: CartItem[] = user?.cart;
  const subTotal = cartItems?.reduce((total, cartItem) => {
    const { product, unit } = cartItem;
    return total + product.originalPrice * unit;
  }, 0);
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <Container>
        <div className="my-12 flex lg:flex-row flex-col gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">
                Your Cart <span>({cartItems?.length}) items</span>
              </p>
              <button className="text-sm text-blue-600 hover:underline cursor-pointer">
                Clear Cart
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
            <div className="flex flex-col gap-6 w-full">
              {cartItems?.map((item) => {
                const product: Product = item?.product;

                return <CartProduct cartItems={cartItems} product={product} />;
              })}
            </div>
          </div>

          <div className="lg:w-[350px] lg:h-[250px] w-full bg-white shadow rounded-md p-4">
            <div>
              <p className="text-lg text-gray-800 font-semibold">Your Order</p>

              <div className=" flex items-center justify-between text-lg font-semibold my-6">
                <span>SUBTOTAL</span>
                <span>{currencyFormat(subTotal)}</span>
              </div>

              <button className="bg-blue-400 hover:bg-blue-600 transition duration-300 w-full h-10 rounded-full text-[13px] font-medium text-white">
                CHECK OUT
              </button>
            </div>
            <div className="w-full lg:hidden  block my-10">
              <button className="h-11 bg-gray-200 rounded-full px-12 hover:bg-black w-full hover:text-white duration-300 transition text-sm font-medium mx-auto">
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:block  hidden">
          <div className="items-center justify-center flex">
            <button className="h-11 bg-gray-200 rounded-full px-12 hover:bg-black hover:text-white duration-300 transition text-sm font-medium mx-auto">
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;

function CartProduct({ product }: { product: Product; cartItems: CartItem[] }) {
  const { count, handleDecrement, handleIncrement, incrementDecrementCart } =
    useCart({ product });

  const onIncrement = async () => {
    handleIncrement();
    const updatedCount = count + 1;
    await incrementDecrementCart(product._id, updatedCount);
  };

  const onDecrement = async () => {
    handleDecrement();
    const updatedCount = count - 1;
    await incrementDecrementCart(product._id, updatedCount);
  };

  const price = product.originalPrice * count;
  return (
    <div className="flex items-center sm:flex-row flex-col sm:gap-0 gap-6 justify-between border border-gray-300 rounded-md p-4">
      <div className="w-full sm:w-auto">
        <div className="w-[100px] h-[100px]">
          <img
            src={product?.images[0]?.url}
            alt="product-image"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-2">
          <p>
            {product?.name?.length > 50
              ? product?.name.substring(0, 50) + "..."
              : product?.name}
          </p>
          <p className=" font-semibold">{currencyFormat(price as number)}</p>
        </div>
      </div>
      <div className="md:block gap-6 flex items-center justify-between sm:w-auto w-full">
        <div>
          <AddToCart
            count={count}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
            product={product}
          />
        </div>
        <div className="md:hidden flex text-red-500 cursor-pointer">
          <MdDelete size={20} />
        </div>
      </div>

      <div className="md:flex hidden text-red-500 cursor-pointer">
        <MdDelete size={20} />
      </div>
    </div>
  );
}
