import CountDown from "./CountDown";

const EventCard = ({ active }: { active?: boolean }) => {
  return (
    <>
      <div
        className={`shadow rounded-lg bg-white grid md:grid-cols-2 grid-cols-1 place-items-center ${
          active ? "bg-gray-50" : " bg-white"
        }`}
      >
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt="image"
          className="rounded-l-lg"
        />

        <div className="px-4">
          <h2 className="md:text-2xl text-xl md:w-[80%] w-full font-bold">
            Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour
          </h2>

          <p className="my-2 tracking-wider text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
            soluta nam laboriosam quibusdam illo nesciunt, voluptatum, tenetur
            ducimus ipsam facilis quisquam! Necessitatibus nam ex qui quos?
            Laboriosam unde nisi blanditiis illum nihil, enim eaque rem dolorum
            qui a alias numquam quo quas aspernatur animi incidunt ab facilis
            facere eum repellendus?
          </p>

          <div className="flex items-center justify-between my-6">
            <div className="relative flex">
              {/* <h5 className={`${styles.productDiscountPrice}`}>
                {product?.price === 0
                  ? product?.price
                  : product?.discount_price}
                $
              </h5> */}
              <h5 className="font-semibold">$1049</h5>
              <del className="text-red-600 text-xs -mt-2 ml-1">$1099</del>
            </div>

            <p className="text-green-600 font-medium">35 Sold</p>
          </div>

          <CountDown />
        </div>
      </div>
    </>
  );
};

export default EventCard;
