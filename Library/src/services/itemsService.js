const BASE_URL_SEARCH = 'https://openlibrary.org/search.json';
const BASE_URL_WORKS = 'https://openlibrary.org/works/';

function mapBookData(doc) {

  const idMatch = doc.key.match(/\/works\/(.+)/);
  const id = idMatch ? idMatch[1] : doc.key.replace(/\//g, '');
  const coverId = doc.cover_i;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
    : '/no-cover.png'; 

  const title = doc.title || 'No Title Available';
  const author = Array.isArray(doc.author_name) 
    ? doc.author_name[0] 
    : 'Unknown Author';

  const shortDescription = doc.subject 
    ? `Topics: ${doc.subject.slice(0, 3).join(', ')}`
    : `Editions: ${doc.edition_count || 'N/A'}`;

  return {
    id: id,             
    key: doc.key,       
    title: title,
    author: author,
    coverUrl: coverUrl,
    shortDescription: shortDescription,
  };
}

async function getAll(query = '') {
  const url = `${BASE_URL_SEARCH}?q=${encodeURIComponent(query)}&limit=20`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const books = data.docs
        .filter(doc => doc.key && doc.key.startsWith('/works/'))
        .map(mapBookData);

    return books;
  } catch (error) {
    console.error('Error fetching book list:', error);
    throw new Error('Failed to load books. Please check your network connection.');
  }
}


async function getById(key) {
    const url = `${BASE_URL_WORKS}${encodeURIComponent(key)}.json`;

    try {
        const response = await fetch(url);

        if (response.status === 404) {
             throw new Error("Book not found (404)");
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const description = data.description 
          ? (typeof data.description === 'string' ? data.description : data.description.value) 
          : 'No description available.';

        const coverUrl = data.covers && data.covers.length > 0 
            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` 
            : '/no-cover-large.png'; 

        const details = {
            id: key,
            title: data.title || 'No Title Available',
            key: data.key || 'N/A',
            description: description,
            firstPublishDate: data.first_publish_date || 'N/A',
            subjectPlaces: data.subject_places ? data.subject_places.slice(0, 5).join(', ') : 'N/A',
            subjectGenres: data.subject_key ? data.subject_key.slice(0, 5).join(', ') : 'N/A',
            coverUrl: coverUrl,
            revision: data.revision || 0,
            latestRevisionDate: data.latest_revision || 'N/A'
        };
        
        return details;

    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error;
    }
}

export const itemsService = {
  getAll,
  getById,
};