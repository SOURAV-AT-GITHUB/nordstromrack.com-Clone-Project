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

function App() {
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
