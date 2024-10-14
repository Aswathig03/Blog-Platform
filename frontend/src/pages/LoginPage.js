import axios from 'axios';
import { useState } from 'react';
import './LoginPage.css'; // Ensure this is imported
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log('Logging in with:', userData);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', userData);
      console.log('Login successful:', response.data);
      localStorage.setItem('email', email);
      console.log('Email from localStorage:', email);
      navigate('/posts'); // Navigate to posts page after successful login
    } catch (error) {
      console.error('Login failed:', error);

      // Safely check for error response
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Display backend error message
      } else {
        setError('Network error, please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      {/* Quotes section */}
      <div className="quotes-section">
        <p>"Blogs are a great place to express your opinions, thoughts, and passions." - Aswathi</p>
      </div>
    </div>
  );
};

export default LoginPage;