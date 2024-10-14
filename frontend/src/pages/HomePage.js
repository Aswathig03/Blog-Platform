import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom'; // Import Link for navigation
import './HomePage.css'; // Import the CSS file
import Navbar from '../components/Navbar';
const HomePage = () => {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        console.log('Response data:', response.data); 
        // Check if the response data is an array before setting the state
        if (Array.isArray(response.data)) {
          setPosts(response.data); // Set posts if valid
        } else {
          throw new Error('Invalid posts data');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>; // Loading message
  if (error) return <p>{error}</p>; // Error message

  return (
    <div className="homepage">
      <Navbar/>
      <br/><br/><p>          </p><br/><p style={{ fontFamily: 'Copperplate', fontStyle: 'italic'}}>Welcome to our blog platform! Here, you can explore a variety of blogs created by our community of users.<br/> <p align="center">Each post reflects unique perspectives and experiences, showcasing the creativity and insights.</p><p align="center">Enjoy reading!</p></p>
      {/* <h1>All Posts</h1> */}
      {posts.length === 0 ? (
        <p>No posts available</p> // Message if no posts are available
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post._id} className="post-box">
              <h2>{post.title}</h2>
              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt={post.title}
                  className="post-image"
                />
              )}
              <p>{post.content}</p>
              <p><strong>Author:</strong> {post.author || 'Unknown'}</p>
              <p>
                <strong>Date:</strong> 
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date not available'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
