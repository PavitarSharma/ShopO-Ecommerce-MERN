import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useToggle from "@/hooks/useToggle";
import { Helmet } from "react-helmet";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosPublic } from "@/http";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { handleApiError } from "@/utils/handleApiError";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SelectAuthState, setCredentials } from "@/redux/slices/authSlice";
import { delay } from "@/utils/delay";
// import { AiFillGithub } from "react-icons/ai";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector(SelectAuthState);
  const passwordToggle = useToggle(false);
  const [loginState, setLoginState] = useState("Customer");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (isAuth) {
      if (user) {
        if (user?.role === "Customer") {
          navigate("/");
        } else if (user?.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/vendor");
        }
      }
    }
  }, [isAuth, user, navigate]);

  const toggleLoginState = useCallback(
    (name: string) => setLoginState(name),
    []
  );

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setIsLoading(true);
    const responseBody = {
      email: values.email,
      password: values.password,
      userType: loginState,
    };
    try {
      const { data } = await axiosPublic.post("/auth/login", responseBody);

      dispatch(setCredentials(data));
      toast.success(`${loginState} logged in successfully.`);
      await delay();
      if (data?.user?.role === "Customer") {
        navigate("/");
      } else if (data?.user?.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/vendor");
      }
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-row max-w-6xl  w-full border h-[600px] mx-auto rounded-md shadow bg-white">
          <div className="w-full h-full md:block hidden">
            <img
              src="/images/login.png"
              alt="login"
              className="w-full h-full object-cover rounded-l-md"
            />
          </div>

          <div className="w-full flex items-center flex-col justify-center h-full md:px-10 sm:px-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold tracking-wider">
                Sign In to Our Store
              </h3>
              <p className="text-sm text-gray-600">
                Login to our store an start shopping your products
              </p>
            </div>

            <div className="w-full flex items-center justify-center gap-4">
              {["Admin", "Customer", "Vendor"].map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  onClick={() => toggleLoginState(value)}
                  className={`${
                    loginState === value ? "bg-gray-200" : ""
                  } hover:bg-0`}
                >
                  {value}
                </Button>
              ))}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 mt-4 space-y-4 w-full"
            >
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-[1px]">
                  Email
                </label>
                <Input
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email here"
                  className={`bg-gray-50 border ${
                    errors?.email?.type
                      ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium mb-[1px]"
                >
                  Password
                </label>
                <div className="w-full relative">
                  <Input
                    type={passwordToggle.open ? "text" : "password"}
                    id="password"
                    defaultValue="test@1234"
                    {...register("password", { required: true })}
                    placeholder="********"
                    className={`bg-gray-50 border ${
                      errors?.password?.type
                        ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    }   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
                  />
                  <div
                    onClick={passwordToggle.onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  ounded-full"
                  >
                    {passwordToggle.open ? (
                      <MdOutlineRemoveRedEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  isLoading
                    ? "bg-gray-300 text-black hover:bg-0 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 text-white"
                } focus:outline-none font-medium mt-4`}
              >
                Sign In
              </Button>

              <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <Link
                  to="/auth/sign-up"
                  className="text-blue-700 text-center hover:underline dark:text-blue-500"
                >
                  Create account
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full h-[1px] bg-gray-300 rounded" />
                <span>or</span>
                <div className="w-full h-[1px] bg-gray-300 rounded" />
              </div>

              <div>
                <Button
                  variant={"outline"}
                  type="button"
                  className=" flex items-center w-full gap-2"
                >
                  <FcGoogle size={20} />
                  <span>Continue with Google</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
