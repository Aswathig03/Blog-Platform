const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createPost, getPosts, getPostsByEmail, updatePost, deletePost } = require('../controllers/postController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// GET all posts
router.get('/', getPosts);

// Get posts by email
router.get('/:email', getPostsByEmail);

// Create Post
router.post('/create-post', upload.single('image'), createPost);

// Update Post
router.put('/:id', upload.single('image'), updatePost);

// Delete Post
router.delete('/:id', deletePost); // Add delete route

module.exports = router;

