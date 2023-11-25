import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import Logo from "../Root/header/Logo";
import { Link } from "react-router-dom";
import useVendorProfile from "@/hooks/vendor/useVendorProfile";
import { BACKEND_URL } from "@/http";

const links = [
  {
    id: 1,
    icon: AiOutlineGift,
    path: "/vendor/coupons",
  },
  {
    id: 2,
    icon: MdOutlineLocalOffer,
    path: "/vendor/events",
  },
  {
    id: 3,
    icon: FiShoppingBag,
    path: "/vendor/products",
  },
  {
    id: 4,
    icon: FiPackage,
    path: "/vendor/orders",
  },
  {
    id: 5,
    icon: BiMessageSquareDetail,
    path: "/vendor/messages",
  },
];

const VendorHeader = () => {
  const { data: vendor } = useVendorProfile();

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-[500] left-0 shadow flex items-center justify-between px-4">
      <Logo path="/vendor" />

      <div className="flex items-center gap-6">
        <>
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className="cursor-pointer sm:block hidden"
            >
              <link.icon size={30} color="#333" />
            </Link>
          ))}

          <Link to={`/vendor/profile`}>
            <img
              src={
                vendor?.coverImage
                  ? `${BACKEND_URL}/${vendor?.coverImage}`
                  : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
              }
              alt="profile"
              className="h-[44px] w-[44px] rounded-full border cursor-pointer"
            />
          </Link>
        </>
      </div>
    </div>
  );
};

export default VendorHeader;
