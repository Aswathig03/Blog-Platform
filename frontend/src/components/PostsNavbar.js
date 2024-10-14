// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PostsNavbar.css'; // Import CSS for navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Blog</Link>
      </div>
      <div className="navbar-links">
        <Link to="/create-post">New Post</Link>
        <Link to="/login">Log Out</Link>
      </div>
    </nav>
  );
};
export default Navbar;
