import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3001/api/login' : 'http://localhost:3001/api/signup';
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, age: parseInt(formData.age), email: formData.email, password: formData.password };

    try {
      console.log('Sending request to:', url);
      console.log('Body:', body);
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log('Response status:', res.status);

      if (res.ok) {
        if (isLogin) {
          const { token } = await res.json();
          localStorage.setItem('token', token);
          console.log('Login successful, stored token');
          navigate('/');
        } else {
          alert('Signup successful! Please login.');
          setIsLogin(true);
          setFormData({ name: '', age: '', email: '', password: '' });
        }
      } else {
        const error = await res.json();
        alert(error.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to connect to server. Make sure the backend is running on http://localhost:3001');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-milk">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">{isLogin ? 'Login' : 'Signup'}</h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button type="submit" className="w-full bg-dark-brown text-milk py-2 rounded mb-4">
          {isLogin ? 'Login' : 'Signup'}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-dark-brown underline"
        >
          {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;