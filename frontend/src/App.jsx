import "./App.css";
import PromoBanner from "./components/PromoBanner";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import CategoryNavigationMenu from "./components/CategoryNavigationMenu";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn.jsx/SignIn";

function App() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <CategoryNavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
