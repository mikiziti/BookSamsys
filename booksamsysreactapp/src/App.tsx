import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavegationBar from './components/NavegationBar';
import bookImg from './data/book.gif';
import Books from './components/Books/Books';
import Home from './components/Home/Home';
import Authors from './components/Authors/Author';
import CreateBook from './components/Books/CreateBook';
import DeleteBook from './components/Books/DeleteBook';
import UpdateBook from './components/Books/UpdateBook';
import SearchBook from './components/Books/SearchBook';
import CreateAuthor from './components/Authors/CreateAuthor';
import SearchAuthor from './components/Authors/SearchAuthor';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <span className='heading'>BookSamsys</span>
        <NavegationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books/create-book" element={<CreateBook />} />
          <Route path="/books/delete-book" element={<DeleteBook />} />
          <Route path="/books/update-book" element={<UpdateBook />} />
          <Route path="/books/search-book" element={<SearchBook />} />
          <Route path="authors/create-author" element={<CreateAuthor />} />
          <Route path="authors/search-author" element={<SearchAuthor />} />


        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
