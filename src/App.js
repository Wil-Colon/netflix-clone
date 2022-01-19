import React from 'react';
import './App.css';
import Row from './components/row/Row';
import Banner from './components/banner/Banner';
import Nav from './components/nav/Nav';

function App() {
    return (
        <div className="App">
            <Nav />
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
