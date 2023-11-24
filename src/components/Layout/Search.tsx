import { ChangeEvent } from "react";
import { MdSearch } from "react-icons/md";

interface SearchProp {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Search = ({ value, onChange }: SearchProp) => {
  return (
    <div className="relative w-full border h-10 border-gray-300 rounded-md">
      <MdSearch
        size={24}
        className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600"
      />
      <input
        id="search"
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="Search your products..."
        className="w-full h-full ml-9 border-0 outline-none text-gray-900 text-sm bg-transparent placeholder:text-gray-500 placeholder:text-sm"
      />
    </div>
  );
};

export default Search;
