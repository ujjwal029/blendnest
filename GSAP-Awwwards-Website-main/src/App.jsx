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
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SubscriptionPage from "./components/SubscriptionPage";
import LoginPage from "./components/LoginPage";
import { supabase } from "../lib/supabase";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Home = ({ cart, addToCart, session }) => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <main>
      <NavBar cartCount={cart.length} session={session} />
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
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Supabase auth state management (for NavBar only)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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

  // Simple loading screen
  if (loading) {
    return <div className="loading">Loading app...</div>;
  }

  return (
    <Routes>
      {/* Home - PUBLIC ACCESS */}
      <Route 
        path="/" 
        element={<Home cart={cart} addToCart={addToCart} session={session} />}
      />
      
      {/* Subscribe - PUBLIC ACCESS */}
      <Route
        path="/subscribe"
        element={<SubscriptionWrapper />}
      />
      
      {/* Login - PUBLIC ACCESS */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

function SubscriptionWrapper() {
  const location = useLocation();
  const state = location.state || {};
  const search = new URLSearchParams(location.search);
  const productId = state.productId || search.get('productId');
  const basePriceRaw = state.basePrice ?? search.get('basePrice');
  const basePrice = basePriceRaw ? Number(basePriceRaw) : undefined;

  if (!productId || basePrice === undefined || Number.isNaN(basePrice)) {
    return <Navigate to="/" replace />;
  }

  return <SubscriptionPage productId={productId} basePrice={basePrice} />;
}

export default App;
