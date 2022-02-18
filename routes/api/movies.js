const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
// const API_KEY = config.get('TMBD_API');
const API_KEY = process.env.API_KEY;

router.get('/fetchtrending', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/fetchNetflixOriginals', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/fetchTopRated', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/fetchActionMovies', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/fetchComedyMovies', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/fetchHorrorMovies', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/fetchRomanceMovies', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/fetchDocumentaries', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
