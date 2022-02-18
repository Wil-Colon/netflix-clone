import React, { useState } from 'react';
import './listItem.scss';
import movieTrailer from 'movie-trailer';
import {
    PlayArrow,
    ThumbUp,
    ThumbDown,
    ThumbUpAltOutlined,
    ThumbDownAltOutlined,
    Add,
} from '@material-ui/icons';

const ListItem = ({ movie }) => {
    const [delayHandler, setDelayHandler] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const base_url = 'https://image.tmdb.org/t/p/w500';
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    const handleMouseEnter = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        setDelayHandler(
            setTimeout(async () => {
                try {
                    let res = await movieTrailer(
                        movie?.name || movie?.title || movie?.original_name,
                        {
                            id: true,
                        }
                    );
                    if (res === null) {
                        res = await movieTrailer(null, {
                            tmdbId: movie.id,
                            id: true,
                        });
                    }
                    console.log(res);
                    setTrailerUrl(res);
                    setIsHovered(true);
                } catch (err) {
                    console.log(err);
                }
            }, 700)
        );
    };

    const handleMouseLeave = () => {
        clearTimeout(delayHandler);
        setIsHovered(false);
        setTrailerUrl('');
    };

    return !isHovered ? (
        <div
            className={'listItem'}
            onMouseEnter={() => {
                handleMouseEnter(movie);
            }}
            onMouseLeave={() => {
                handleMouseLeave();
            }}
        >
            <img
                src={`${base_url}${movie?.backdrop_path || movie?.poster_path}`}
                alt={''}
            />
        </div>
    ) : (
        <div className="listItem">
            <div
                className="listItemLarge"
                onMouseLeave={() => {
                    handleMouseLeave();
                }}
            >
                <img
                    src={`${base_url}${
                        movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt={''}
                />
                {trailerUrl ? (
                    <div className="videoContainer">
                        <iframe
                            title="youtube preview"
                            className="youTubeVideo"
                            frameBorder={0}
                            allow
                            src={`https://www.youtube.com/embed/${trailerUrl}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1&iv_load_policy=0&start=10&fs=0&enablejsapi=1&playsinline=0`}
                        />
                    </div>
                ) : (
                    <h3>no preview</h3>
                )}
                <div className="itemInfo">
                    <div className="icons">
                        <PlayArrow className="icon" />
                        <Add className="icon" />
                        <ThumbUpAltOutlined className="icon" />
                        <ThumbDownAltOutlined className="icon" />
                    </div>
                    <div className="itemInfoTop">
                        <span>
                            {movie?.title ||
                                movie?.original_title ||
                                movie?.original_name}
                        </span>
                        <span className="limit">+16</span>
                        <span>
                            {movie?.release_data || movie?.first_air_date}
                        </span>
                    </div>
                    <div className="desc">{truncate(movie?.overview, 100)}</div>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
