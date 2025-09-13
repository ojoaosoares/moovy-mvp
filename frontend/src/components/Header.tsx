import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#1c1c1c',
        color: '#fff',
      }}
    >
      <h1 style={{ margin: 0 }}>Moovey</h1>

      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          Search
        </Link>
        <Link to="/library" style={{ color: '#fff', textDecoration: 'none' }}>
          My Library
        </Link>
      </nav>
    </header>
  );
};

export default Header;
