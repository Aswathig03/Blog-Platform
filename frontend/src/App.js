import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
//import Header from './components/Header';
import CreatePostPage from './pages/CreatePostPage';
//import Navbar from './components/Navbar';
import ResetPassword from './pages/ResetPassword'; 
import Posts from './pages/Posts';
import EditPost from './pages/EditPost';

function App() {
  return (
    <Router>
      {/* <Header /> */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/edit-post/:postId" element={<EditPost/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
