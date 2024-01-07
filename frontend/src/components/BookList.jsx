import React, { useState, useEffect } from 'react';
import './BookList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9080/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

    if (shouldDelete) {
      axios.delete(`http://localhost:9080/books/${id}`)
        .then(response => {
          console.log('Book deleted successfully:', response.data);
          setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        })
        .catch(error => console.error('Error deleting book:', error));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book => {
    const { judul, nama_peminjam } = book;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return judul.toLowerCase().includes(lowerCaseSearchTerm) || nama_peminjam.toLowerCase().includes(lowerCaseSearchTerm);
  });

  return (
    <div className='booklist-container'>
      <h2 className='h22'>Book Lending List</h2>
      <div className='baba'>
      <div className='search-container'>
        <input type='text' placeholder='Cari berdasarkan judul atau nama peminjam' value={searchTerm} onChange={handleSearch} />
      </div>
      <Link to="/create"><button className="tambahdata">Tambah Data</button></Link>
      </div>
      <table className="booklist-table">
        <thead>
          <tr className='listtr'>
            <th>Judul</th>
            <th>Nama Peminjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id}>
              <td>{book.judul}</td>
              <td>{book.nama_peminjam}</td>
              <td>{book.tanggal_pinjam}</td>
              <td>{book.tanggal_kembali}</td>
              <td className='booklist-btn'>
                <Link to={`/detail/${book.id}`}><button className="booklist-detail">Detail</button></Link>
                <button className='booklist-listbutton' onClick={() => handleDelete(book.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;