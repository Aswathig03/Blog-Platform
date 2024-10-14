import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/create-edit-post">Create or Edit Post</Link></li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
