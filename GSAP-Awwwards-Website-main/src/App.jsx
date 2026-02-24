import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Home = ({ cart, addToCart }) => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <main>
      <NavBar cartCount={cart.length} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavorSection addToCart={addToCart} />
          <NutritionSection />
          <BenefitSection />
          <TestimonialSection />
          <FooterSection />
        </div>
      </div>
    </main>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (flavor) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === flavor.name);
      if (existing) {
        return prev.map((item) =>
          item.name === flavor.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...flavor, quantity: 1 }];
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Home cart={cart} addToCart={addToCart} />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
