const CartIcon = ({ cartCount }) => {
  return (
    <div className="relative">
      <button className="text-dark-brown hover:opacity-80">
        🛒 {/* Replace with an icon library like Heroicons */}
      </button>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;