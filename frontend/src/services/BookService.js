import axios from 'axios';

const BOOK_API_BASE_URL = "http://localhost:9080/books";

class BookService {

    getBooks(){
        return axios.get(BOOK_API_BASE_URL);
    }

    createBook(book){
        return axios.post(BOOK_API_BASE_URL, book);
    }

    getUserById(bookId){
        return axios.get(BOOK_API_BASE_URL + '/' + bookId);
    }

    updateBook(book, bookId){
        return axios.put(BOOK_API_BASE_URL + '/' + bookId, book);
    }

    deleteBook(bookId){
        return axios.delete(BOOK_API_BASE_URL + '/' + bookId);
    }
}

export default new BookService()