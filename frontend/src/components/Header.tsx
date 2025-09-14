import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header
      style={{
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '1rem 2rem',
      }}
    >
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ margin: 0, color: '#F2911B' }}>Moovey</h1>
      </NavLink>

      <nav
        style={{
          fontWeight: '700',
          display: 'flex',
          gap: '1.5rem',
          marginLeft: '6rem',
          marginTop: '1rem',
        }}
      >
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            color: isActive ? '#F2911B' : '#000000ff',
            textDecoration: 'none',
          })}
        >
          Search
        </NavLink>

        <NavLink
          to="/library"
          style={({ isActive }) => ({
            color: isActive ? '#F2911B' : '#000000ff',
            textDecoration: 'none',
          })}
        >
          My Library
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
