import { Rating } from "@mui/material";


export default function NormalCard({data}) {
      const {
            images,
            // title,
            // isMultipleImages,
            isPopular,
            brand,
            offerPrice,
            originalPrice,
            // dealType,
            isSpecialOffer,
            discount,
            isFlatDiscount,
            ratings,
            ratingsCount,
            // sizes,
          } = data;

  return (
      <div className="p-1 h-[525px] min-w-[250px] flex flex-col items-center   ">
      <div className="group/image  h-2/4 w-full relative">
        <img
          src={Object.entries(images)[0][1][1]}
          alt="image"
          loading="lazy"
          className="h-full w-full"
        />
        {isPopular && (
          <p className="absolute bottom-0 bg-[#ffffffc5] p-px font-semibold">
            Popular
          </p>
        )}
        <button className="absolute bottom-0  left-2/4 -translate-x-2/4 hidden group-hover/image:block  text-nowrap   border border-blue-500 bg-[#ffffffc5] py-2 w-full">
          Quick View
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-green-900 text-xl font-semibold">
          Arrives before Christmas
        </p>
        <p>{brand}</p>
        <div
          className={`${isSpecialOffer ? "text-red-600" : "text-black"} ${
            isFlatDiscount ? "flex gap-1" : "block"
          }`}
        >
          <p className="font-semibold text-lg">
            {Array.isArray(offerPrice)
              ? `$${offerPrice[0]} - $${offerPrice[1]}`
              : `$${offerPrice}`}
          </p>
          <p>
            {isFlatDiscount
              ? `(${discount}% off)`
              : `(Up to ${discount}% off select items)`}
          </p>
        </div>
        <p className="text-lg tracking-wider line-through">
          {Array.isArray(originalPrice)
            ? `$${originalPrice[0].toFixed(2)} - $${originalPrice[1].toFixed(2)}`
            : `$${originalPrice.toFixed(2)}`}
        </p>
        {ratings && (
          <div className="flex gap-1">
            <Rating
              name="half-rating-read"
              defaultValue={ratings}
              precision={0.1}
              readOnly
              sx={{ color: "blue", alignSelf: "center" }}
              size="small"
            />
            <p className="text-slate-600">({ratingsCount})</p>
          </div>
        )}
      </div>
    </div>
  )
}
