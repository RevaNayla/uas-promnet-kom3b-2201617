import React, { useState, useEffect } from 'react';
import './UpdateBook.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    judul: '',
    jumlah: 0,
    nama_peminjam: '',
    alamat_peminjam: '',
    no_hp_peminjam: '',
    tanggal_pinjam: '',
    tanggal_kembali: '',
    lama_peminjaman: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9080/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Kesalahan mengambil data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: name === 'jumlah' ? (value === '' ? 0 : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:9080/books/${id}`, book);

      if (response.status === 200) {
        console.log('Buku berhasil diperbarui:', response.data);
        setBook(response.data);
        setUpdateSuccess(true);
        toast.success('Data berhasil diperbarui!');
        setTimeout(() => {
          setUpdateSuccess(false);
          navigate(`/detail/${id}`);
        },);
      } else {
        console.error('Kesalahan memperbarui buku:', response.statusText);
        setUpdateError(true);
        toast.error('Gagal memperbarui buku. Silakan coba lagi.');
        setTimeout(() => setUpdateError(false), 2000);
      }
    } catch (error) {
      console.error('Kesalahan memperbarui buku:', error);
      setUpdateError(true);
      toast.error('Gagal memperbarui data. Silakan coba lagi.');
      setTimeout(() => setUpdateError(false), 2000);
    }
  };

  return (
    <div className='containers'>
      <h2>Perbarui Data</h2>
      {updateSuccess && <div className="success-message">Buku berhasil diperbarui!</div>}
      {updateError && <div className="error-message">Gagal memperbarui buku. Silakan coba lagi.</div>}
      <form onSubmit={handleSubmit}>
        <label>Judul: <input type="text" name="judul" value={book.judul} onChange={handleChange} /></label>
        <label>Jumlah: <input type="number" name="jumlah" value={book.jumlah} onChange={handleChange} /></label>
        <label>Nama Peminjam: <input type="text" name="nama_peminjam" value={book.nama_peminjam} onChange={handleChange} /></label>
        <label>Alamat Peminjam: <input type="text" name="alamat_peminjam" value={book.alamat_peminjam} onChange={handleChange} /></label>
        <label>No Hp Peminjam: <input type="text" name="no_hp_peminjam" value={book.no_hp_peminjam} onChange={handleChange} /></label>
        <label>Tanggal Pinjam: <input type="date" name="tanggal_pinjam" value={book.tanggal_pinjam} onChange={handleChange} /></label>
        <label>Tanggal Kembali: <input type="date" name="tanggal_kembali" value={book.tanggal_kembali} onChange={handleChange} /></label>
        <label>Lama Peminjaman: <input type="text" name="lama_peminjaman" value={book.lama_peminjaman} onChange={handleChange} /></label>
      </form>
      <button className='upbutton' type="submit" onClick={handleSubmit}>Update</button>
      <Link to={`/detail/${id}`}><button className='cancel'>Cancel</button></Link>
    </div>
  );
};

export default UpdateBook;
