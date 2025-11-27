import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext'; 
import { doSignOut } from '../firebase/auth'; 
import '../styles/App.css';

function NavBar() {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth(); 

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand"> 📚 Library App </Link>
      <div className="nav-links">
        <Link to="/items" className="nav-link"> Book List </Link>
        <Link to="/about" className="nav-link"> About </Link>

        {userLoggedIn ? (
          <>
            <Link to="/profile" className="nav-link">
              {currentUser.email} 
            </Link>
            <button onClick={handleLogout} className="nav-link logout-button"> Logout </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link"> Login </Link>
            <Link to="/signup" className="nav-link"> Signup </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;