import {
  AiOutlineFolderAdd,
  AiOutlineGift,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";

const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/vendor",
    icon: RxDashboard,
  },
  {
    id: 2,
    name: "All orders",
    path: "/vendor/orders",
    icon: FiShoppingBag,
  },
  {
    id: 3,
    name: "All Products",
    path: "/vendor/products",
    icon: FiPackage,
  },
  {
    id: 4,
    name: "Create Product",
    path: "/vendor/create-product",
    icon: AiOutlineFolderAdd,
  },
  {
    id: 5,
    name: "All Events",
    path: "/vendor/events",
    icon: MdOutlineLocalOffer,
  },
  {
    id: 6,
    name: "Create Event",
    path: "/vendor/create-event",
    icon: VscNewFile,
  },
  {
    id: 7,
    name: "Withdraw Money",
    path: "/vendor/withdraw-money",
    icon: CiMoneyBill,
  },
  {
    id: 8,
    name: "Shop Inbox",
    path: "/vendor/messages",
    icon: BiMessageSquareDetail,
  },
  {
    id: 9,
    name: "Discount Codes",
    path: "/vendor/coupons",
    icon: AiOutlineGift,
  },

  {
    id: 10,
    name: "Refunds",
    path: "/vendor/refunds",
    icon: HiOutlineReceiptRefund,
  },
  {
    id: 11,
    name: "Settings",
    path: "/vendor/settings",
    icon: CiSettings,
  },
];

const VendorSidebar = () => {
  const { pathname } = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosPrivate.post("/auth/logout");
      dispatch(logOut());
      navigate("/");
      toast.success("Logged out successfully done.");
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    }
  };

  return (
    <div className="w-full h-full overscroll-y-auto scrollbar z-10 p-4">
      {sidebarLinks.map((link) => {
        return (
          <Link
            key={link.id}
            to={link.path}
            className={`flex items-center gap-2 mb-2 w-full md:hover:bg-gray-200 rounded h-12 ${
              pathname === link.path ? "text-red-500" : "text-gray-700"
            }`}
          >
            <link.icon size={30} />
            <h5 className="md:block hidden text-lg">{link.name}</h5>
          </Link>
        );
      })}

      <div className="w-full h-[1px] bg-gray-200 mt-4" />
      <div
        onClick={handleLogout}
        className="flex items-center gap-2 md:border border-gray-300 rounded-md mt-4 h-10 justify-center cursor-pointer"
      >
        <AiOutlineLogout className="md:text-xl text-3xl" />
        <span className="md:block hidden">Log out</span>
      </div>
    </div>
  );
};

export default VendorSidebar;
