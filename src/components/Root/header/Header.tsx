import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiMenu3Line } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import Tooltip from "@/components/Layout/Tooltip";
import useToggle from "@/hooks/useToggle";
import Wishlist from "./Wistlist";
import Cart from "./Cart";
import Menu from "./Menu";
import useSearchModal from "@/hooks/useSearchModal";
import SearchModal from "@/components/Modals/SearchModal";
import ProfileMenu from "./ProfileMenu";
import { useAppSelector } from "@/redux/hooks";
import { SelectUserState } from "@/redux/slices/userSlice";

const Header = () => {
  const wishListToggle = useToggle(false);
  const cartToggle = useToggle(false);
  const menuToggle = useToggle(false);
  const profileToggle = useToggle(false);
  const searchModal = useSearchModal();
  const { user } = useAppSelector(SelectUserState);

  return (
    <>
      <div className="h-20 border-b border-b-gray-300 sticky top-0 left-0 right-0 flex items-center z-50 bg-white">
        <div className="max-w-[91%] w-full mx-auto flex items-center justify-between">
          <Logo />

          <div className="md:flex items-center hidden">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4 relative">
            <Tooltip
              iconSize={24}
              text="Search in store"
              icon={GoSearch}
              isIcon={true}
              onClick={searchModal.onOpen}
            />
            <div className="relative flex items-center">
              <div className="absolute -top-3 -right-2 bg-black text-white flex items-center justify-center rounded-full w-[18px] h-[18px] text-[9px]">
                0
              </div>
              <Tooltip
                onClick={wishListToggle.onToggle}
                text="Wishlist"
                icon={FaRegHeart}
                isIcon={true}
              />
            </div>
            <div className="relative flex items-center">
              <div className="absolute -top-[6px] -right-[10px] bg-black text-white flex items-center justify-center rounded-full w-[18px] h-[18px] text-[9px]">
                0
              </div>
              <Tooltip
                iconSize={24}
                text="Shoping Cart"
                icon={HiOutlineShoppingBag}
                isIcon={true}
                onClick={cartToggle.onToggle}
              />
            </div>
            <div
              ref={profileToggle.toggleRef}
              onClick={profileToggle.onToggle}
              className="w-8 h-8 rounded-full cursor-pointer"
            >
              <img
                src={
                  user && user?.avatar
                    ? `${user?.avatar}`
                    : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
                }
                alt="profile"
                className="w-full h-full object-cover rounded-full cursor-pointer"
              />

              {profileToggle.open && (
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="absolute bg-white w-60 -left-[90px] top-10 h-auto shadow border z-10 rounded text-black p-2"
                >
                  <ProfileMenu onClose={profileToggle.onClose} />
                </div>
              )}
            </div>
            <button
              onClick={menuToggle.onToggle}
              className="md:hidden block ml-2"
            >
              <RiMenu3Line size={22} />
            </button>
          </div>
        </div>
      </div>

      {wishListToggle.open && <Wishlist onClose={wishListToggle.onClose} />}
      {cartToggle.open && <Cart onClose={cartToggle.onClose} />}
      {menuToggle.open && <Menu onClose={menuToggle.onClose} />}
      <SearchModal />
    </>
  );
};

export default Header;
