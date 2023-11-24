import Editor from "@/components/Layout/Editor";
import { Button } from "@/components/ui/button";
import useCategories from "@/hooks/useCategories";
import { Category } from "@/utils/types";
import { useCallback, useMemo, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";

interface IOption {
  value: string;
  label: string;
}

interface IFormInput {
  name: string;
  description: string;
  category: IOption;
  tags?: string;
  originalPrice?: string;
  discountPrice: string;
  stock: string;
}
const CreateProduct = () => {
  const { data: categorires } = useCategories();
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const options: IOption[] = useMemo(() => {
    return (
      (categorires &&
        categorires?.map((item: Category) => ({
          value: item?.name,
          label: item?.name,
        }))) ||
      []
    );
  }, [categorires]);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _fileRejections: FileRejection[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _event: DropEvent
    ) => {
      // Do something with the acceptedFiles
      setImages((prevImage) => [...prevImage, ...acceptedFiles]);
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
    } = data;

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("category", category.label);
    formdata.append("originalPrice", String(originalPrice));
    formdata.append("discountPrice", String(discountPrice));
    formdata.append("stock", stock);
    formdata.append("tags", String(tags));

    images.map((file) => {
      formdata.append("images", file);
    });
  };

  return (
    <>
      <Helmet>
        <title> Create Product</title>
      </Helmet>
      <div className="bg-white shadow max-w-3xl w-full mx-auto mt-12 py-6 px-6">
        <h1 className="text-center font-semibold  text-2xl">Create Product</h1>
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">
              Name <span className="text-red-600">{"*"}</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Please enter the product name",
              })}
              className="w-full border border-gray-300 rounded py-2 px-4  focus:outline-blue-600"
              placeholder="Enter your product name"
            />

            <span className="text-red-600 text-sm ml-2 mt-[1px]">
              {errors?.name?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description">
              Description <span className="text-red-600">{"*"}</span>
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Please enter the product description!" }}
              render={({ field }) => (
                <Editor value={field.value} onChange={field.onChange} />
              )}
            />

            <span className="text-red-600 text-sm ml-2 mt-[1px]">
              {errors?.description?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category">
              Category <span className="text-red-600">{"*"}</span>
            </label>

            <Controller
              name="category"
              control={control}
              rules={{ required: "Please select the product category!" }}
              render={({ field }) => {
                return (
                  <Select
                    placeholder="Select product category"
                    {...field}
                    options={options}
                  />
                );
              }}
            />
            <span className="text-red-600 text-sm ml-2 mt-[1px]">
              {errors?.category?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              {...register("tags")}
              className="w-full border border-gray-300 rounded py-2 px-4  focus:outline-blue-600"
              placeholder="Enter your product name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="originalPrice">Original Price</label>
            <input
              type="text"
              {...register("originalPrice")}
              className="w-full border border-gray-300 rounded py-2 px-4  focus:outline-blue-600"
              placeholder="Enter your product price"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">
              Price(With Discount) <span className="text-red-600">{"*"}</span>
            </label>
            <input
              type="text"
              {...register("discountPrice", {
                required: "Please enter the product price with discount!",
              })}
              className="w-full border border-gray-300 rounded py-2 px-4  focus:outline-blue-600"
              placeholder="Enter your product with discount"
            />

            <span className="text-red-600 text-sm ml-2 mt-[1px]">
              {errors?.discountPrice?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">
              Product Stock <span className="text-red-600">{"*"}</span>
            </label>
            <input
              type="text"
              {...register("stock", {
                required: "Please enter the product stock!",
              })}
              className="w-full border border-gray-300 rounded py-2 px-4  focus:outline-blue-600"
              placeholder="Enter your product stock"
            />

            <span className="text-red-600 text-sm ml-2 mt-[1px]">
              {errors?.stock?.message}
            </span>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-center w-full">
              <label
                {...getRootProps()}
                htmlFor="image"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex flex-col items-center justify-center w-full h-64 border border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, JPEG
                  </p>
                </div>
                <input
                  multiple
                  name="image"
                  {...getInputProps()}
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {images.length > 0 &&
                images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="product-image"
                    className="w-[100px] h-[100px] rounded-md shadow border"
                  />
                ))}
            </div>
          </div>
          <Button type="submit" className="bg-black">
            Create Product
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
