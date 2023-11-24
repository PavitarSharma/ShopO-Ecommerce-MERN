import Slider from "react-slick";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
// import { bannerData } from "@/utils/data";

const Banner = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    initialSlide: 0,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        <div
          className={`w-full md:min-h-[80vh] h-[70vh] relative bg-cover bg-no-repeat bg-[url('/images/banner1.jpg')] md:bg-top bg-center flex items-center justify-center`}
        >
          <div className="w-[90%] md:w-[60%] mx-auto h-full flex items-start justify-center flex-col">
            <h1 className="md:text-6xl xl:w-[60%] md:w-full sm:w-[60%] leading-[1.2] text-4xl text-[#3d3a3a] font-[600] capitalize">
              Best Collection for home Decoration
            </h1>

            <p className="text-[#000000ba] font-medium font-[Poppins] text-[16px] my-3 tracking-wide">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
              assumenda? Quisquam itaque exercitationem labore vel, dolore
              quidem asperiores, laudantium temporibus soluta optio consequatur
              aliquam deserunt officia. Dolorum saepe nulla provident.
            </p>
            <div className="w-[130px]">
              <Button
                onClick={() => navigate("/products")}
                className="bg-black"
              >
                Shop now
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`w-full md:min-h-[80vh] h-[70vh] relative bg-cover bg-no-repeat bg-[url('/images/banner2.png')] md:bg-top bg-center flex items-center justify-center`}
        >
          <div className="w-[90%] md:w-[60%] mx-auto h-full flex items-start justify-center flex-col">
            <h1 className="md:text-6xl xl:w-[60%] md:w-full sm:w-[60%] leading-[1.2] text-4xl text-[#3d3a3a] font-[600] capitalize">
              Exclusive Deals for your summer vaction
            </h1>

            <p className="text-[#000000ba] font-medium font-[Poppins] text-[16px] my-3 tracking-wide">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
              assumenda? Quisquam itaque exercitationem labore vel, dolore
              quidem asperiores, laudantium temporibus soluta optio consequatur
              aliquam deserunt officia. Dolorum saepe nulla provident.
            </p>
            <div className="w-[130px]">
              <Button
                onClick={() => navigate("/products")}
                className="bg-black"
              >
                Shop now
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`w-full md:min-h-[80vh] h-[70vh] relative bg-cover bg-no-repeat bg-[url('/images/banner3.png')] md:bg-top bg-center flex items-center justify-center`}
        >
          <div className="w-[90%] md:w-[60%] mx-auto h-full flex items-start justify-center flex-col">
            <h1 className="md:text-6xl xl:w-[60%] md:w-full sm:w-[60%] leading-[1.2] text-4xl text-[#3d3a3a] font-[600] capitalize">
              New Arrivals for Your Home
            </h1>

            <p className="text-[#000000ba] font-medium font-[Poppins] text-[16px] my-3 tracking-wide">
              Explore our latest collection of home decor items. Elevate your
              space with style and comfort.
            </p>
            <div className="w-[130px]">
              <Button
                onClick={() => navigate("/products")}
                className="bg-black"
              >
                Shop now
              </Button>
            </div>
          </div>
        </div>
        {/* {bannerData?.map((data, index) => {
          const imgUrl = new URL(data.image, import.meta.url).href;

          return (
            <div
              key={index}
              // style={{ backgroundImage: `url(${imgUrl})` }}
              className={`w-full md:min-h-[80vh] h-[70vh] relative bg-cover bg-no-repeat bg-[url(${imgUrl})] md:bg-top bg-center flex items-center justify-center`}
            >
              <div className="w-[90%] md:w-[60%] mx-auto h-full flex items-start justify-center flex-col">
                <h1 className="md:text-6xl xl:w-[60%] md:w-full sm:w-[60%] leading-[1.2] text-4xl text-[#3d3a3a] font-[600] capitalize">
                  {data?.title}
                </h1>

                <p className="text-[#000000ba] font-medium font-[Poppins] text-[16px] my-3 tracking-wide">
                  {data?.description}
                </p>
                <div className="w-[130px]">
                  <Button
                    onClick={() => navigate("/products")}
                    className="bg-black"
                  >
                    Shop now
                  </Button>
                </div>
              </div>
            </div>
          );
        })} */}
      </Slider>
    </div>
  );
};

export default Banner;
