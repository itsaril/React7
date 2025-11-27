import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import ErrorBox from '../components/ErrorBox';
import '../styles/auth.css'; 

function SignupPage() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      setErrorMessage('');
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        let msg = "Failed to register.";
        if (error.code === 'auth/email-already-in-use') {
             msg = "This email address is already in use.";
        } else if (error.code === 'auth/weak-password') {
             msg = "Password should be at least 6 characters.";
        }
        setErrorMessage(msg);
        setIsRegistering(false); 
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to={'/profile'} replace={true} />;
  }

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
          />
        </div>

        {errorMessage && <ErrorBox message={errorMessage} />}

        <button 
          type="submit" 
          disabled={isRegistering}
          className="auth-button"
        >
          {isRegistering ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="auth-link-text">
          Already have an account? {' '}
          <Link to={'/login'} className="link-primary">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;