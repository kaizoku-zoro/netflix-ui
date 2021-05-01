import React,{useEffect,useState} from 'react'
import axios from './axios'
import requests from './requests'
import "./Banner.css"
const base_url = "https://image.tmdb.org/t/p/original/"


function truncate(input) {
    if(typeof input === 'undefined'){
        return "";
    }
    if (input.length > 500) {
       return input.substring(0, 500) + '...';
    }
    return input;
 };
function Banner() {
    const [movie, setMovie] = useState([])
    useEffect(() => {
        async function fetchPoster(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*(request.data.results.length-1))
                ]
            )
        }
        fetchPoster();
    }, [])
    console.log(movie)

    return (
        <header className="banner" style={
            {
                backgroundSize: "cover",
                backgroundImage: `url(${base_url}${movie?.backdrop_path})`
            }
        }>
            <div className="banner_contents">
                <h1 className="banner_title">{movie?.title||movie?.name||movie?.original_name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_desc">
                    {truncate(movie?.overview)}
                </h1>
            </div>
            <div className="fadeBottom"></div>
        </header>
    )
}

export default Banner
