import { useCallback, useState } from "react";
import { MdClose } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Cart = ({ onClose }: { onClose: () => void }) => {
  const [count, setCount] = useState(1);

  const handleIncrement = useCallback(() => {
    setCount((prevCount) => (prevCount === 10 ? prevCount : prevCount + 1));
  }, []);

  const handleDecrement = useCallback(() => {
    setCount((prevCount) => (prevCount === 1 ? prevCount : prevCount - 1));
  }, []);

  const product = {
    id: 2,
    category: "Mobile and Tablets",
    name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
    ],
    shop: {
      name: "Amazon Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    discount_price: 1099,
    rating: 5,
    total_sell: 80,
    stock: 10,

    // category: "Mobile & Tablets",
  };

  return (
    <div className="fixed z-[1000] w-full inset-0 bg-black/40 h-full">
      <div className="fixed text-black top-0 right-0  h-screen sm:w-[550px] w-[380px] bg-white flex flex-col justify-between shadow-md  rounded-l-xl overflow-y-hidden">
        <button onClick={onClose} className="absolute right-4 top-4">
          <MdClose size={24} />
        </button>

        {product ? (
          <div className="flex justify-between flex-col">
            <div className="mt-12 h-[750px]  scrollbar overflow-y-auto p-4 sm:px-12">
              <h2 className="text-2xl font-semibold">Shopping Cart</h2>

              <div className="mt-6 w-full flex flex-col gap-4">
                <div className="flex sm:flex-row flex-col  rounded-md shadow-md sm:h-[200px] h-auto gap-4 drop-shadow-md bg-white border border-gray-200 p-4 last:mb-0 sm:last:mb-10 mb-10">
                  <div className="sm:w-1/2 w-full h-32 sm:h-full bg-blue-50">
                    <img
                      src={product.image_Url[0].url}
                      alt="product"
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <p className="sm:text-lg text-sm text-gray-700">
                        {product.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:mt-0 mt-4">
                      <p>
                        <span className="text-sm">$</span>
                        <span className="text-lg font-semibold">175.00</span>
                      </p>

                      <div className="flex items-center gap-4">
                        <button onClick={handleDecrement}>
                          <AiOutlineMinus />
                        </button>
                        <div>{count}</div>
                        <button onClick={handleIncrement}>
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-blue-50 z-10 sm:h-[20%] h-[100px] sm:static absolute bottom-0 left-0 right-0 mt-10 p-4 sm:px-12 flex items-center justify-center gap-4">
              <button className="bg-gray-200 hover:bg-gray-600 hover:text-white transition duration-300 w-full h-10 rounded-full text-[13px] font-medium">
                VIEW MT CART(1)
              </button>
              <button className="bg-blue-400 hover:bg-blue-600 transition duration-300 w-full h-10 rounded-full text-[13px] font-medium text-white">
                CHECK OUT
              </button>
            </div>
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
    </div>
  );
};

export default Cart;
