import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/About";
import Product from "../pages/dynamicPages/Product";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}
