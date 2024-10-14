const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  const { title, content, author, email } = req.body; // Retrieve email
  const image = req.file ? req.file.path : null; // Handle image if uploaded
  try {
    const newPost = new Post({
      title,
      content,
      author,
      email, // Save email to the database
      image,
      createdAt: Date.now(), // Add the current date and time
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Server Error');
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from MongoDB
    res.json(posts); // Return the posts in JSON format
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
};

// Get posts by email
exports.getPostsByEmail = async (req, res) => {
  const { email } = req.params;
  console.log('Fetching posts for email:', email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const emailPosts = await Post.find({ email });
    console.log('Posts found:', emailPosts);
    res.json(emailPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  // If a new image is uploaded, handle it
  const image = req.file ? req.file.path : undefined; // Store the file name or path

  const updatedFields = { title, content };
  
  // Add image only if it's updated
  if (image) {
    updatedFields.image = image;
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

