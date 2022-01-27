import React, { useState, useEffect, Fragment } from 'react';
import { getMovies } from '../../requests/requests';
import './row.css';
import YouTube from 'react-youtube';
import opts from '../../utils/youtubeOptions';
import movieTrailer from 'movie-trailer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import settings from '../../utils/sliderSettings';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const base_url = 'https://image.tmdb.org/t/p/w500';
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [mouseOver, setMouseOver] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await getMovies(fetchUrl);
            setMovies(res.data.results);
        }
        fetchData(fetchUrl);
    }, [fetchUrl]);

    //This code fixes issue with onClick executing while dragging movies.
    let drag = false;
    document.addEventListener('mousedown', () => (drag = false));
    document.addEventListener('mousemove', () => (drag = true));

    const handleClick = async (movie) => {
        if (!drag) {
            if (trailerUrl) {
                setTrailerUrl('');
            } else {
                try {
                    let res = await movieTrailer(null, {
                        tmdbId: movie.id,
                        id: true,
                    });
                    if (res === null) {
                        res = await movieTrailer(
                            movie?.name || movie?.title || movie?.original_name,
                            {
                                id: true,
                            }
                        );
                    }
                    setTrailerUrl(res);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    return (
        <div className="slider-wrapper">
            <h2>{title}</h2>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div className="slick-slide section" key={movie.id}>
                        <img
                            className={`slick-slide-image ${
                                mouseOver && 'slick-slide-image-margin'
                            }`}
                            src={`${base_url}${
                                isLargeRow
                                    ? movie.poster_path
                                    : movie.backdrop_path
                            }`}
                            onClick={() => handleClick(movie, drag)}
                            onMouseOver={() => {
                                setMouseOver(!mouseOver);
                            }}
                            onMouseOut={() => {
                                setMouseOver(!mouseOver);
                            }}
                            alt={''}
                        />
                    </div>
                ))}
            </Slider>
            <div className={trailerUrl ? 'you-tube' : 'you-tube-hidden'}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    );
};

export default Row;
