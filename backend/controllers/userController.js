const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // For generating JWT
const crypto = require('crypto'); // For hashing passwords

// JWT secret key (store this securely in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'aswathi123';
// AES configuration
const AES_SECRET_KEY = 'mySuperSecretKey1234567890123456'; // 256-bit key
const IV_LENGTH = 16; // For AES, this is always 16

const encryptPassword = (password) => {
    const iv = crypto.randomBytes(IV_LENGTH); // Generate a new IV for each password
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(AES_SECRET_KEY), iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Store IV with encrypted password
};

const decryptPassword = (encryptedPassword) => {
    const parts = encryptedPassword.split(':');
    const iv = Buffer.from(parts.shift(), 'hex'); // Extract the IV
    const encryptedText = Buffer.from(parts.join(':'), 'hex'); // Get the encrypted text

    if (iv.length !== 16) {
        throw new Error('Invalid IV length'); // Validate IV length
    }

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(AES_SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your Gmail address from .env
        pass: 'your-app-pasword', // Your password or App Password
    },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,  // Ensure this email is set in your .env file
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        if (error.response) {
            console.error(`Error sending email: ${error.response}`);
        } else if (error.code === 'ESOCKET') {
            console.error('Connection error: Check SMTP configuration or network settings.');
        } else {
            console.error('Unexpected error:', error);
        }
        throw new Error('Failed to send email'); // Ensure error is propagated
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate a reset token and expiration time
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Sending the reset email
        const emailText = `
            You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/reset-password/${resetToken}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.
        `;

        await sendEmail(email, 'Password Reset', emailText);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
      return res.status(400).json({ message: 'Password is required' });
  }

  try {
      const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // Encrypt the new password
      const encryptedPassword = encryptPassword(password);
      // Save the encrypted password to the user
      user.password = encryptedPassword;
      user.resetPasswordToken = undefined; // Clear the reset token
      user.resetPasswordExpires = undefined; // Clear the expiration
      await user.save();

      res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};


// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Decrypt the stored password
        const decryptedPassword = decryptPassword(user.password);

        if (password !== decryptedPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token (optional)
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Register function
const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encrypt the password with AES
        const encryptedPassword = encryptPassword(password);

        user = new User({ username, email, password: encryptedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the functions
module.exports = { login, register, resetPassword, forgotPassword};
