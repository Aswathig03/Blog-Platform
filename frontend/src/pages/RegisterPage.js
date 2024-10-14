// RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar'; // Adjust the path accordingly
import './RegisterPage.css'; // Import CSS for the registration page

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      // Make the API call to the backend for registration
      const response = await axios.post('http://localhost:5000/api/users/register', userData);

      // Check if the registration response is successful
      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      alert(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="register-container">
      <Navbar /> {/* Add Navbar here */}
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
