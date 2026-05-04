import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import FlowerDetail from "./pages/FlowerDetail";
import LibraryCategory from "./pages/LibraryCategory";
import HowToUseLibrary from "./pages/HowToUseLibrary";
import AllPlantCollections from "./pages/AllPlantCollections";
import "./App.css";
export default function App() {
  return (
    <>
      <Navbar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-plant-collections" element={<AllPlantCollections />} />
          <Route path="/collections/:categorySlug" element={<LibraryCategory />} />
          <Route path="/collections/:categorySlug/:flowerSlug" element={<FlowerDetail />} />
          <Route path="/how-to-use-library" element={<HowToUseLibrary />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}