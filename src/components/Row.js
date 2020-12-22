import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const BASE_URL = "https://image.tmdb.org/t/p/original";
/*useState is a hook in react. The '[]' inside is the intial value*/
function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, settrailerURL] = useState("");

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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerURL) settrailerURL("");
    else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerURL(urlParams.get("v"));
        })
        .catch((error) => console.log(console.error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id} // To reload only what has changed and not everything
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${BASE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
