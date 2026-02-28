import { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import CartIcon from "./CartIcon";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#flavor", label: "Flavors" },
  { href: "#nutrition", label: "Nutrition" },
  { href: "#benefits", label: "Benefits" },
  { href: "#contact", label: "Contact" },
];

const NavBar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 md:px-9 md:py-6 px-4 py-3 flex justify-between items-center bg-black/20 backdrop-blur-md">
      <a href="#hero" className="flex items-center gap-3 text-dark-brown font-bold md:text-2xl text-xl tracking-tight uppercase">
        <img  alt="Blendnest Naturals logo" className="w-9 h-9 object-contain" />
        <span className="hidden sm:inline-block">Blendnest Naturals</span>
        <span className="inline-block sm:hidden">Blendnest</span>
      </a>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <LoginButton />
          <CartIcon cartCount={cartCount} />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 p-2 -mr-2 text-dark-brown hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-dark-brown/30 rounded-md md:hidden" // Added md:hidden
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-dark-brown origin-center transition-all duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-dark-brown transition-all duration-200 ${isOpen ? "opacity-0" : "translate-y-0"}`} />
          <span className={`block w-6 h-0.5 bg-dark-brown origin-center transition-all duration-200 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20" // Added subtle backdrop
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div className="absolute right-4 top-full mt-2 py-4 min-w-[200px] bg-milk rounded-xl shadow-xl border border-[#c8e6c9] z-50 md:hidden animate-in slide-in-from-top-2 duration-200"> {/* Improved positioning, animation */}
              <div className="flex flex-col gap-3 px-6 py-3 border-b border-[#c8e6c9]">
                <LoginButton />
                <CartIcon cartCount={cartCount} />
              </div>
              <div className="pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-6 py-3 font-paragraph text-dark-brown hover:bg-[#e8f5e0] transition-colors first:pt-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
