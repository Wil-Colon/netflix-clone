import React, { useState, useEffect } from 'react';
import { getMovies } from '../../requests/requests';
import './row.css';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getMovies(fetchUrl);
            setMovies(res.data.results);
        }
        fetchData(fetchUrl);
    }, [fetchUrl]);

    const base_url = 'https://image.tmdb.org/t/p/w500';
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row_poster ${
                            isLargeRow && 'row_posterLarge'
                        }`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                    />
                ))}
            </div>

            {/* {container->posters} */}
        </div>
    );
};

export default Row;
