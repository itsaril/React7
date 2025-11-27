import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import ErrorBox from '../components/ErrorBox';
import '../styles/auth.css'; 

function LoginPage() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        let msg = "Failed to login. Please check your credentials.";
        if (error.code === 'auth/invalid-credential') {
             msg = "Invalid email or password.";
        } else if (error.code === 'auth/user-disabled') {
             msg = "This user account has been disabled.";
        }
        setErrorMessage(msg);
        setIsSigningIn(false); 
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to={'/profile'} replace={true} />; 
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>

        {errorMessage && <ErrorBox message={errorMessage} />}

        <button 
          type="submit" 
          disabled={isSigningIn}
          className="auth-button"
        >
          {isSigningIn ? 'Signing In...' : 'Login'}
        </button>

        <p className="auth-link-text">
          Don't have an account? {' '}
          <Link to={'/signup'} className="link-primary">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;