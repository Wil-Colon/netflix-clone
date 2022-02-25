import axios from 'axios';

export const getMovies = async (fetchUrl) => {
    try {
        const request = await axios.get(`/api/movies/${fetchUrl}`);
        return request;
    } catch (err) {
        console.error(err);
    }
};
