import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComicList from './ComicList';
import { fetchComic } from './API';
import ComicDetails from './ComicDetails'; 
import './App.css';

function HomePage() {
  const [comics, setComics] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function getComics() {
      if (!query.trim()) return;

      try {
        const data = await fetchComic(query);
        setComics(data.data.results);
      } catch (err) {
        console.error('failed to find Comics', err);
      }
    }

    getComics();
  }, [query]);

  return (
    <div className='app'>
      <h1>Marvel Comic Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Type a comic book name'
      />
      <ComicList comics={comics} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/comic/:id' element={<ComicDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
