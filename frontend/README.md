# MERN Blogging Platform with Password Reset Functionality

This is a full-stack blogging platform built using the **MERN** stack (MongoDB, Express, React, and Node.js). The application allows users to register, log in, create, edit, delete blog posts, and reset their passwords via email.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Password Reset**: Users can reset their passwords via email by generating a secure reset token.
- **JWT Authentication**: Used for protecting routes and ensuring secure user sessions.
- **Image Upload**: Upload images along with blog posts.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer (Gmail) for sending password reset emails
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: AES encryption with a secret key

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or through MongoDB Atlas)
- **Gmail Account** (for sending reset password emails)

### Environment Variables

Create a `.env` file in the root of your project and set the following environment variables:

```bash
MONGODB_URI=mongodb://localhost:27017/myBlog
JWT_SECRET=yourjwtsecretkey
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
AES_SECRET=my_super_secret_key_32_characters
