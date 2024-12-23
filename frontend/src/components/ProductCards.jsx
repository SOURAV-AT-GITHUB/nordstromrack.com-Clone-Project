import { Modal, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProductCards({ data }) {
  const {
    _id,
    images,
    title,
    isMultipleImages,
    isPopular,
    brand,
    offerPrice,
    originalPrice,
    dealType,
    isSpecialOffer,
    discount,
    isFlatDiscount,
    ratings,
    ratingsCount,
    sizes,
  } = data;
  const authorization = useSelector((store) => store.authorization);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selection, setSelection] = useState({
    product_id: _id,
    title,
    image:Object.entries(images)[0][1][1],
    color: Object.entries(images)[0][0],
    quantityt: 1,
    price: Array.isArray(offerPrice) ? offerPrice[0] : offerPrice,
    size: sizes === null ? null : '',
  });
  const [updateCart,setUpdateCart] = useState(false)
  const [hoveringColor, setHoveringColor] = useState(selection.color);
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsAdded(false);
  };
  const handleIndexIncrease = () => {
    setActiveIndex((prev) => {
      if (prev >= images[selection.color].length - 1) return 1;
      else return prev + 1;
    });
  };
  const handleIndexDecrease = () => {
    setActiveIndex((prev) => {
      if (prev <= 1) return images[selection.color].length - 1;
      else return prev - 1;
    });
  };
  const addToCart = async () => {
    if (selection.size === "")
      return setSelection((prev) => ({ ...prev, size: false }));
    if (selection.size === false) return;
    if (!authorization.token) navigate("/signin");
    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/cart/add`, selection, {
        headers: { authorization: `Bearer ${authorization.token}` },
      });
      setIsAdded(true);
      dispatch({ type: "update", payload: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (Array.isArray(offerPrice)) {
      if (activeColorIndex === 0)
        return setSelection((prev) => ({ ...prev, price: offerPrice[0] }));
      else return setSelection((prev) => ({ ...prev, price: offerPrice[1] }));
    }
  }, [updateCart]);
  // useEffect(()=>{console.log(selection)},[selection])
  return (
    <div className="p-1 h-[525px] min-w-[250px] flex flex-col items-center   ">
      <div className="group/image  h-2/4 w-full relative">
        <img
          src={images[hoveringColor][1]}
          alt="image"
          loading="lazy"
          className="h-full w-full"
        />
        {isPopular && (
          <p className="absolute bottom-0 bg-[#ffffffc5] p-px font-semibold">
            Popular
          </p>
        )}
        <button
          onClick={handleOpen}
          className="absolute bottom-0  left-2/4 -translate-x-2/4 hidden group-hover/image:block  text-nowrap   border border-blue-500 bg-[#ffffffc5] py-2 w-full"
        >
          Quick View
        </button>
      </div>

      {isMultipleImages && (
        <div className="flex gap-2 mt-4 ">
          {Object.entries(images).map(([color, [colorImage, image]], index) => (
            <button
              key={index}
              onMouseEnter={() => setHoveringColor(color)}
              onMouseLeave={() => setHoveringColor(selection.color)}
              onClick={() => {
                setSelection((prev) => ({ ...prev, color: color,image:images[color][1] }));
                setHoveringColor(color);
                setActiveColorIndex(index);
              }}
              className={`${
                hoveringColor === color
                  ? " border-slate-400"
                  : "border-transparent"
              } rounded-full border-[3px] p-[1.5px]`}
            >
              <img
                src={colorImage}
                alt={"color" + (color + 1)}
                loading="lazy"
                className="h-5 w-5 rounded-full "
              />
            </button>
          ))}
        </div>
      )}

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
          {/* {Array.isArray(originalPrice)
            ? `$${originalPrice[0].toFixed(2)} - $${originalPrice[1].toFixed(
                2
              )}`
            : `$${originalPrice.toFixed(2)}`} */}
            {originalPrice.toFixed(2)}
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

      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] p-5  flex   gap-4 bg-white min-w-[50vw] min-h-[75vh]">
          <div className=" max-h-[400px]  w-2/4">
            <img
              src={images[selection.color][activeIndex]}
              alt="image"
              loading="lazy"
              className="max-h-[60vh]"
            />
            <div className="flex w-fit m-auto gap-4 text-lg mt-2">
              <button onClick={handleIndexDecrease}>&lt;</button>
              <p>
                {activeIndex}/{images[selection.color].length - 1}
              </p>
              <button onClick={handleIndexIncrease}>&gt;</button>
            </div>
          </div>
          <div className="w-2/4 flex flex-col gap-4">
            <button onClick={handleClose}>
              <CloseIcon className="absolute right-2 top-2" fontSize="large" />
            </button>
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
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-blue-500 underline cursor-pointer">{brand}</p>
            <div
              className={`${isSpecialOffer ? "text-red-600" : "text-black"} ${
                isFlatDiscount ? "flex gap-1" : "block"
              }`}
            >
              <p className="font-semibold text-lg">
                {selection.size ? `$${selection.price}` :Array.isArray(offerPrice)
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
                ? `$${originalPrice[0].toFixed(
                    2
                  )} - $${originalPrice[1].toFixed(2)}`
                : `$${originalPrice.toFixed(2)}`}
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
              sapiente quod nesciunt, impedit est perferendis delectus doloribus
            </p>
            <p>
              Color : <span className="font-medium">{hoveringColor}</span>
            </p>
            <div className="flex gap-5">
              {Object.entries(images).map(([key, imagesArray], index) => (
                <div
                  onClick={() => {
                    setSelection((prev) => ({ ...prev, color: key,image:images[key][1] }));
                    setActiveColorIndex(index);
                  }}
                  key={key}
                  className={`relative  max-h-[60px] max-w-[60px] px-2 py-px border-2  ${
                    selection.color === key && "border-black"
                  }  cursor-pointer`}
                >
                  <img src={imagesArray[1]} alt={key} className="h-full" />
                  {selection.color === key && (
                    <CheckCircleRoundedIcon
                      color="info"
                      fontSize="small"
                      className="absolute bg-white rounded-full  -top-3 -right-2"
                    />
                  )}
                </div>
              ))}
            </div>
            {sizes && (
              <select
                value={selection.size}
                onChange={(e) =>{
                  setSelection((prev) => ({ ...prev, size: e.target.value }))
                  setUpdateCart(prev=>!prev)}
                }
                className="font-semibold text-lg  border border-black  w-full  p-2"
              >
                <option value="">Size</option>
                {sizes.map((size) => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
            )}
            {selection.size === false && (
              <div className="flex items-center gap-2  bg-red-200 p-3 border-l-8 border-red-600">
                <InfoIcon color="error" fontSize="large" />
                <p className="font-bold">Choose a size to continue</p>
              </div>
            )}

            <button
              disabled={isLoading}
              onClick={addToCart}
              className="bg-blue-500 py-2 flex gap-2 justify-center text-white text-lg mt-4 disabled:cursor-progress"
            >
              <LocalMallIcon />
              <p>{isAdded ? "In Your Bag":isLoading ? "Adding to Bag..." : "Add to Bag"}</p>
            </button>

            <div className="flex">
              <AddIcon />
              <p className="text-blue-500 underline">Add to Wish List</p>
            </div>
            <p className="text-blue-500 underline w-fit m-auto">
              See full details
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
