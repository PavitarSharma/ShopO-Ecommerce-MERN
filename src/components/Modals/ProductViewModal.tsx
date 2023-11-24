import useProductViewModal from "@/hooks/useProductViewModal";
import { useCallback, useState } from "react";

import { BiMessageRounded } from "react-icons/bi";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { Button } from "../ui/button";
import Modals from "./Modal";

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

const ProductViewModal = () => {
  const productViewModal = useProductViewModal();
  const [selectImage, setSelectImage] = useState(0);
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const onToggleSelectImage = useCallback((index: number) => {
    setSelectImage(index);
  }, []);

  const toggleIsFavorite = useCallback(() => {
    setIsFavorite((prevState) => !prevState);
  }, []);

  const handleIncrement = useCallback(() => {
    if (product?.stock !== 0) {
      setCount((prevCount) =>
        prevCount === product.stock ? prevCount : prevCount + 1
      );
    }
  }, []);

  const handleDecrement = useCallback(() => {
    setCount((prevCount) => (prevCount === 1 ? prevCount : prevCount - 1));
  }, []);

  //   const onToggle = useCallback(() => {
  //     productViewModal.onOpen();
  //   }, [productViewModal]);

  const bodyContent = (
    <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center gap-6">
      {/* Left */}

      <div className="flex flex-col gap-4  w-full">
        <div className="flex items-center sm:gap-8 sm:flex-row flex-col-reverse">
          <div className="flex sm:flex-col flex-row items-center gap-4">
            {product.image_Url.map((_data, index) => (
              <div
                key={index}
                onClick={() => onToggleSelectImage(index)}
                className={`w-20 h-20 cursor-pointer rounded-md ${
                  selectImage === index
                    ? "border-2 border-blue-600"
                    : "border border-gray-500"
                }`}
              >
                <img
                  src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
                  alt="product Image"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
          <div className="bg-gray-100 w-[400px] h-[400px] rounded-md border mb-4">
            <img
              src={product.image_Url[selectImage].url}
              alt="product Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex lg:flex-col flex-row justify-between sm:items-start items-center">
            <div className="flex items-center gap-2">
              <img
                src={product.shop.shop_avatar.url}
                alt="shop"
                className="w-12 h-12 rounded-full"
              />

              <div className="flex flex-col">
                <span className="text-blue-700 font-semibold">
                  {product.shop.name}
                </span>
                <span className="text-sm text-gray-700 font-medium">
                  ({product.shop.ratings}) Ratings
                </span>
              </div>
            </div>

            <div className="my-4">
              <Button onClick={() => {}} className="bg-black">
                <span className="mr-2"> Send Message</span>
                <BiMessageRounded size={20} />
              </Button>
            </div>
          </div>

          <p className="font-medium text-red-700">(80) Sold Out</p>
        </div>
      </div>

      {/* Right */}

      <div className="w-full">
        <h2 className="md:text-2xl text-xl font-bold">{product.name}</h2>

        <p className="my-2 text-sm font-[sans] tracking-wider font-medium text-gray-700">
          {product.description}
        </p>

        <div className="flex items-center">
          <AiFillStar size={20} color="#f6ba00" />
          <AiFillStar size={20} color="#f6ba00" />
          <AiFillStar size={20} color="#f6ba00" />
          <AiFillStar size={20} color="#f6ba00" />
          <AiOutlineStar size={20} color="#f6ba00" />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="text-lg">Price:</div>
          <div className="flex items-center justify-between">
            <div className="relative flex">
              <h5 className="font-semibold">$1049</h5>
              <del className="text-red-600 text-xs -mt-2 ml-1">$1099</del>
            </div>
          </div>
        </div>

        {product.stock !== 0 ? (
          <div className="flex items-center gap-8">
            <div className="w-[100px] my-4">
              <div className="flex items-center justify-center">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 cursor-pointer text-red-600 flex items-center justify-center"
                >
                  <AiOutlineMinus size={20} />
                </button>
                <span className="w-8 h-8 flex items-center justify-center">
                  {count}
                </span>
                {count === product?.stock ? (
                  <button className="w-8 h-8 text-gray-400 cursor-pointer flex items-center justify-center">
                    <GrFormClose size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 cursor-pointer text-blue-600 flex items-center justify-center"
                  >
                    <AiOutlinePlus size={20} />
                  </button>
                )}
              </div>

              <div className={`w-full h-[2px] bg-gray-400 relative rounded`}>
                <div
                  style={{
                    width: `${(count / product?.stock) * 100}%`,
                  }}
                  className={`${
                    count === 1
                      ? "bg-green-600"
                      : count === product?.stock - 1
                      ? "bg-red-600"
                      : "bg-blue-700"
                  }   my-auto h-[3px] rounded`}
                ></div>
              </div>
            </div>

            <div>
              <Button className="bg-black" onClick={() => {}}>
                <span className="mr-2">Add to Cart</span>
                <AiOutlineShoppingCart size={20} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-red-600 w-[100px] h-10 flex items-center justify-center rounded-md text-white mt-2">Stock Out</div>
        )}
        <div className=" flex items-center gap-1 my-4">
          <button onClick={toggleIsFavorite}>
            {isFavorite ? (
              <AiFillHeart color="red" size={24} title="Favorite" />
            ) : (
              <AiOutlineHeart color="#333" size={24} title="Favorite" />
            )}
          </button>

          <span className="text-sm text-blue-700">Add to wishlist</span>
        </div>
      </div>
    </div>
  );
  return (
    <Modals
      isOpen={productViewModal.isOpen}
      onClose={productViewModal.onClose}
      body={bodyContent}
    />
  );
};

export default ProductViewModal;
