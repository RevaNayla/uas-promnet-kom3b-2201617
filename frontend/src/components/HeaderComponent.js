// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header className="App-header">
      <nav className='navnav'>
        <div className="header-content">
          <p className='header22'>Manajemen Peminjaman Buku</p>
          <Link to={`/`} className='navnav home-link'>Home</Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
