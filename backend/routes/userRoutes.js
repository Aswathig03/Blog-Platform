const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {login, register,forgotPassword,resetPassword} = require('../controllers/userController');
const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'aswathi123';

// Register a new user
router.post('/register', register);

// Login route
router.post('/login', login);

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password/:token', resetPassword);

module.exports = router;
