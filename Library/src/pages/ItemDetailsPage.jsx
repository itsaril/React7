import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchItemById } from '../features/items/itemsSlice'; 
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import '../styles/items.css';

function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    selectedItem, 
    loadingItem: loading, 
    errorItem: error 
  } = useSelector((state) => state.items);

  useEffect(() => {
    if (!id) {
        return; 
    }
    
    dispatch(fetchItemById(id));
    
  }, [id, dispatch]); 

  if (loading) {
    return (
        <div className="items-details-page">
            <Spinner />
        </div>
    );
  }

  const isNotFound = error && error.includes('404');
  
  if (isNotFound || (error && !selectedItem)) {
      return (
          <div className="items-details-page">
              <ErrorBox 
                message={
                  isNotFound 
                    ? `Book with ID "${id}" was not found (404).` 
                    : `Error loading details: ${error}`
                } 
              />
              <button onClick={() => navigate('/items')} className="back-button">
                  ← Back to List
              </button>
          </div>
      );
  }

  if (!selectedItem) {
      return (
          <div className="items-details-page">
             <ErrorBox message="Could not load book details. Please try again." />
          </div>
      ); 
  }
  const {
    title,
    key,
    description,
    firstPublishDate,
    subjectGenres,
    subjectPlaces,
    revision,
    latestRevisionDate,
    coverUrl
  } = selectedItem;

  return (
    <div className="items-details-page">
      <button onClick={() => navigate('/items')} className="back-button">
          ← Back to Book List
      </button>
      
      <div className="book-details-container">
        <h1>Details: {title}</h1>
        
        <div className="details-content-wrapper">
            <div className="details-image-container">
                <img 
                    src={coverUrl} 
                    alt={`Cover of ${title}`} 
                    className="details-cover-image" 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/no-cover-large.png'; }}
                />
            </div>
            
            <div className="details-info">
                <h2>Book Specifications</h2>
                <ul className="details-list">
                    <li><strong>1. Title:</strong> {title}</li>
                    <li><strong>2. OpenLibrary Key:</strong> <code className="key-code">{key}</code></li>
                    <li><strong>3. Author:</strong> N/A (Requires extra fetch from OL API)</li> 
                    <li><strong>4. First Publish Date:</strong> {firstPublishDate}</li>
                    <li><strong>5. Main Subject/Category:</strong> {subjectGenres || 'N/A'}</li>
                    <li><strong>6. Subject Places:</strong> {subjectPlaces || 'N/A'}</li>
                    <li><strong>7. Revision Count:</strong> {revision}</li>
                    <li><strong>8. Last Updated:</strong> {latestRevisionDate}</li>
                </ul>
                
                <h3>Description</h3>
                <p>{description}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
