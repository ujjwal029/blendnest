import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const handleLogin = () => {


    
    // Placeholder: Open modal, redirect, or integrate auth
    navigate("/login");

  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-dark-brown text-milk rounded-lg hover:opacity-80 transition-opacity"
    >
      Login
    </button>
  );
};

export default LoginButton;