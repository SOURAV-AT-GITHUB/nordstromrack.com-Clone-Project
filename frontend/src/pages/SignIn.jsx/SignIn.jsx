import axios from "axios";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function SignIn() {
  const [user, setuser] = useState({
    email: "",
    password: "",
    isExisting: null,
    firstname: "",
    lastname: "",
  });
  const [step, setStep] = useState("search-by-email");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    severity: "",
    message: "",
  });
  const dispatch = useDispatch();
  const authorization = useSelector((store) => store.authorization);
  const navigate = useNavigate();
  const closeSnackabr = () =>
    setSnackbarState({
      isOpen: false,
      severity: "",
      message: "",
    });
  const findUserByEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/user/${step}`, {
        email: user.email,
      });
      if (response.data.isExisting) {
        setStep("signin");
        setuser((prev) => ({ ...prev, isExisting: true }));
      } else {
        setStep("register");
        setuser((prev) => ({ ...prev, isExisting: false }));
      }
    } catch (error) {
      if (error.status === 500) {
        setSnackbarState({
          isOpen: true,
          severity: "error",
          message: error.response.data.message,
        });
      } else {
        console.log('error');
        console.log(error);
        setSnackbarState({
          isOpen: true,
          severity: "error",
          message: error.message || "Please check your network",
        });
        
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = user;
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, {
        email,
        password,
      });
      dispatch({ type: "signin",payload:response.data });
      
    } catch (error) {
      console.log(error)
      
      if (
        error.status === 401 ||
        error.status === 500 ||
        error.status === 404
      ) {
        setSnackbarState({
          isOpen: true,
          severity: "error",
          message: error.response.data.message,
        });
      } else {
        setSnackbarState({
          isOpen: true,
          severity: "error",
          message: "Please check your network connection.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const registerNewUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password, firstname, lastname } = user;
      const response = await axios.post(`${BACKEND_URL}/user/${step}`, {
        email,
        password,
        firstname,
        lastname,
      });
      console.log(response);

      setSnackbarState({
        isOpen: true,
        severity: "success",
        message: response.data.message,
      });
      setStep("search-by-email");
      setuser({
        email: "",
        password: "",
        isExisting: null,
        firstname: "",
        lastname: "",
      })
    } catch (error) {
      if (error.status) {
        setSnackbarState({
          isOpen: true,
          severity: "error",
          message: error.response.data.message,
        });
      } else {
        setSnackbarState({
          isOpen: true,
          severity: "error",
          message: "Please check you network connection",
        });
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (authorization.token) {
      setuser({
        email: "",
        password: "",
        isExisting: null,
        firstname: "",
        lastname: "",
      });
      setIsLoading(false);
      setShowPassword(false);
      setStep("search-by-email");
      setSnackbarState({
        isOpen: false,
        severity: "",
        message: "",
      });
      navigate("/");
    }
  }, [authorization]);
  return (
    <main className="m-auto max-w-[500px] py-10 flex flex-col gap-6">
      {step === "register" ? (
        <form onSubmit={registerNewUser} className="flex flex-col gap-5">
          <p className="text-3xl font-bold">Create Account</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="none"
                viewBox="0 0 24 24"
                data-testid="svg_IconCreditCardFast"
              >
                <path
                  fill="#191A1B"
                  d="M9 15a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1"
                ></path>
                <path
                  fill="#191A1B"
                  fillRule="evenodd"
                  d="M9 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zM8 8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1H8zm0 3h14v5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#191A1B"
                  d="M3 15a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2zM2 11a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zM1 7a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2z"
                ></path>
              </svg>
              <div>Check out faster</div>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="none"
                viewBox="0 0 24 24"
                data-testid="svg_IconFreeShippingOutlined"
              >
                <path
                  fill="#191A1B"
                  fillRule="evenodd"
                  d="M2 3a2 2 0 0 0-2 2v10a2 2 0 0 0 1.075 1.774q-.074.352-.075.726a3.5 3.5 0 1 0 6.965-.5h6.07q-.035.245-.035.5a3.5 3.5 0 1 0 6.965-.5H23a1 1 0 0 0 1-1v-3a1 1 0 0 0-.106-.447l-2-4A1 1 0 0 0 21 8h-2V5a2 2 0 0 0-2-2zm17.95 12H22v-1.764L20.382 10H19v4.337c.353.168.674.393.95.663M17 14.035V5H2v10.05A3.5 3.5 0 0 1 4.5 14c.954 0 1.818.381 2.45 1H15v.05a3.5 3.5 0 0 1 2-1.015M4.5 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M16 17.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>Track orders easily</div>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="none"
                viewBox="0 0 24 24"
                data-testid="svg_IconOneAccount"
              >
                <path
                  fill="#191A1B"
                  d="M8.545 17.375a.246.246 0 0 1-.237-.237V8.725c0-.125.112-.225.237-.225h.188c.087 0 .15.025.212.088l5.1 5.437h.025V8.863c0-.125.1-.238.238-.238h1.15c.125 0 .237.113.237.238v8.412c0 .125-.112.225-.237.225h-.175a.27.27 0 0 1-.213-.087l-5.125-5.65H9.92v5.375c0 .125-.1.237-.237.237z"
                ></path>
                <path
                  fill="#191A1B"
                  fillRule="evenodd"
                  d="M12 3a8 8 0 0 1 7.814 6.28A6 6 0 0 1 18 21H6A6 6 0 0 1 4.186 9.28 8 8 0 0 1 12 3m-7.21 8.186a2 2 0 0 0 1.35-1.479 6.003 6.003 0 0 1 11.72 0 2 2 0 0 0 1.35 1.479A4 4 0 0 1 18 19H6a4 4 0 0 1-1.21-7.814"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>Use one sign-in across our brands</div>
            </div>
          </div>
          <p>
            Required<span className="text-red-600">*</span>
          </p>
          <div>
            <p className="font-bold">Email</p>
            <div className="flex justify-between">
              <p>{user.email}</p>
              <p
                onClick={() => setStep("find-by-mail")}
                className="text-blue-500 text-lg hover:underline cursor-pointer"
              >
                Edit
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              First name<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              placeholder=" "
              className="p-2 border-2"
              value={user.firstname}
              onChange={(e) =>
                setuser((prev) => ({ ...prev, firstname: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              Last name<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              placeholder=" "
              className="p-2 border-2"
              value={user.lastname}
              onChange={(e) =>
                setuser((prev) => ({ ...prev, lastname: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <p className="font-bold">
              Password<span className="text-red-600">*</span>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              className="p-2 border-2"
              value={user.password}
              onChange={(e) =>
                setuser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <p
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 bottom-3 text-lg  text-blue-500 underline cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </p>
          </div>

          <p>
            By creating an account, you agree to our{" "}
            <a href="" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>
            .
          </p>
          <button
            type="submit"
            className="flex justify-center items-center text-xl  gap-2 bg-blue-500 text-white font-bold py-3 w-full"
          >
            {isLoading && <CircularProgress color="white" />}
            <p>{isLoading ? "Loading..." : "Create Account"}</p>
          </button>
        </form>
      ) : (
        <form
          onSubmit={
            (user.isExisting && user.password) ? handleSignIn : findUserByEmail
          }
        >
          <p className="text-3xl font-bold">Sign In | Create Account</p>
          {!user.isExisting && (
            <p className="text-lg text-slate-600">
              Enter your email to get started
            </p>
          )}
          <div>
            <p className="font-bold mb-2 text-lg">Email</p>
            {user.isExisting && user.email && (
              <div className="flex justify-between">
                <p>{user.email}</p>
                <p
                  onClick={() => setStep("find-by-mail")}
                  className="text-blue-500 text-lg hover:underline cursor-pointer"
                >
                  Edit
                </p>
              </div>
            )}
            {user.isExisting && user.email && (
              <p className="font-bold mb-2 text-lg">Password</p>
            )}
            <div className="relative">
              <input
                type={user.isExisting && !showPassword ? "password" : "text"}
                placeholder=" "
                value={user.isExisting ? user.password : user.email}
                onChange={(e) =>
                  setuser((prev) =>
                    user.isExisting
                      ? { ...prev, password: e.target.value }
                      : { ...prev, email: e.target.value }
                  )
                }
                className="border border-black w-full p-3"
                required
              />
              {user.isExisting && (
                <p
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 bottom-3 text-lg  text-blue-500 underline cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </p>
              )}
            </div>
          </div>
          <p>
            By tapping Next, you agree to our{" "}
            <a href="" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>
            .
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white  font-bold text-lg flex items-center justify-center gap-4"
          >
            {isLoading && <CircularProgress color="white" />}
            <p>
              {isLoading ? "Loading..." : user.isExisting ? "Sign In" : "Next"}
            </p>
          </button>
        </form>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarState.isOpen}
        onClose={closeSnackabr}
        autoHideDuration={4000}
      >
        <Alert
          severity={snackbarState.severity}
          sx={{ width: "100%", alignItems: "center" }}
        >
          {" "}
          <p className="text-xl">{snackbarState.message}</p>{" "}
        </Alert>
      </Snackbar>
    </main>
  );
}
