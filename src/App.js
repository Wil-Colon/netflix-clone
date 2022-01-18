import React from 'react';
import './App.css';
import Row from './components/rows/Row';
import Banner from './components/banner/Banner';

function App() {
    return (
        <div className="App">
            <Banner fetchUrl={'fetchNetflixOriginals'} />
            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={'fetchNetflixOriginals'}
                isLargeRow
            />
            <Row title="Trending Now" fetchUrl={'fetchtrending'} />
            <Row title="Top Rated" fetchUrl={'fetchtoprated'} />
            <Row title="Action Movies" fetchUrl={'fetchactionmovies'} />
            <Row title="Comedy Movies" fetchUrl={'fetchcomedymovies'} />
            <Row title="Horror Movies" fetchUrl={'fetchHorrorMovies'} />
            <Row title="Documentaries" fetchUrl={'fetchDocumentaries'} />
        </div>
    );
}

export default App;
