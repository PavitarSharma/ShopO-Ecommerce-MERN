import Container from "@/components/Layout/Container";
import ShopInfo from "@/components/Vendor/Profile/ShopInfo";
import ShopProfile from "@/components/Vendor/Profile/ShopProfile";
import VendorHeader from "@/components/Vendor/VendorHeader";
import useToggle from "@/hooks/useToggle";
import { Helmet } from "react-helmet";


const VendorProfile = () => {
  const shopInfoToggle = useToggle(false);

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <VendorHeader />
      <Container>
        <div className="w-full bg-[#f5f5f5] my-10">
          <div className="bg-white shadow rounded w-[22rem]  overflow-y-auto scrollbar fixed top-28  z-10 p-4 lg:block hidden">
            <ShopInfo onClose={shopInfoToggle.onToggle} />
          </div>

          {shopInfoToggle.open && (
            <div
              ref={shopInfoToggle.toggleRef}
              className="bg-black/40 fixed z-50 inset-0 lg:hidden block"
            >
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className="bg-white shadow rounded w-[22rem]  overflow-y-auto scrollbar fixed top-[80px] h-screen left-0 z-10 p-4"
              >
                <ShopInfo  onClose={shopInfoToggle.onToggle} />
              </div>
            </div>
          )}
          <div className="lg:w-[calc(100%-24rem)] w-full lg:ml-auto  rounded p-4">
            <ShopProfile toggleShopInfo={shopInfoToggle.onToggle} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default VendorProfile;
