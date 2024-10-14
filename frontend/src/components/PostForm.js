import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Ensure Navbar is imported
import { useNavigate } from 'react-router-dom';
const PostForm = ({ existingPost }) => {
  const [title, setTitle] = useState(existingPost ? existingPost.title : '');
  const [content, setContent] = useState(existingPost ? existingPost.content : '');
  const [author, setAuthor] = useState(existingPost ? existingPost.author : '');
  const [image, setImage] = useState(null); // Store the selected image
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Function to handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set image file
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('email');
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('author', author);
    postData.append('email', email);

    if (image) {
      postData.append('image', image);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts/create-post',
        postData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Post saved:', response.data);
      navigate('/posts');
      // You can navigate or show a success message here
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error.response ? error.response.data : 'Failed to save post. Please try again.');
    }
  };

  return (
    <div>
      <Navbar /> {/* Adding Navbar component */}
      <form onSubmit={handleSubmit}>
        <h2>{existingPost ? 'Edit Post' : 'Create a New Post'}</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{existingPost ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default PostForm;
