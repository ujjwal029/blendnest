import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../LoginPage.module.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const url = isLogin ? 'http://localhost:3001/api/login' : 'http://localhost:3001/api/signup';
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : { 
          name: formData.name, 
          age: parseInt(formData.age), 
          email: formData.email, 
          password: formData.password 
        };

    try {
      console.log('Sending request to:', url);
      console.log('Body:', body);
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        if (isLogin) {
          const { token } = await res.json();
          localStorage.setItem('token', token);
          console.log('Login successful, stored token');
          navigate('/');
        } else {
          alert(' Signup successful! Please login to start BlendNest.');
          setIsLogin(true);
          setFormData({ name: '', age: '', email: '', password: '' });
        }
      } else {
        const error = await res.json();
        alert(error.error || 'Something went wrong 🍋');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to connect to server ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Animated juice blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />

      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}></div>
          <h1 className={styles.title}>BlendNest</h1>
          <p className={styles.subtitle}>
            {isLogin 
              ? 'Welcome back! Squeeze in.' 
              : 'Join the BlendNest revolution!'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <>
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="John "
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Age</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}></span>
                  <input
                    type="number"
                    name="age"
                    
                    value={formData.age}
                    onChange={handleChange}
                    className={styles.input}
                    min="18"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✉️</span>
              <input
                type="email"
                name="email"
                placeholder="h@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Squeezing...
              </>
            ) : (
              isLogin ? 'Login' : ' Create Account'
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className={styles.toggleSection}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={styles.toggleButton}
            disabled={isLoading}
          >
            {isLogin 
              ? 'New here? Create Account' 
              : 'Already juicing? Login'
            }
          </button>
        </div>

        {/* Trust badges */}
        <div className={styles.trustBadges}>
          <div className={styles.badges}>
            <span> Secure</span>
            <span>•</span>
            <span>⚡ Instant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

