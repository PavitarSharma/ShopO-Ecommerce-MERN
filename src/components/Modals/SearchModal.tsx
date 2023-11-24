import useSearchModal from "@/hooks/useSearchModal";
import Modals from "./Modal";
import { Input } from "../ui/input";
import { GoSearch } from "react-icons/go";

const SearchModal = () => {
  const searchModal = useSearchModal();

  const bodyContent = (
    <>
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        <div className="">
          <h4 className="text-center text-2xl font-medium tracking-wide">
            Search In Store
          </h4>
          <p className="text-sm text-gray-700 mt-1">
            Advanced search will help you quickly find a product
          </p>
        </div>

        <div className="relative w-full">
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search your favorite product..."
            className="w-full my-6 border-t-0 border-l-0 border-r-0 border-b-gray-400 rounded-none focus:ring-blue-200 focus:border-b-blue-400 text-lg text-gray-900 placeholder:text-base placeholder:text-gray-500"
          />
          <GoSearch
            size={20}
            className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
  return (
    <Modals
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      body={bodyContent}
      size="64rem"
    />
  );
};

export default SearchModal;
