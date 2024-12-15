import "./App.css";
import PromoBanner from "./components/PromoBanner";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import CategoryNavigationMenu from "./components/CategoryNavigationMenu";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn.jsx/SignIn";
import HomeRedirect from "./components/HomeRedirect";
import Cart from "./pages/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateCartData } from "./store/actions"
function App() {
  const authorization = useSelector((store) => store.authorization);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCartData(authorization.token, "get"));
  }, [dispatch, authorization]);
  return (
    <>
      <PromoBanner />
      <Navbar />
      <CategoryNavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
