import { MdClose } from "react-icons/md";
import NavLinks from "./NavLinks";

const Menu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed z-[1000] w-full inset-0 bg-black/40 h-full md:hidden block">
      <div className="fixed text-black top-0 z-50 left-0 h-screen w-[350px] bg-white flex flex-col justify-between shadow-md p-4 rounded-r-xl">
        <button onClick={onClose} className="absolute right-4 top-4">
          <MdClose size={24} />
        </button>

        <div className="flex flex-col items-center justify-center gap-4 mt-32">
          <div className="flex flex-col gap-4">
            <NavLinks isMobile onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
