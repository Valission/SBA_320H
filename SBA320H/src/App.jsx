import { useState, useEffect } from 'react'
import './App.css'
import ComicList from './Comics.jsx'
import { fetchComic } from './API.js'

function App() {
  const [comics, setComics] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() =>{
    async function getComics() {
      try{
        const data = await fetchComic(query)
        setComics(data.data.results)
      } catch(err){
        console.error('failed to find Comics', err)
      }
    }

    getComics()
  },[query]);


  return (
    <>
     <div className='app'>
      <h1>Marvel Comic Search</h1>

      <input value={query} onChange={(e) => setQuery(e.target.value)}
      placeholder='Type a comic book name' />

      <ComicList comics={comics}/>
     </div>
    </>
  )
}

export default App
