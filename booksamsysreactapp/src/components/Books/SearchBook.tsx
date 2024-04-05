import React from "react";
import { Link } from "react-router-dom";

const SearchBook: React.FC = () => {
    const allBooksRoute = "/books/search-book/search-all-books";
    const isbnRoute = "/books/search-book/search-by-isbn";
    const titlehRoute = "/books/search-book/search-by-title";
    const authorRoute = "/books/search-book/search-by-author";
    const priceRoute = "/books/search-book/search-by-price";
    const alphabeticRoute = "/books/search-book/search-by-alphabetic-order";
    const pagesRoute = "/books/search-book/search-by-number-of-pages";


    return (
        <div>
            <h1 className="createBookTitle">Search Book</h1>
            <h2>Please select the type of search:</h2>
            <Link to={allBooksRoute} className="goBackToBooks">Show all</Link>
            <Link to={isbnRoute} className="goBackToBooks">Search by ISBN</Link>
            <Link to={titlehRoute} className="goBackToBooks">Search by Title</Link>
            <Link to={authorRoute} className="goBackToBooks">Search by Author</Link>
            <Link to={priceRoute} className="goBackToBooks">Search by Price</Link>
            <Link to={alphabeticRoute} className="goBackToBooks">Search by Alphabetic order</Link>
            <Link to={pagesRoute} className="goBackToBooks">Search by Number of Pages</Link>
            <Link to="/books" className="goBackToBooks">Back</Link>
        </div>
    );
}

export default SearchBook;
