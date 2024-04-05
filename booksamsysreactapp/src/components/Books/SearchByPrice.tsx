import React, { useState } from "react";

import axios from "axios";

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

const SearchByPrice: React.FC = () => {
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
        const price = Number(data.get("price")); // Convert to number
        try {
            const response = await axios.get(`https://localhost:7132/booksByPrice/${price}`);
            if (response.status === 200) {
                const booksData: Book[] = await response.data;
                if (booksData.length === 0) {
                    alert("No books found with the given price");
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
                    authorsMap[author.id] = author;
                });
                setAuthors(authorsMap);
            }
            else {
                throw new Error("Failed to fetch authors");
            }
        } catch (error) {
            setError("Failed to fetch authors");
        }
    }

    return (
        <div>
            <h1 className="createBookTitle">Search Book by Price</h1>
            <form className="createBookForm" onSubmit={handleSubmit}>
                <label htmlFor="authorId">Insert price:</label>
                <input type="number" id="price" name="price" />
                <button className="createBookButton" type="submit">Search</button>
                <button className="goBackToBooks" onClick={back}>Back</button>
            </form>

            {error && <p>{error}</p>}

            <div className="books-container"> {/* Add a container for books */}
                {books.map(book => (
                    <div key={book.id} className="book-item"> {/* Add a class for book item */}
                        <h2>{book.title}</h2>
                        <p>ISBN: {book.isbn}</p>
                        <p>Price: ${book.price}</p>
                        <p>Number of Pages: {book.numberOfPages}</p>
                        <p>Author: {authors[book.authorId]?.name}</p>
                    </div>
                ))}
            </div>


        </div>
    );
}
export default SearchByPrice;
