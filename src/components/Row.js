import React, { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/Row.css";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovieData = useCallback(async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    console.log(movie)
  }

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider_arrow_left">
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row_posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                className="row_poster"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => handleClick(movie)}
              />
            );
          })}
        </div>
        <div className="slider_arrow_right">
          <span className="arrow">{">"}</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
