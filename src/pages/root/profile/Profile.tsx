import Container from "@/components/Layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import { SelectUserState } from "@/redux/slices/userSlice";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

type Inputs = {
  email: string;
  name: string;
  phone: number;
};

const Profile = () => {
  const { user } = useAppSelector(SelectUserState);
  const [image, setImage] = useState<File | null>(null);
  const [upadteUserLoading, setUpadteUserLoading] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);
  };

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setUpadteUserLoading(true);
    try {
      console.log(values);
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    } finally {
      setUpadteUserLoading(false);
    }
  };

  // const handleUpdatePassword = async () => {
  //   setUpadteUserLoading(true);
  //   try {
  //     console.log("updated");
  //   } catch (error) {
  //     let message;

  //     if (error instanceof AxiosError) {
  //       message = handleApiError(error);
  //     } else {
  //       message = "An unexpected error occurred.";
  //     }

  //     toast.error(message);
  //   } finally {
  //     setUpadteUserLoading(false);
  //   }
  // };

  // const handleAddAddress = async () => {};

  return (
    <>
      <Helmet>
        <title>Customer Profile</title>
      </Helmet>

      <div className="mt-16 mb-12">
        <Container>
          <div className="max-w-4xl w-full">
            <div className="w-28 h-28 relative rounded-full">
              <img
                src={
                  user && user?.avatar
                    ? `${user?.avatar}`
                    : image
                    ? URL.createObjectURL(image)
                    : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
                }
                alt="profile"
                className="w-full h-full object-cover rounded-full cursor-pointer"
              />

              <label
                htmlFor="image"
                className="flex items-center justify-center rounded-full absolute right-1 top-20 cursor-pointer"
              >
                <FiEdit size={18} className="text-blue-700" />
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="my-6">
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium mb-[1px]"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    {...register("name")}
                    className={`bg-gray-50 border border-gray-400   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium mb-[1px]"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    {...register("email")}
                    placeholder="Enter your email here"
                    className={`bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium mb-[1px]"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="Enter your email here"
                    className={`bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
                  />
                </div>
              </div>

              <div className="w-[100px]">
                <Button
                  type="submit"
                  disabled={upadteUserLoading}
                  className={`w-full ${
                    upadteUserLoading
                      ? "bg-gray-300 text-black hover:bg-0 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 text-white"
                  } focus:outline-none font-medium mt-4`}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Profile;
