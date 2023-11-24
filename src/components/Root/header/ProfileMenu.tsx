import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SelectAuthState, logOut } from "@/redux/slices/authSlice";
import { SelectUserState } from "@/redux/slices/userSlice";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

interface ProfileMenuProp {
  onClose: () => void;
}

const ProfileMenu = ({ onClose }: ProfileMenuProp) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { isAuth } = useAppSelector(SelectAuthState);
  const { user } = useAppSelector(SelectUserState);

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
    <>
      {isAuth ? (
        <div className="w-full pb-2">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full">
              <img
                src={
                  user && user?.avatar
                    ? `${user?.avatar}`
                    : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
                }
                alt="profile"
                className="w-full h-full object-cover rounded-full cursor-pointer"
              />
            </div>

            <span className="text-lg font-semibold">{user?.name}</span>
          </div>

          <p className="text-sm my-2 tracking-wider break-words  font-medium text-gray-700">
            {user?.email}
          </p>

          <div className="hover:bg-gray-100 w-full text-lg py-1  cursor-pointer rounded">
            <Link to="/profile" onClick={() => onClose()}>
              Profile
            </Link>
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          <button
            onClick={handleLogout}
            className="border w-full flex items-center justify-center gap-1 h-10 mt-4 cursor-pointer hover:bg-gray-200"
          >
            <AiOutlineLogout /> Log out
          </button>
        </div>
      ) : (
        <div className="w-full py-2 flex flex-col gap-4">
          <Button
            onClick={() => {
              navigate("/auth/login");
              onClose();
            }}
            className="bg-blue-700 hover:bg-blue-700"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/auth/sign-up");
              onClose();
            }}
            className="bg-black"
          >
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
