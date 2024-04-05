import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const SearchByISBN: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [authors, setAuthors] = useState<Record<number, Author>>({});
    const navigate = useNavigate();

    const back = () => {
        navigate('/books/search-book');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const isbn = data.get("ISBN");
        try {
            const response = await axios.get(`https://localhost:7132/booksByIsbn/${isbn}`);
            if (response.status === 200) {
                const booksData: Book[] = await response.data;
                if (booksData.length === 0) {
                    alert("No books found with the given ISBN");
                    navigate('/books');
                } else {
                    setBooks(booksData);
                    await fetchAuthors(booksData); // Fetch authors after receiving book data
                    setError(null);
                }

            }
            else {
                throw new Error("Failed to fetch books");
            }
        } catch (error) {
            setError("Failed to fetch books");
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
                    if (authorIds.includes(author.id)) {
                        authorsMap[author.id] = author;
                    }
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
            <h1 className="createBookTitle">Search Book by ISBN</h1>
            <form className="createBookForm" onSubmit={handleSubmit}>
                <label htmlFor="isbn">ISBN</label>
                <input type="number" id="isbn" name="ISBN" />
                <button className="createBookButton" type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}

            <div>
                {books.map(book => (
                    <div key={book.id}>
                        <h2>{book.title}</h2>
                        <p>ISBN: {book.isbn}</p>
                        <p>Price: ${book.price}</p>
                        <p>Number of Pages: {book.numberOfPages}</p>
                        <p>Author: {authors[book.authorId]?.name}</p>
                    </div>
                ))}
            </div>

            <button className="goBackToBooks" onClick={back}>Back</button>
        </div>
    );
}

export default SearchByISBN;