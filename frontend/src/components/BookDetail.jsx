import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9080/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update/${book.id}`);
  };

  return (
    <div className='container'>
      <h2>Detail Peminjaman</h2>
      <p className='dtl'><strong>Judul:</strong> {book.judul}</p>
      <p className='dtl'><strong>Jumlah:</strong> {book.jumlah}</p>
      <p className='dtl'><strong>Nama Peminjam:</strong> {book.nama_peminjam}</p>
      <p className='dtl'><strong>Alamat Peminjam:</strong> {book.alamat_peminjam}</p>
      <p className='dtl'><strong>No Hp Peminjam:</strong> {book.no_hp_peminjam}</p>
      <p className='dtl'><strong>Tanggal Pinjam:</strong> {book.tanggal_pinjam}</p>
      <p className='dtl'><strong>Tanggal Kembali:</strong> {book.tanggal_kembali}</p>
      <p className='dtl'><strong>Lama Pinjam:</strong> {book.lama_peminjaman}</p>
      <button className='detailbtn' onClick={handleUpdate}>Update</button>
      <Link to="/booklist"><button className='kembalidtl'>Kembali</button></Link>
    </div>
  );
};

export default BookDetail;
