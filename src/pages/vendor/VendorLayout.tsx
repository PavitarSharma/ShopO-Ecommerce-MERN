import VendorHeader from "@/components/Vendor/VendorHeader";
import VendorSidebar from "@/components/Vendor/VendorSidebar";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div>
      <VendorHeader />
      <div className="flex">
        <div className="md:w-80 w-[64px] bg-white shadow h-screen fixed top-[80px] left-0 bottom-0">
          <VendorSidebar />
        </div>
        <main className="w-full md:ml-[320px] ml-[64px]  text-black p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
