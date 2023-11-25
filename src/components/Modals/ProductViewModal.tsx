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
import { currencyFormat } from "@/utils/CurrencyFormat";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SelectProductState, resetProduct } from "@/redux/slices/productSlice";

const ProductViewModal = () => {
  const productViewModal = useProductViewModal();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector(SelectProductState);
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
        prevCount === product?.stock ? prevCount : prevCount + 1
      );
    }
  }, [product?.stock]);

  const handleDecrement = useCallback(() => {
    setCount((prevCount) => (prevCount === 1 ? prevCount : prevCount - 1));
  }, []);

  const handleClose = useCallback(() => {
    dispatch(resetProduct());
    productViewModal.onClose();
  }, [dispatch, productViewModal]);

  //   const onToggle = useCallback(() => {
  //     productViewModal.onOpen();
  //   }, [productViewModal]);

  const bodyContent = (
    <>
      {product ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center gap-6">
          {/* Left */}

          <div className="flex flex-col gap-4  w-full">
            <div className="flex items-center sm:gap-8 sm:flex-row flex-col-reverse">
              <div className="flex sm:flex-col flex-row items-center gap-4">
                {product?.images?.map((image, index) => (
                  <div
                    key={image?.id}
                    onClick={() => onToggleSelectImage(index)}
                    className={`w-20 p-2 h-20 cursor-pointer rounded-md ${
                      selectImage === index
                        ? "border-2 border-blue-600"
                        : "border border-gray-500"
                    }`}
                  >
                    <img
                      src={image?.url}
                      alt="product Image"
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="bg-gray-100 w-[400px] h-[400px] rounded-md border mb-4 p-2">
                <img
                  src={product?.images[selectImage]?.url}
                  alt="product Image"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div>
              <div className="flex lg:flex-col flex-row justify-between sm:items-start items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={product?.shop.coverImage}
                    alt="shop"
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex flex-col">
                    <span className="text-blue-700 font-semibold">
                      {product?.shop.name}
                    </span>
                    <span className="text-sm text-gray-700 font-medium">
                      ({product?.shop.rating}) Ratings
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

              <p className="font-medium text-red-700">({product?.sold_out}) Sold Out</p>
            </div>
          </div>

          {/* Right */}

          <div className="w-full">
            <h2 className="md:text-2xl text-xl font-bold">{product?.name}</h2>

            {product?.description && (
              <p
                dangerouslySetInnerHTML={{ __html: product?.description }}
                className="my-2 text-sm font-[sans] tracking-wider font-medium text-gray-700"
              />
            )}

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
                  <h5 className="font-semibold">
                    {currencyFormat(product?.originalPrice as number)}
                  </h5>
                  <del className="text-red-600 text-xs -mt-2 ml-1">
                    {currencyFormat(product?.discountPrice as number)}
                  </del>
                </div>
              </div>
            </div>

            {product?.stock !== 0 ? (
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

                <div>
                  <Button className="bg-black" onClick={() => {}}>
                    <span className="mr-2">Add to Cart</span>
                    <AiOutlineShoppingCart size={20} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-red-600 w-[100px] h-10 flex items-center justify-center rounded-md text-white mt-2">
                Stock Out
              </div>
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
      ) : (
        <div className="flex items-center justify-center h-20 text-xl">
          <p>No Product Found</p>
        </div>
      )}
    </>
  );
  return (
    <Modals
      isOpen={productViewModal.isOpen}
      onClose={handleClose}
      body={bodyContent}
    />
  );
};

export default ProductViewModal;
