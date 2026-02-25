import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ flavor }) => {
  const navigate = useNavigate();

  const handleNavigateToSubscription = () => {
    const query = `?productId=${encodeURIComponent(flavor.name)}&basePrice=${encodeURIComponent(
      String(flavor.price)
    )}`;
    navigate(`/subscribe${query}`, { state: { productId: flavor.name, basePrice: flavor.price } });
  };

  return (
    <button
      onClick={handleNavigateToSubscription}
      className="mt-4 px-6 py-2 bg-[#7cb342] text-milk rounded-lg hover:bg-[#5a8f2a] transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;