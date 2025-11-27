import React from 'react';
import '../styles/components.css';

function ErrorBox({ message }) {
  return (
    <div className="error-box">
      <strong>Error:</strong> {message || 'An unexpected error occurred.'}
    </div>
  );
}

export default ErrorBox;