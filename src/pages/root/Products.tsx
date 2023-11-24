import Container from "@/components/Layout/Container";
import ProductCard from "@/components/Layout/ProductCard";
import { Helmet } from "react-helmet";

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Container>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[540px]:grid-cols-2 grid-cols-1 mt-12 gap-6 mb-14">
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
      </Container>
    </>
  );
};

export default Products;
