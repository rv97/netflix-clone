import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";
/*useState is a hook in react. The '[]' inside is the intial value*/
function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    /*The following code will be executed when the row loads.
        If [], run once when the row loads and don't run again. 
        If there is a variable in the [], then it will run whenever the variable chages.
        Here the fetchURL is being used because, if we are usinng any variable that is defined outside of useEffect,
        it needs to be included*/

    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id} // To reload only what has changed and not everything
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${BASE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
