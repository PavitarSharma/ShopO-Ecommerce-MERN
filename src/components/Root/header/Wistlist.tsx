import { MdClose } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed z-[1000] w-full inset-0 bg-black/40 h-full">
      <div className="fixed text-black top-0 z-50 right-0 h-screen sm:w-[500px] w-[380px] bg-white flex flex-col justify-between shadow-md p-4 rounded-l-xl">
        <button onClick={onClose} className="absolute right-4 top-4">
          <MdClose size={24} />
        </button>

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
      </div>
    </div>
  );
};

export default Wishlist;
