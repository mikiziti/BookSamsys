import React from "react";
import { Link } from "react-router-dom";

const Author: React.FC = () => {
    return (
        <div className="author">
            <h1 className="authorsMenuTitle">Author Menu</h1>
            <Link to="/authors/create-author" className="author-button">Create Author</Link>
            <Link to="/authors/search-author" className="author-button">Search Author</Link>
            <Link to="/" className="book-button">Back</Link>
            <img className="bookMenuImg" src="/Book/book.gif" alt="book" />
        </div>
    );
}
export default Author;