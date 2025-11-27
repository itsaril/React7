import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/items.css';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img 
          src={book.coverUrl} 
          alt={`Cover of ${book.title}`} 
          className="book-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = '/no-cover.png'; }}
        />
      </div>
      <div className="card-content">
        <h3>{book.title}</h3>
        <p className="card-author">By: {book.author}</p>
        <p className="card-description">{book.shortDescription}</p>

        <Link to={`/items/${book.id}`} className="card-link">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default BookCard;