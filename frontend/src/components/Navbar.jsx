import logo from "/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import storeIcon from "/Navbar/store.svg";
import purchasesIcon from "/Navbar/purchases.svg";
import cartIcon from "/Navbar/cart.svg";
import nIcon from "/Navbar/N.svg";
import heartIcon from "/Navbar/heart.svg";
import shippingIcon from "/Navbar/shipping.svg";
import paymentIcon from "/Navbar/payment.svg";
import payAndManageIcon from "/Navbar/pay&manage.svg";
import padlockIcon from "/Navbar/padlock.svg";
import mailIcon from "/Navbar/mail.svg";
import contactUsIcon from "/Navbar/contact-us.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const placeholders = [
    "metallic snadlas",
    "men's leather belt",
    "floral blouse",
    "curl cream",
    "colorblock sweater",
    "throw pillows",
    "long black coat",
    "node matte lipstick",
    "sandalwood candles",
    "women's wide leg jeans",
    "cutton king size duvet",
  ];
  const options = [
    [
      "Your Account",
      [
        { text: "Purchases", icon: purchasesIcon },
        { text: "Wish List", icon: heartIcon },
        { text: "The Nordy Club Rewards", icon: nIcon },
        { text: "Shipping Addresses", icon: shippingIcon },
        { text: "Payment Methods", icon: paymentIcon },
        { text: "Pay & Manage Nordstrom Card", icon: payAndManageIcon },
      ],
    ],
    [
      "Account Settings",
      [
        { text: "Password & Personal Info", icon: padlockIcon },
        { text: "Email & Mail Preferences", icon: mailIcon },
      ],
    ],
    [
      "Need Help ?",
      [
        { text: "Contact Us", icon: contactUsIcon },
        { text: "Find a Store", icon: storeIcon },
      ],
    ],
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const authorization = useSelector((store) => store.authorization);
const dispatch = useDispatch()
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="px-2 py-6" id="navbar">
      <div className="flex items-center justify-between gap-4 mb-4 ">
        <img src={logo} alt="logo" className="h-10" />
        <div className="w-2/4 border border-black flex items-center px-2">
          <SearchIcon />
          <input
            type="text"
            placeholder={`Try searching for ${currentPlaceholder}`}
            className="placeholder:text-black border-none p-2 w-full"
          />
        </div>

        <div className="relative flex py-2 gap-6  px-4">
          <div className="group">
            <div className="flex items-center gap-2">
              {authorization.firstname && authorization.token ? (
                <p>Hi, {authorization.firstname}</p>
              ) : (
                <NavLink to={"/signin"}>
                  <p>Sign In</p>
                </NavLink>
              )}

              <ArrowDropDownIcon />
            </div>
            <div className="absolute hidden  group-hover:block z-10  text-center  shadow-2xl p-4 -left-24 top-14 border-2 bg-white">
              <div className="triangle"></div>
              {!authorization.token && (
                <NavLink to="/signin">
                  <button className="p-4 bg-blue-600 text-white">
                    <p className="text-lg">Sign In | Create Account</p>
                  </button>
                </NavLink>
              )}
              {options.map((section, index) => (
                <ul key={index} className="grid my-5 text-left">
                  <p className="text-xl font-semibold">{(index === 0 && authorization.token )? `${authorization.firstname}'s Account`:section[0]}</p>
                  {section[1].map((item, i) => (
                    <a
                      href=""
                      key={i}
                      className="flex gap-2 items-center my-1 hover:underline hover:text-blue-600"
                    >
                      <img
                        src={item.icon}
                        alt={item.text}
                        className="h-full w-6"
                      />
                      <p className="text-lg">{item.text}</p>
                    </a>
                  ))}
                </ul>
              ))}
{    authorization.token &&          <p className="text-left text-lg cursor-pointer" onClick={()=>dispatch({type:"Logout"})}>Signout</p>}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <img src={storeIcon} alt="store" />
            <p>Set Your Store</p>
            <ArrowDropDownIcon />
          </div>
          <div className="flex gap-2 items-center">
            <img src={purchasesIcon} alt="purchases" />
            <p>Purchases</p>
          </div>
          <img src={cartIcon} alt="cart" />
        </div>
      </div>
      <hr className="border-black" />
    </nav>
  );
}
