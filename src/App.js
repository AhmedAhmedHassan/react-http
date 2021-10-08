import React,{useState,useCallback,useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setMovies]=useState([])
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState(null)

  const moviesHandler = useCallback(async ()=>{
    setLoading(true) 
    try{
     const response= await fetch('https://swapi.dev/api/films/')
     if(!response.ok){
       throw new Error('Something went wrong')
     }
     const data=await response.json()
        const transformData= data.results.map(item=>{
          return{
          id:item.episode_id,
          title:item.title,
          releaseDate:item.release_date,
          openingText:item.opening_crawl
          }
        })
        setMovies(transformData)
    }
    catch(error){
      setError(error.message)
    }
    setLoading(false)
  },[])
  

useEffect(() => {
   moviesHandler()
}, [moviesHandler])


let content=<p>No Data Was Found Yet</p>

if (movies.length > 0){
 content= <MoviesList movies={movies} />
}

if(error){
  content= <p>{error}</p>
}

if(loading){
  content = <p>Loading....</p>
}

  return (
    <React.Fragment>
      <section>
        <button onClick={moviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
