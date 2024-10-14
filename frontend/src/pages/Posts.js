import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HomePage.css'; // Import the CSS file
import PostsNavbar from '../components/PostsNavbar'; // Ensure this points to your Navbar component

const Posts = () => {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Hook to navigate to edit page

  useEffect(() => {
    const fetchPosts = async () => {
      const email = localStorage.getItem('email'); // Get the email from localStorage
  
      if (!email) {
          setError('User not logged in.');
          setLoading(false);
          return;
      }
  
      try {
          const response = await axios.get(`http://localhost:5000/api/posts/${email}`);
          if (Array.isArray(response.data)) {
              setPosts(response.data);
          } else {
              throw new Error('Invalid posts data');
          }
      } catch (error) {
          setError('Failed to fetch posts');
      } finally {
          setLoading(false);
      }
    };
    fetchPosts(); // Call the async function
  }, []);

  // Handle Edit button click
  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  // Handle Delete button click
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${postId.trim()}`);
        setPosts(posts.filter(post => post._id !== postId)); // Remove the deleted post
        alert('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
        setError('Failed to delete post');
      }
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="postpage">
      <PostsNavbar />
      {/* <h1>Your Posts</h1> */}
      {posts.length === 0 ? (
        <p>No posts available! Posts that you create will show up here</p>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post._id} className="post-box">
              <h2>{post.title}</h2>
              {post.image && (
                <img src={`http://localhost:5000/${post.image}`} 
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
              {/* Edit and Delete buttons */}
              <button onClick={() => handleEdit(post._id)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(post._id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
