const AddToCartButton = ({ flavor, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(flavor);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 px-6 py-2 bg-[#7cb342] text-milk rounded-lg hover:bg-[#5a8f2a] transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;