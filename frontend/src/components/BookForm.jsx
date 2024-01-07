import React, { useState } from 'react';
import './BookForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialBookState = {
  judul: '',
  jumlah: '0',
  nama_peminjam: '',
  alamat_peminjam: '',
  no_hp_peminjam: '',
  tanggal_pinjam: '',
  tanggal_kembali: '',
  lama_peminjaman: '',
};

const BookForm = () => {
  const [book, setBook] = useState(initialBookState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: name === 'jumlah' ? (value === '' ? 0 : parseInt(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any input field is empty
    if (Object.values(book).some(value => value === '')) {
      alert('Semua kolom input harus diisi.');
      return;
    }

    axios.post('http://localhost:9080/books', book)
      .then(response => {
        console.log('Book added successfully:', response.data);
        setBook(initialBookState);
        toast.success('Data berhasil ditambahkan!');
      })
      .catch(error => {
        console.error('Error adding book:', error);
        toast.error('Terjadi kesalahan. Silakan coba lagi.');
      });
  };

  return (
    <div className='containers'>
      <h2 className='hnaa'>Tambah Data Peminjaman</h2>
      <form onSubmit={handleSubmit}>
        <label>Judul: <input type="text" name="judul" value={book.judul} onChange={handleChange} /></label>
        <label>Jumlah: <input type="number" name="jumlah" value={book.jumlah} onChange={handleChange} /></label>
        <label>Nama Peminjam: <input type="text" name="nama_peminjam" value={book.nama_peminjam} onChange={handleChange} /></label>
        <label>Alamat Peminjam: <input type="text" name="alamat_peminjam" value={book.alamat_peminjam} onChange={handleChange} /></label>
        <label>No Hp Peminjam: <input type="text" name="no_hp_peminjam" value={book.no_hp_peminjam} onChange={handleChange} /></label>
        <label>Tanggal Pinjam: <input type="date" name="tanggal_pinjam" value={book.tanggal_pinjam} onChange={handleChange} /></label>
        <label>Tanggal Kembali: <input type="date" name="tanggal_kembali" value={book.tanggal_kembali} onChange={handleChange} /></label>
        <label>Lama Peminjaman: <input type="text" name="lama_peminjaman" value={book.lama_peminjaman} onChange={handleChange} /></label>
        <button type="submit">Tambah Data</button>
        <Link to={`/booklist`}><button className='cancel'>Kembali</button></Link>
      </form>
    </div>
  );
};

export default BookForm;
