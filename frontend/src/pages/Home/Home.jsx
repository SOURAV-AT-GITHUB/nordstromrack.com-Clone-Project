import { useEffect, useState } from "react";
import imageSlide1 from "/Homepage/slide-image-1.webp";
import imageSlide2 from "/Homepage/slide-image-2.webp";
import imageSlide3 from "/Homepage/slide-image-3.webp";
import banner1 from "/Homepage/banner-1.webp";
import banner1_1 from "/Homepage/banner-1-1.webp";

import banner2 from "/Homepage/banner-2.webp";
import endbanner from '/Homepage/end-banner.webp'
import ProductCardsSlider from "../../components/ProductCardsSlider";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const images = [imageSlide1, imageSlide2, imageSlide3];
  const [activeIndex, setActiveIndex] = useState(2);
  const authorization = useSelector((store) => store.authorization);
  const nextImage = () => {
    setActiveIndex((prev) => {
      if (prev >= 2) {
        return 0;
      }
      return prev + 1;
    });
  };
  const previousImage = () => {
    setActiveIndex((prev) => {
      if (prev === 0) {
        return 2;
      }
      return prev - 1;
    });
  };
  useEffect(() => {
    const timeOut = setTimeout(nextImage, 1500);
    return () => clearTimeout(timeOut);
  }, [activeIndex]);
  return (
    <main className="p-6 flex flex-col gap-5">
      {authorization.token ? (
        <div className="p-6  pb-20">
          <p className="text-3xl font-bold">Welcome back, {authorization.firstname}!</p>

        </div>
      ) : (
        <div className="text-center p-16">
          <p className="text-3xl font-bold">More to Rack, easier and faster</p>
          <NavLink to={'/signin'}>

          <button className="border border-blue-500 p-2 px-6  mt-5 text-sm tracking-wider">
            Sign In or Create an Acount
          </button>
          </NavLink>
        </div>
      )}
      <div className="flex">
        <video autoPlay loop muted className="w-10/12">
          <source
            src="https://n.nordstrommedia.com/it/268f7dd3-05c0-49aa-8652-b060b8327a42.mp4?h=&w="
            type="video/mp4"
          />
        </video>
        <div className="w-2/12  bg-[#ba1229] text-white underline flex flex-col justify-center items-center gap-2">
          <a href="">Holiday Gift Shop</a>
          <a href="">Find Your Rack</a>
        </div>
      </div>
      <div className="relative  mt-8 group">
        <img
          src={images[activeIndex]}
          alt={"slideimage-" + activeIndex + 1}
          className="h-full"
        />
        <button
          onClick={previousImage}
          className="group/button  absolute  top-2/4 "
        >
          <svg
            viewBox="0 0 256 256"
            className="absolute top-2/4   h-16 rotate-180 opacity-0  group-hover:opacity-100 group-hover/button:hidden  transition-all duration-300 ease-in-out"
          >
            <g>
              <g>
                <path
                  fill="white"
                  d="M73,246l-7.1-7.1L177.8,128L65.9,17.1L73,10l117.1,118L73,246z"
                />
              </g>
            </g>
          </svg>

          <svg
            className="absolute top-2/4 opacity-0   group-hover/button:opacity-100 transition-all duration-300 ease-in-out  h-20 rotate-180 bg-white"
            viewBox="-10 -10 41 60"
          >
            <defs>
              <mask
                id="mask-right-arrow-xl"
                x="-10"
                y="-10"
                width="41"
                height="60"
              >
                <rect
                  x="-10"
                  y="-10"
                  width="41"
                  height="60"
                  fill="black"
                ></rect>
                <path d="M20 20l-19-19m0 38l19-19" stroke="red"></path>
              </mask>
            </defs>
            <rect
              x="-10"
              y="-10"
              width="41"
              height="60"
              mask="url(#mask-right-arrow-xl)"
            ></rect>
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="group/button  absolute  top-2/4 right-14"
        >
          <svg
            viewBox="0 0 256 256"
            className="absolute top-2/4   h-16  opacity-0  group-hover:opacity-100 group-hover/button:hidden  transition-all duration-300 ease-in-out"
          >
            <g>
              <g>
                <path
                  fill="white"
                  d="M73,246l-7.1-7.1L177.8,128L65.9,17.1L73,10l117.1,118L73,246z"
                />
              </g>
            </g>
          </svg>

          <svg
            className="absolute top-2/4 opacity-0  group-hover/button:opacity-100 transition-all duration-300 ease-in-out  h-20  bg-white"
            viewBox="-10 -10 41 60"
          >
            <defs>
              <mask
                id="mask-right-arrow-xl"
                x="-10"
                y="-10"
                width="41"
                height="60"
              >
                <rect
                  x="-10"
                  y="-10"
                  width="41"
                  height="60"
                  fill="black"
                ></rect>
                <path d="M20 20l-19-19m0 38l19-19" stroke="red"></path>
              </mask>
            </defs>
            <rect
              x="-10"
              y="-10"
              width="41"
              height="60"
              mask="url(#mask-right-arrow-xl)"
            ></rect>
          </svg>
        </button>
      </div>
      <ProductCardsSlider URL={`${BACKEND_URL}/products`} />
      <img src={banner1} alt="banner-1" />
      <img src={banner1_1} alt="banner-1.1" />
      <ProductCardsSlider URL={`${BACKEND_URL}/products`} />
      <img src={banner2} alt="banner-2" />

      <div className="py-6">
        <img src={endbanner} alt={'endbanner'} />
        <div className="flex gap-4 py-5 w-fit  ml-auto text-lg font-semibold  items-center">
          <p>Get Email Updates.</p>
          <input type="text"  placeholder="Email Address" className="border border-black p-1"/>
          <button className="bg-blue-500 text-white px-10 py-2">Sign Up</button>
        </div>
      </div>
    </main>
  );
}
