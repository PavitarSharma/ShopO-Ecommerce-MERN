import Card from "@/components/Layout/Card";
import Container from "@/components/Layout/Container";
import EventCard from "@/components/Layout/EventCard";
import ProductCard from "@/components/Layout/ProductCard";
import Title from "@/components/Layout/Title";

import Banner from "@/components/Root/Banner";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useCategories from "@/hooks/useCategories";
import { BACKEND_URL } from "@/http";
import { brandingData, sponseredData } from "@/utils/data";
import { Category } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const Home = () => {
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  useAxiosPrivate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplaySpeed: 5000,
    autoplay: true,
    initialSlide: 0,
    adaptiveHeight: true,
  };
  return (
    <>
      <Banner />
      <Container>
        {/* Brand */}
        <div className="grid lg:grid-cols-4 grid-cols-2 flex-wrap md:gap-6 gap-10 my-6">
          {brandingData.map((data) => (
            <Card key={data.id}>
              <div className="flex sm:flex-row flex-col items-center justify-center gap-2">
                <img
                  src={data.image}
                  alt={data.title}
                  width={40}
                  height={40}
                  loading="lazy"
                />

                <div className="sm:text-start text-center">
                  <h3 className="font-bold text-sm md:text-base">
                    {data.title}
                  </h3>
                  <p className="text-xs md:text-sm">{data.Description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="my-6">
          <Card>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 flex-wrap md:gap-6 gap-10">
              {categories &&
                categories?.map((item: Category) => {
                  const productItem = item?.name.replace(/\s/g, "-");
                  return (
                    <div
                      key={item?._id}
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                    >
                      <img
                        onClick={() =>
                          navigate(`/products?category=${productItem}`)
                        }
                        src={`${BACKEND_URL}/${item?.image}`}
                        alt={item?.name}
                        width={80}
                        height={80}
                        loading="lazy"
                      />

                      <h5>{item?.name}</h5>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>

        {/* Best Deals */}
        <div className="my-12">
          <Title title="Best Deals" />

          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[540px]:grid-cols-2 grid-cols-1 mt-4 gap-6">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>

        {/* Popular events */}
        <div className="my-12 flex flex-col gap-4">
          <Title title="Popular Events" />
          <EventCard />
        </div>

        {/* Featured products */}
        <div className="my-12">
          <Title title="Featured Products" />

          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[540px]:grid-cols-2 grid-cols-1 mt-4 gap-6">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>

        <div>
          <Card>
            <div className="sm:flex hidden justify-between w-full gap-6">
              {sponseredData.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-24 object-contain"
                />
              ))}
            </div>

            <div className="sm:hidden block ">
              <Slider {...settings} className="w-full h-full">
                {sponseredData.map((item) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.name}
                    className="sm:w-14 sm:h-14 h-10 w-10 object-contain"
                  />
                ))}
              </Slider>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Home;
