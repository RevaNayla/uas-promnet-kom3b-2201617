import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import UpdateBook from './components/UpdateBook';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderComponent />
        <main>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/detail/:id" element={<BookDetail />} />
            <Route path="/create" element={<BookForm />} />
            <Route path="/update/:id" element={<UpdateBook />} />
          </Routes>
        </main>
      <FooterComponent />
      </div>
    </Router>
  );
}

export default App;

