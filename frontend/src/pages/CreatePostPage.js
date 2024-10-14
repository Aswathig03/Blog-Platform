import React from 'react';
import PostForm from '../components/PostForm'; // Import the PostForm component

const CreatePostPage = () => {
  return (
    <div>
      <PostForm /> {/* Re-use PostForm component */}
    </div>
  );
};

export default CreatePostPage;
