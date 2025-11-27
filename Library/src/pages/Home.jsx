import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Discover Your Next Great Read</h1>
        <p className="description">
          Welcome to Literary Hub—your digital library. 
          Search, discover, and read details about millions of books from around the world using OpenLibrary's extensive data. 
          Start your literary journey.
        </p>
      </header>
      
      <div className="home-image-container">
        <img 
          src="https://avatars.mds.yandex.net/i?id=4e0c50076352b5bb43ffd31e0c6c7cec_l-4824750-images-thumbs&n=13" 
          alt="A large, beautifully lit library" 
          className="library-image" 
        />
      </div>

      <section className="home-links-section">
        <h2>Start Researching</h2>
        <div className="links-group">
          <Link to="/items" className="home-link-button">
            Browse Catalog
          </Link>
          <Link to="/about" className="home-link-button">
            Project Info
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;