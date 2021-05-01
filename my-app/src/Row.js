import React, { useState, useEffect } from 'react'
import axios from './axios'
import "./Row.css";
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
const base_url = "https://image.tmdb.org/t/p/original/"

const opts = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1,
    }
}
function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailer] = useState("");
    useEffect(() => {

        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl, { timeout: 5000 });
                setMovies(request.data.results);
            } catch (error) {
                console.error(error);
            }

            // console.log(request);
        }
        fetchData()


    }, [fetchUrl]);

    const handleClick = (movie) => {
        movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                const x = (urlParams.get('v'));
                if(trailerUrl){
                    setTrailer("");
                }
                else{
                    setTrailer(x);
                }
            }).catch(error => console.log(error))

    }

    return (
        <div>
        <div className="row">
            <h2>{title}</h2>
            <div className={`row_posters`}>
                {movies.map(movie => (
                    <img onClick={() => handleClick(movie)} key={movie.id} className={`${isLargeRow && "row_posterLarge"} row_poster`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}></img>
                ))}
            </div>
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
