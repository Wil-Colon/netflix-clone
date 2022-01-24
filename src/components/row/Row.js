import React, { useState, useEffect } from 'react';
import { getMovies } from '../../requests/requests';
import './row.css';
import YouTube from 'react-youtube';
import opts from '../../utils/youtubeOptions';
import movieTrailer from 'movie-trailer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    let windowWidth = window.innerWidth;

    const base_url = 'https://image.tmdb.org/t/p/w500';
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [mouseOver, setMouseOver] = useState(false);
    // const [sliderSettings, setSliderSettings] = useState({
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 7,
    //     slidesToScroll: 5,
    // });

    function debounce(fn, ms) {
        let timer;
        return (_) => {
            clearTimeout(timer);
            timer = setTimeout((_) => {
                timer = null;
                fn.apply(this, arguments);
            }, ms);
        };
    }

    // useEffect(() => {
    //     slides = windowWidth > 900 ? 6 : 3;
    //     const debouncedHandleResize = debounce(function handleResize() {
    //         setSliderSettings({ ...sliderSettings, slidesToShow: slides });
    //     }, 0);

    //     window.addEventListener('resize', debouncedHandleResize);

    //     return (_) => {
    //         window.removeEventListener('resize', debouncedHandleResize);
    //     };
    // });

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            windowWidth = window.innerWidth;
        }, 100);

        window.addEventListener('resize', debouncedHandleResize);

        return (_) => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    });

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

            <Slider {...sliderSettings}>
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

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;
