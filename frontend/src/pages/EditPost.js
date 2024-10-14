import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { postId } = useParams(); // Get postId from URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // Handle image as a file
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setImage(post.image); // Only set if you're using image URLs
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create formData to hold data
    formData.append('title', title);
    formData.append('content', content);
    
    // Append the image file only if a new one is selected
    if (image instanceof File) {
      formData.append('image', image); // Only append if image is selected/uploaded
    }

    try {
      // Update the post using FormData (multipart/form-data)
      await axios.put(`http://localhost:5000/api/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
      navigate('/posts'); // Redirect back to posts after update
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {/* Optional image upload */}
        <div>
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
