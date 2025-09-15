import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/library" element={<LibraryScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
