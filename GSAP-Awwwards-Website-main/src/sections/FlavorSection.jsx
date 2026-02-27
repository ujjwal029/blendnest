import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";
import { useRef } from "react";

const FlavorSection = ({ addToCart }) => {
  const sectionRef = useRef(null);

  return (
    <section 
      id="flavor" 
      ref={sectionRef}
      className="flavor-section min-h-screen py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background elements for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-lime-50/50" />
      
      <div className="h-full flex lg:flex-row flex-col items-center relative container mx-auto px-4">
        {/* Flavor Title - Left side */}
        <div className="lg:w-[55%] xl:w-[57%] flex-none lg:h-screen h-96 lg:h-full md:mt-20 xl:mt-0 order-1 lg:order-1">
          <FlavorTitle />
        </div>
        
        {/* Flavor Slider - Right side */}
        <div className="lg:w-[45%] flex-1 h-full order-2 lg:order-2">
          <FlavorSlider 
            addToCart={addToCart}
            sectionRef={sectionRef} // ✅ Pass ref to slider for GSAP
          />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
