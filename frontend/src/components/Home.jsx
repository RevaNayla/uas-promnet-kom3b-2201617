import React from 'react';
import { Link } from 'react-router-dom';
import './Homes.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Selamat Datang di Sistem Manajemen Peminjaman Buku</h1>
      <p>Website ini membantu Anda dalam mengelola peminjaman buku di perpustakaan.</p>
      <Link to="/booklist">
        <button className="home-btn">Lihat Daftar Peminjaman</button>
      </Link>
    </div>
  );
};

export default Home;
