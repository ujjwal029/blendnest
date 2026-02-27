import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import AddToCartButton from "./AddToCartButton";
import { useNavigate } from "react-router-dom";

const FlavorSlider = ({ addToCart }) => {
  const sliderRef = useRef();
  const containerRef = useRef(); // ✅ Added missing container ref
  const navigate = useNavigate();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    if (!sliderRef.current || !containerRef.current) return; // ✅ Added null check

    // Calculate the actual scrollable distance: total content width minus visible width
    const scrollAmount = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

    if (!isTablet && scrollAmount > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // ✅ Use containerRef instead of string
          start: "2% top",
          end: `+=${scrollAmount}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(sliderRef.current, { // ✅ Use ref instead of selector
        x: `-${scrollAmount}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // ✅ Use containerRef instead of string
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-scroll", // ✅ Fixed selector to match HTML
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  const handleBuyNow = (flavor) => {
    const query = `?productId=${encodeURIComponent(flavor.name)}&basePrice=${encodeURIComponent(
      String(flavor.price)
    )}`;
    navigate(`/subscribe${query}`, { state: { productId: flavor.name, basePrice: flavor.price } });
  };

  return (
    <section ref={containerRef} className="flavor-section"> {/* ✅ Added ref & section wrapper */}
      <div ref={sliderRef} className="slider-wrapper">
        <div className="flavors">
          {flavorlists.map((flavor) => (
            <div
              key={flavor.name} // ✅ Fixed key prop
              className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
            >
              <img
                src={`/images/${flavor.color}-bg.svg`}
                alt=""
                className="absolute bottom-0"
                aria-hidden="true" // ✅ Added accessibility
              />

              <img
                src={`/images/${flavor.color}-drink.webp`}
                alt={`${flavor.name} juice`} // ✅ Proper alt text
                className="drinks"
              />

              <img
                src={`/images/${flavor.color}-elements.webp`}
                alt=""
                className="elements"
                aria-hidden="true" // ✅ Added accessibility
              />

              <h1 title={flavor.name} className="truncate max-w-[60%]">
                {flavor.name}
              </h1>
              <div className="flex gap-3 items-center">
                <AddToCartButton flavor={flavor} />
                <button
                  onClick={() => handleBuyNow(flavor)} // ✅ Extracted to handler
                  className="mt-4 px-6 py-2 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
          <div className="coming-soon-card relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none md:rotate-[-8deg] rotate-0 flex flex-col items-center justify-center gap-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#e8f5e0] to-[#c8e6c9] border-2 border-[#7cb342] shadow-[0_0_40px_rgba(124,179,66,0.3)]">
            <span className="text-6xl md:text-8xl opacity-40 animate-pulse">?</span>
            <p className="font-paragraph text-dark-brown text-lg md:text-xl font-semibold uppercase tracking-widest">
              More Flavors
            </p>
            <p className="font-paragraph text-dark-brown/80 text-base md:text-lg animate-pulse">
              Coming Soon...
            </p>
            <p className="font-paragraph text-dark-brown/60 text-sm md:text-base italic">
              Something delicious is brewing
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Added missing parallax text */}
      <div className="flavor-text-overlay">
        <h1 className="first-text-split">Discover</h1>
        <h2 className="flavor-text-scroll">Our Flavors</h2>
        <h3 className="second-text-scroll">Pure Freshness</h3>
      </div>
    </section>
  );
};

export default FlavorSlider;
