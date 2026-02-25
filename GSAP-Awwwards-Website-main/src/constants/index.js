const flavorlists = [
  {
    name: "Tropical Tango",
    color: "orange",
    rotation: "md:rotate-[-8deg] rotate-0",
    price: 9.99,
  },
  {
    name: "Mixed Fruit",
    color: "red",
    rotation: "md:rotate-[8deg] rotate-0",
    price: 11.99,
  },
];

const nutrientLists = [
  { label: "Antioxidants", amount: "Natural" },
  { label: "No Added Sugar", amount: "✓" },
  { label: "Citrus Oils", amount: "Pure" },
];

// Portrait: 3 columns
const portraitNutrients = nutrientLists.slice(0, 3);

// Landscape: 5 columns (+ Vegan, All Natural)
const landscapeNutrients = [
  ...portraitNutrients,
  { label: "Vegan", amount: "✓" },
  { label: "All Natural", amount: "✓" },
];

const cards = [
  {
    src: "/videos/f1.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Madison",
    img: "/images/p1.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f2.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Alexander",
    img: "/images/p2.png",
  },
  {
    src: "/videos/f3.mp4",
    rotation: "rotate-z-[-4deg]",
    name: "Andrew",
    img: "/images/p3.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f4.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Bryan",
    img: "/images/p4.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f5.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Chris",
    img: "/images/p5.png",
  },
  {
    src: "/videos/f6.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Devante",
    img: "/images/p6.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f7.mp4",
    rotation: "rotate-z-[-3deg]",
    name: "Melisa",
    img: "/images/p7.png",
    translation: "translate-y-[10%]",
  },
];

export { flavorlists, nutrientLists, portraitNutrients, landscapeNutrients, cards };
