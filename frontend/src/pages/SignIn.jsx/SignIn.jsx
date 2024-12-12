import axios from "axios";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function SignIn() {
  const [user, setuser] = useState({
    email: null,
    password: null,
    isExisting: null,
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const findUserByEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/search-by-email`, {
        email: user.email,
      });
      if (response.status === 200) {
        setStep(2);
        setuser((prev) => ({ ...prev, isExisting: true }));
      }
      console.log(response);
      
    } catch (error) {
      if (error.response.status === 404) {
        setStep(3);
        setuser((prev) => ({ ...prev, isExisting: false }));
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="m-auto max-w-[500px] py-10 flex flex-col gap-6">
      <p className="text-3xl font-bold">Sign In | Create Account</p>
      <p className="text-lg text-slate-600">Enter your email to get started</p>

      <form onSubmit={findUserByEmail}>
        <div>
          <p className="font-bold mb-2 text-lg">Email</p>
          <input
            type="email"
            placeholder=" "
            onChange={(e) =>
              setuser((prev) => ({ ...prev, email: e.target.value }))
            }
            className="border border-black w-full py-2 pl-2"
            required
          />
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
        <button className="w-full py-3 bg-blue-500 text-white  font-bold text-lg flex items-center justify-center gap-4">
          {isLoading && <CircularProgress color="white" />}
          <p>Next</p>
        </button>
      </form>
    </main>
  );
}
