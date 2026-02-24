import { useState } from "react";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#flavor", label: "Flavors" },
  { href: "#nutrition", label: "Nutrition" },
  { href: "#benefits", label: "Benefits" },
  { href: "#contact", label: "Contact" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 md:px-9 md:py-6 px-4 py-3 flex justify-between items-center">
      <a href="#" className="text-dark-brown font-bold md:text-2xl text-xl tracking-tight uppercase">
        Blendnest
      </a>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 p-2 -mr-2 text-dark-brown hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-dark-brown/30 rounded"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-dark-brown origin-center transition-all duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-dark-brown transition-all duration-200 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-dark-brown origin-center transition-all duration-200 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div className="absolute right-0 top-full mt-2 py-3 min-w-[180px] bg-milk rounded-lg shadow-lg border border-[#c8e6c9] z-50">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-6 py-2.5 font-paragraph text-dark-brown hover:bg-[#e8f5e0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
