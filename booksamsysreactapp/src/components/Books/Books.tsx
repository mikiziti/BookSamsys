import React from "react";
import bookImg from "../../data/book.gif";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";
import CreateBook from "./CreateBook";
import { Link } from "react-router-dom";



const Book: React.FC = () => {




    return (

        <div className="book">
            <h1 className="booksMenuTitle">Book Menu</h1>
            <Link to="/books/create-book" className="book-button">Create Book</Link>
            <Link to="/books/delete-book" className="book-button">Delete Book</Link>
            <Link to="/books/update-book" className="book-button">Update Book</Link>
            <Link to="/books/search-book" className="book-button">Search Book</Link>
            <Link to="/" className="book-button">Back</Link>

            <img className="bookMenuImg" src={bookImg} alt="book" />
        </div>
    );
}
export default Book;