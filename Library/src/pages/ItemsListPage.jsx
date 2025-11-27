import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchItems } from '../features/items/itemsSlice'; 
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import '../styles/items.css';

function ItemsListPage() {
  const dispatch = useDispatch();
  const { 
    list: books, 
    loadingList: loading, 
    errorList: error, 
    query: currentReduxQuery 
  } = useSelector((state) => state.items);

  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('q') || ''; 
  
  const [searchTerm, setSearchTerm] = useState(urlQuery || currentReduxQuery); 

  useEffect(() => {
    const queryToFetch = urlQuery || currentReduxQuery;

    if (queryToFetch.trim() === '') {
        return; 
    }
    dispatch(fetchItems(queryToFetch));
    
  }, [urlQuery, dispatch, currentReduxQuery]); 

  const handleSearch = (e) => {
    e.preventDefault(); 
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
        setSearchParams({ q: trimmedTerm });
    } else {
        setSearchParams({}); 
    }
  };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const displayQuery = urlQuery || currentReduxQuery;

  return (
    <div className="items-list-page">
      <h1>Search Books</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="search"
          placeholder="e.g., harry potter, dune, react"
          value={searchTerm}
          onChange={handleInputChange} 
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>Search</button>
      </form>
      
      {loading && <Spinner />}
      
      {error && <ErrorBox message={error} />}
      
      {!loading && !error && (
        <div className='results-container'>
          <p className="search-info">
            Showing results for: **{displayQuery}** ({books.length} books found)
          </p>
          <div className="books-grid">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
                <p>No books found for. Try a different search term.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemsListPage;