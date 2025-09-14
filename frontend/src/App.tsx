import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import MovieLibrary from './components/MovieLibrart';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/library" element={<MovieLibrary />} />
      </Routes>
    </Router>
  );
}

export default App;
