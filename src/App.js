import React,{useState,useCallback,useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  
  const [movies, setMovies]=useState([])
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState(null)

  // get data from the database
  const moviesHandler = useCallback(async ()=>{
    setLoading(true) 
    try{
     const response= await fetch('https://react-http-38c83-default-rtdb.firebaseio.com/movies.json')
     if(!response.ok){
       throw new Error('Something went wrong')
     }
     const data=await response.json()
     const loadedMovies=[]

     for(const key in data){
       loadedMovies.push({
         id:key,
         title:data[key].title,
         releaseDate:data[key].releaseDate,
         openingText:data[key].openingText
       })
     }
        
        setMovies(loadedMovies)
    }
    catch(error){
      setError(error.message)
    }
    setLoading(false)
  },[])
  

useEffect(() => {
   moviesHandler()
   
}, [moviesHandler])


// Send request to the firebase
async function addMovieHandler(movie) {
  setLoading(true) 
    try{
  const response= await fetch('https://react-http-38c83-default-rtdb.firebaseio.com/movies.json',{
    method:'POST',
    body:JSON.stringify(movie),
    headers:{
      'Content-Type':'application/json'
    }
  })

  if(!response.ok){
    throw new Error('Something went wrong')
  }

  const data=await response.json()

  console.log(data)
} catch(error){
  setError(error.message)
}
setLoading(false)
moviesHandler()
}


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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
