import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useToggle from "@/hooks/useToggle";
import { Helmet } from "react-helmet";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosPublic } from "@/http";
import { useState } from "react";
import { AxiosError } from "axios";
import { handleApiError } from "@/utils/handleApiError";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const passwordToggle = useToggle(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setIsLoading(true);
    try {
      await axiosPublic.post("/auth/sign-up", values);
      toast.success("Sign up successfully");
      navigate("/auth/login");
      reset();
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
        <title>Sign Up</title>
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
                Registration to Our Store
              </h3>
              <p className="text-sm text-gray-600">
                Register to our store an start shopping your products
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 space-y-4 w-full"
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium mb-[1px]">
                  Your name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: true })}
                  className={`bg-gray-50 border ${
                    errors?.name?.type
                      ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-[1px]">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email here"
                  {...register("email", { required: true })}
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
                    placeholder="********"
                    {...register("password", { required: true })}
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

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  isLoading
                    ? "bg-gray-300 text-black hover:bg-0 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 text-white"
                } focus:outline-none font-medium mt-4`}
              >
                Create Account
              </Button>

              <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                Already have an account?
                <Link
                  to="/auth/login"
                  className="text-blue-700 text-center hover:underline dark:text-blue-500 ml-1"
                >
                  Login here
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

export default SignUp;
