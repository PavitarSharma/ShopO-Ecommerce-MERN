import { MdClose } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import useUserProfile from "@/hooks/useUserProfile";
import ProductListView from "@/components/Layout/Product/ProductListView";
import { Product } from "@/utils/types";
import { Button } from "@/components/ui/button";
import useWishlist from "@/hooks/product/useWishlist";

const Wishlist = ({ onClose }: { onClose: () => void }) => {
  const { data: user, isLoading } = useUserProfile();
  const { isLoading: wishlistLoading, clearWishlist, addWishListToCart } = useWishlist()

  const wishlists = user?.wishlists;

  const handleWishListToCart = async () => {
    await addWishListToCart(wishlists)

  };

  const handleClearWishlist = async () => {
    await clearWishlist(wishlists)
  };

  return (
    <div className="fixed z-[1000] w-full inset-0 bg-black/40 h-full">
      <div className="fixed text-black top-0 z-50 right-0 h-screen sm:w-[500px] w-[380px] bg-white flex flex-col justify-between shadow-md p-4 rounded-l-xl">
        <button onClick={onClose} className="absolute right-4 top-4">
          <MdClose size={24} />
        </button>

        {wishlists?.length > 0 && (
          <div className={`w-full  flex justify-between items-center mt-12`}>
            <Button
              disabled={wishlistLoading}
              onClick={handleWishListToCart}
              className={`${
                wishlistLoading &&
                "bg-gray-300 text-gray-500 hover:bg-0 cursor-not-allowed"
              }`}
            >
              ADD FULL WISHLIST TO CART
            </Button>
            <p
              onClick={handleClearWishlist}
              className="text-center cursor-pointer text-blue-600 font-medium text-sm hover:underline"
            >
              Clear Wishlist
            </p>
          </div>
        )}

        {isLoading ? (
          <p>Loading...</p>
        ) : wishlists && wishlists.length > 0 ? (
          <div className="flex justify-between flex-col ">
            <div className="flex h-screen flex-col gap-6 mt-12 overflow-y-auto scrollbar pr-2">
              {wishlists?.map((product: Product) => (
                <>
                  <ProductListView key={product._id} product={product} isCart />
                </>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 mt-32">
            <div className="md:text-[150px] text-8xl text-gray-300">
              <AiOutlineHeart />
            </div>

            <div className="text-center">
              <p className="text-xl font-bold text-black/80">
                Your wishlist is empty
              </p>
              <p className="text-xs w-[80%] mx-auto text-gray-500 font-medium mt-1">
                Add items to your wishlist now so you don&#39;t forget to add to
                cart later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
