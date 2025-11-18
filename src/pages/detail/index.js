import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

const DetailPage = () => {
  let { movieId } = useParams({});
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const response = await axios.get(`/movie/${movieId}`);
        setMovie(response.data);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMovieDetail();
  }, [movieId])
  
  if (!movie) return null;

  return (
    <section>
      <img className="modal_poster_img"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} alt={movie.title || movie.name} />
      <h1>{movie.title || movie.name}</h1>
      <p>{movie.overview}</p>
    </section>
  )
}

export default DetailPage