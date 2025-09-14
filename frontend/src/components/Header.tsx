import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '1rem 2rem',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ margin: 0, color: '#F2911B' }}>Moovey</h1>
      </Link>

      <nav
        style={{
          display: 'flex',
          gap: '1.5rem',
          marginLeft: '4rem',
          marginTop: '1rem',
        }}
      >
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
