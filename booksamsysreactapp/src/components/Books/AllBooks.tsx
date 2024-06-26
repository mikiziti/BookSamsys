import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import BookService from "./Service/BookService";

interface Book {
    id: number;
    title: string;
    isbn: string;
    price: number;
    numberOfPages: number;
    authorId: number;
}

interface Author {
    id: number;
    name: string;
}

const AllBooks: React.FC = () => {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [authors, setAuthors] = React.useState<Record<number, Author>>({});
    const navigate = useNavigate();

    const back = () => {
        navigate('/books/search-book');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const booksData = await BookService.getBooks();
            if (booksData.length === 0) {
                setError("No books found");
            } else {
                setBooks(booksData);
                await fetchAuthors(booksData); // Fetch authors after receiving book data
                setError(null);
            }
        } catch (error) {
            setError("Failed to fetch books");
        } finally {
            setLoading(false);
        }
    }

    const fetchAuthors = async (booksData: Book[]) => {
        const authorIds = booksData.map(book => book.authorId);
        try {
            const response = await axios.get("https://localhost:7132/api/Author");
            if (response.status === 200) {
                const authorsData: Author[] = response.data;
                const authorsMap: Record<number, Author> = {};
                authorsData.forEach(author => {
                    authorsMap[author.id] = author;
                });
                setAuthors(authorsMap);
            } else {
                throw new Error("Failed to fetch authors");
            }
        } catch (error) {
            setError("Failed to fetch authors");
        }
    }

    return (
        <div>
            <h1 className="createBookTitle">Search all Books</h1>
            <form className="searchBookByTitle" onSubmit={handleSubmit}>
                <button type="submit" className="createBookButton" disabled={loading}>
                    {loading ? "Loading..." : "Search"}
                </button>
                <button className="goBackToBooks" onClick={back}>Back</button>
            </form>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            <div className="resultsContainer">
                {books.map(book => (
                    <div className="bookContainer" key={book.id}>
                        <h2>{book.title}</h2>
                        <div className="bookInfo">
                            <p>ISBN: {book.isbn}</p>
                            <p>Price: ${book.price}</p>
                            <p>Number of Pages: {book.numberOfPages}</p>
                            <p>Author: {authors[book.authorId]?.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllBooks;
