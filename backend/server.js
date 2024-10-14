const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Use CORS to allow requests from your React app
app.use(cors({
    origin: 'http://localhost:3000', // Your React app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow cookies to be sent
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
//app.use('/api/users/login',userRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/Blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Anything that doesn't match the API routes should be directed to the React frontend
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

