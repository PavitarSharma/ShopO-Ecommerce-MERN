import ProductCard from "@/components/Layout/ProductCard";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import Search from "@/components/Layout/Search";
import { MdGridView, MdList } from "react-icons/md";
import ProductListView from "@/components/Layout/Product/ProductListView";
import useVendorProfile from "@/hooks/vendor/useVendorProfile";
import { Product } from "@/utils/types";

const ShopProfile = ({ toggleShopInfo }: { toggleShopInfo: () => void }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const isOwner = true;
  const onToggleActive = useCallback((value: number) => setActive(value), []);

  return (
    <div>
      <div className="flex justify-between  md:items-center md:flex-row flex-col-reverse w-full">
        <div className="flex items-center sm:gap-6 gap-4">
          <button
            onClick={() => onToggleActive(1)}
            className={`${
              active === 1 && "text-red-600 font-semibold"
            } sm:text-lg text-[15px] font-medium`}
          >
            Shop Products
          </button>
          <button
            onClick={() => onToggleActive(2)}
            className={`${
              active === 2 && "text-red-600 font-semibold"
            }  sm:text-lg text-[15px] font-medium`}
          >
            Running Events
          </button>
          <button
            onClick={() => onToggleActive(3)}
            className={`${
              active === 3 && "text-red-600 font-semibold"
            } sm:text-lg text-[15px] font-medium`}
          >
            Shop Reviews
          </button>
        </div>

        {isOwner && (
          <div className="md:w-auto flex gap-4 items-center justify-between w-full md:mb-0 mb-6">
            <Button onClick={() => navigate("/vendor")}>Go To Dashboard</Button>
            <button onClick={toggleShopInfo} className="lg:hidden block">
              <AiOutlineMenu size={24} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        {active === 1 && <ShopProducts />}
        {active === 2 && <RunningEvents />}
        {active === 3 && <ShopReviews />}
      </div>
    </div>
  );
};

export default ShopProfile;

const ShopProducts = () => {
  const { data: vendor } = useVendorProfile();
  const [searchTerm, setSearchTerm] = useState("");
  const [productView, setProductView] = useState("Grid");

  const handleSerach = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleProductView = useCallback((view: string) => {
    setProductView(view);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Search value={searchTerm} onChange={handleSerach} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleProductView("List")}
            className={`${productView === "List" ? "text-blue-600" : ""}`}
          >
            <MdList size={28} />
          </button>
          <button
            onClick={() => toggleProductView("Grid")}
            className={`${productView === "Grid" ? "text-blue-600" : ""}`}
          >
            <MdGridView size={24} />
          </button>
        </div>
      </div>
      {productView === "Grid" && (
        <div className="grid xl:grid-cols-3 sm:grid-cols-2   grid-cols-1 gap-6 mt-6">
          {vendor?.products?.length > 0
            ? vendor?.products?.map((product: Product) => (
                <ProductCard key={product?._id} product={product} />
              ))
            : "No product"}
        </div>
      )}

      {productView === "List" && (
        <div className="my-6 flex flex-col gap-6">
          {vendor?.products?.length > 0
            ? vendor?.products?.map((product: Product) => (
                <ProductListView key={product?._id} product={product} />
              ))
            : "No product"}
        </div>
      )}
    </>
  );
};

const RunningEvents = () => {
  return <div>Running Events</div>;
};

const ShopReviews = () => {
  return <div>Shop Reviews</div>;
};
