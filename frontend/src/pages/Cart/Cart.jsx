import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartData } from "../../store/actions";
import giftIcon from "/Cartpage/gift.svg";
import truckIcon from "/Cartpage/truck.svg";
import {
  Box,
  CircularProgress,
  Popper,
  ClickAwayListener,
  Button,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import afterpaylogo from "/Cartpage/afterpay.svg";
import paypalogo from "/Cartpage/paypal.webp";
import highfiveEmoji from "/Cartpage/high-five.webp";
// import {shippingDateCalculator} from '../../utils/shippingDateCalculator'

const Arrow = styled("div")(({ placement }) => ({
  position: "absolute",
  width: 15,
  height: 15,
  background: "white",
  transform: "rotate(45deg)",

  borderWidth: placement === "top" ? "0px 1px 1px 0px" : "1px 0px 0px 1px",
  borderColor: "black",

  // boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
  // zIndex: -1,
  ...(placement === "bottom" && {
    top: -8,
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
  }),
  ...(placement === "top" && {
    bottom: -8,
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
  }),
}));

export default function Cart() {
  const cart = useSelector((store) => store.cart);
  console.log(cart);
  const authorization = useSelector((store) => store.authorization);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCartData(authorization.token, "get"));
  }, [dispatch, authorization]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState("top");
  const popperRef = useRef(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const updatePlacement = () => {
    if (anchorEl && popperRef.current) {
      const buttonRect = anchorEl.getBoundingClientRect();
      const popperRect = popperRef.current.getBoundingClientRect();
      const spaceAbove = buttonRect.top;
      const spaceBelow = window.innerHeight - buttonRect.bottom;

      // Initial placement is "top"; only switch to "bottom" when there's no space above.
      if (spaceAbove < popperRect.height && spaceBelow > popperRect.height) {
        setPlacement("bottom");
      } else {
        setPlacement("top");
      }
    }
  };

  useEffect(() => {
    if (open) {
      updatePlacement();
      window.addEventListener("scroll", updatePlacement, true);
      window.addEventListener("resize", updatePlacement);
    }

    return () => {
      window.removeEventListener("scroll", updatePlacement, true);
      window.removeEventListener("resize", updatePlacement);
    };
  }, [open]);
  return (
    <main className={`bg-[#eff3f6] px-8 py-4`}>
      {cart.isError && (
        <div className="bg-red-300 text-lg p-3 text-center">
          <InfoOutlinedIcon className="text-red-600" fontSize="large" />
          <p> {cart.isError || "Something went wrong"}</p>
        </div>
      )}

      <Modal
        open={cart.isLoading && !cart.isError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="transparent-blur h-screen grid items-center justify-center">
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              variant="determinate"
              sx={(theme) => ({
                color: theme.palette.grey[700],
              })}
              size={70}
              thickness={4}
              value={100}
            />
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={(theme) => ({
                color: theme.palette.grey[400],
                animationDuration: "750ms",
                position: "absolute",
                left: 0,
              })}
              size={70}
              thickness={4}
            />
          </Box>
        </div>
      </Modal>

      {authorization.token ? (
        <section className="flex flex-col gap-5">
          {cart.items[0] ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:grid grid-cols-3">
                <div className="col-span-2  bg-white p-4 flex flex-col gap-4">
                  <p className="text-4xl font-semibold">
                    Shopping Bag ({cart.items.length})
                  </p>
                  <div className="flex gap-2">
                    <p className="border-r-2 border-slate-500  pr-4">
                      Items in your bag are not hold{" "}
                    </p>
                    <div className="flex gap-2">
                      <img src={giftIcon} alt="gift-icon" />
                      Add a gift message when you check out.
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <p className="font-semibold text-lg">
                    Your&apos;re saving $9.95 with free standard shipping
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-10/12 bg-blue-500 h-[15px]"></div>
                    <p className="text-slate-400">$89</p>
                  </div>
                  <p className="text-blue-500 underline cursor-pointer">
                    Exclusions apply
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:grid grid-cols-3">
                <div className="col-span-2 bg-white p-4 flex flex-col gap-5 ">
                  <div className="flex items-center  gap-4">
                    <img src={truckIcon} alt="truckIcon" className="h-10" />
                    <p className="text-4xl font-semibold">
                      Shipping ({cart.items.length} items)
                    </p>
                    <ClickAwayListener onClickAway={handleClose}>
                      <div>
                        <Button variant="contained" onClick={handleClick}>
                          Toggle Popper
                        </Button>
                        <Popper
                          open={open}
                          anchorEl={anchorEl}
                          placement={placement}
                          disablePortal
                          modifiers={[
                            {
                              name: "flip",
                              options: {
                                fallbackPlacements: ["top", "bottom"],
                              },
                            },
                            {
                              name: "preventOverflow",
                              options: {
                                boundary: "viewport",
                              },
                            },
                          ]}
                        >
                          <Box
                            ref={popperRef}
                            sx={{
                              padding: 2,
                              background: "white",
                              borderRadius: 1,
                              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                              maxWidth: 300,
                              position: "relative",
                              marginBottom: "1rem",
                              marginTop: "1rem",
                              border: "1px solid",
                            }}
                          >
                            <Arrow placement={placement} />
                            This is a dynamically positioned Popper.
                          </Box>
                        </Popper>
                      </div>
                    </ClickAwayListener>
                  </div>
                  <p>
                    Free standard shipping to your address or store on orders
                    $89+
                  </p>
                  <p>Change all to pickup</p>
                  <div className="flex flex-col gap-4">
                    {cart.items.map((item, index) => (
                      <div key={index}>
                        <hr />
                        <div className="grid grid-cols-4 gap-2 py-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-h-[250px]"
                          />
                          <div className="flex flex-col gap-4">
                            <div>
                              <p className="font-semibold text-green-800">
                                Arrives before Christmas
                              </p>
                              <p>{item.brand}</p>
                              <p>{item.title}</p>
                            </div>
                            <div>
                              {item.size && <p>{item.size}</p>}
                              <p>Color: {item.color.toUpperCase()}</p>
                            </div>
                            <div className="flex text-blue-500">
                              <p>Qty</p>
                              <select
                                value={item.quantity}
                                onChange={(e) =>
                                  dispatch(
                                    updateCartData(
                                      authorization.token,
                                      "update",
                                      item._id,
                                      Number(e.target.value)
                                    )
                                  )
                                }
                              >
                                {Array.from({ length: 25 }).map((_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex justify-between text-blue ">
                              <p
                                onClick={() =>
                                  dispatch(
                                    updateCartData(
                                      authorization.token,
                                      "delete",
                                      item._id
                                    )
                                  )
                                }
                                className="text-blue-500 border-b border-transparent cursor-pointer hover:border-blue-500"
                              >
                                Remove
                              </p>
                              <p className="text-blue-500 border-b border-transparent cursor-pointer hover:border-blue-500">
                                Save for later
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-4 items-center">
                            Shipping
                          </div>

                          <div className="flex flex-col gap-4 items-end text-right text-lg">
                            <div
                              className={
                                item.isSpecialOffer ? "text-red-700" : ""
                              }
                            >
                              <p className="font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p>({item.price.toFixed(2)} each)</p>
                              )}
                            </div>
                            <div>
                              <p>Now: ${item.price.toFixed(2)}</p>
                              <p>
                                Was:{" "}
                                <span className="line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-white p-4 h-fit">
                  <p className="text-2xl font-semibold">Order summary</p>
                  <div className="text-xl  flex justify-between items-center text-slate-900 ">
                    <p>Subtotal</p>
                    <p>${cart.subtotal}</p>
                  </div>
                  <div className="flex justify-between items-center text-slate-900 ">
                    <p>Shipping</p>
                    <p className="flex items-center gap-1 text-lg">
                      <InfoOutlinedIcon
                        fontSize="small"
                        className="text-blue-500"
                      />
                      Free
                    </p>
                  </div>
                  <div className="text-lg  flex justify-between items-center text-slate-900 ">
                    <p>Extimated tax</p>
                    <p>${cart.estimatedTax}</p>
                  </div>
                  <hr className="border" />
                  <div className="flex justify-between items-center text-slate-900  text-2xl">
                    <p>Estimated total</p>
                    <p></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p>
                      or 4 interest-free payments of $
                      {(cart.subtotal / 4).toFixed(2)} with{" "}
                    </p>
                    <img src={afterpaylogo} alt="afterpay" className="h-4" />
                    <InfoOutlinedIcon
                      fontSize="small"
                      className="text-slate-600"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p>or</p>
                    <img src={paypalogo} alt="paypal" className="h-4" />
                  </div>
                  <div className="flex items-center gap-2 w-fit mx-auto bg-[#eff3f6] p-1 px-2">
                    <p className="font-bold">
                      Way to go—you&apos;re saving ${cart.savings}!
                    </p>
                    <img src={highfiveEmoji} alt="high-five" className="h-5" />
                    <InfoOutlinedIcon
                      fontSize="medium"
                      className="text-blue-500"
                    />
                  </div>
                  <button className="w-full bg-blue-500 text-white p-4">
                    Check Out
                  </button>
                  <p className="text-center">
                    Continue to Checkout to pay with PayPal.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>cart empty</div>
          )}
        </section>
      ) : (
        <section className="p-5 grid grid-cols-3 bg-white">
          <div className="col-span-2 flex flex-col gap-4">
            <p className="text-3xl font-bold">Your bag is empty</p>
            <p className="">
              Have an account? Sign in to view any items you&apos;ve saved.
            </p>
            <div className="grid grid-cols-2 gap-5 font-bold">
              <button className="py-3  bg-blue-500 text-white">Sign In</button>
              <button className="py-3  border-2 border-blue-500 ">
                Keep Shopping
              </button>
            </div>
          </div>

          <div></div>
        </section>
      )}
    </main>
  );
}
