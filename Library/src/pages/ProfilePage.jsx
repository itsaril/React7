import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'; 

function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };

  if (!currentUser) {
    return <h1>Loading Profile...</h1>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p>Welcome, <strong>{currentUser.email}</strong>!</p>
      
      <div className="profile-details">
        <h2>Account Details</h2>
        <ul>
          <li><strong>Email:</strong> {currentUser.email}</li>
          <li><strong>User ID:</strong> {currentUser.uid}</li>
          <li><strong>Creation Time:</strong> {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</li>
          <li><strong>Last Sign-in Time:</strong> {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()}</li>
        </ul>
      </div>

      <button onClick={handleLogout} className="auth-button logout-profile">
        Logout from Account
      </button>
    </div>
  );
}

export default ProfilePage;