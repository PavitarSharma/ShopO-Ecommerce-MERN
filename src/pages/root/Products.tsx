import Container from "@/components/Layout/Container";
import ProductCard from "@/components/Layout/ProductCard";
import useProducts from "@/hooks/product/useProducts";
import { Product } from "@/utils/types";
import { Helmet } from "react-helmet";

const Products = () => {
  const { data: products, isLoading } = useProducts();

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Container>
        <div className="flex mt-12 mb-14 gap-6">

          <div className="w-[350px] bg-white h-screen lg:block hidden">

          </div>
          <div className="lg:w-[calc(100% - 350px)] lg:ml-auto w-full mx-auto">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid xl:grid-cols-4  sm:grid-cols-2 grid-cols-1 gap-6">
                {products?.length > 0
                  ? products?.map((product: Product) => (
                      <ProductCard key={product?._id} product={product} />
                    ))
                  : "No product found"}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Products;
