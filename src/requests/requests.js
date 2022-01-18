import axios from 'axios';

export const getMovies = async (fetchUrl) => {
    try {
        const request = await axios.get(
            `http://localhost:5000/api/movies/${fetchUrl}`
        );
        return request;
    } catch (err) {
        console.error(err);
    }
};
