import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useVendorProfile from "@/hooks/vendor/useVendorProfile";
import { BACKEND_URL } from "@/http";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/slices/authSlice";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface ShopInfoProp {
  onClose: () => void;
}

const ShopInfo = ({ onClose }: ShopInfoProp) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { data: vendor } = useVendorProfile();

  const handleLogout = async () => {
    try {
      await axiosPrivate.post("/auth/logout");
      dispatch(logOut());
      navigate("/");
      toast.success("Logged out successfully done.");
      onClose();
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
    <div className="w-full h-full relative">
      <button onClick={onClose} className="absolute right-0 lg:hidden block">
        <IoMdClose size={24} />
      </button>
      <div className="flex items-center justify-center">
        <div className="w-[150px] h-[150px] border border-gray-400 rounded-full">
          <img
            src={`${BACKEND_URL}/${vendor?.coverImage}`}
            alt={vendor?.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <h3 className="text-center font-semibold mt-2 text-xl">{vendor?.name}</h3>
      <p className="text-sm mt-2 flex text-[#000000a6]">
        {vendor?.description && vendor?.description?.length > 100
          ? vendor?.description?.substring(0, 180) + "..."
          : vendor?.description}
      </p>

      <div className="my-4 mt-6 flex flex-col gap-4">
        <div>
          <p className="font-semibold">Address</p>
          <p className="text-gray-700">{vendor?.address}</p>
        </div>

        <div>
          <p className="font-semibold">Phone Number</p>
          <p className="text-gray-700">{vendor?.phone}</p>
        </div>

        <div>
          <p className="font-semibold">Total Products</p>
          <p className="text-gray-700">{vendor?.products?.length}</p>
        </div>

        <div>
          <p className="font-semibold">Shop Ratings</p>
          {/* <Rating
            name="half-rating-read"
            defaultValue={vendor?.rating}
            precision={0.5}
            readOnly
          /> */}
        </div>

        <div>
          <p className="font-semibold">Joined On</p>
          <p className="text-gray-700">
            {moment(vendor?.createdAt).format("DD MMM, YYYY")}
          </p>
        </div>
      </div>

      {vendor?.ownerName && (
        <div className="flex flex-col gap-2 mt-6">
          <Button
            onClick={() => {
              navigate("/vendor/edit");
              onClose();
            }}
          >
            Edit Shop
          </Button>
          <Button onClick={handleLogout}>
            <AiOutlineLogout />
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
