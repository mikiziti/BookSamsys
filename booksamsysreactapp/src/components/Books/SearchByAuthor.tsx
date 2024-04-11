import React, { useState } from "react";
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

const SearchByAuthor: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [authors, setAuthors] = useState<Record<number, Author>>({});
    const [authorId, setAuthorId] = useState<number>(0);
    const navigate = useNavigate();
    const back = () => {
        navigate('/books/search-book');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const booksData = await BookService.getBooksByAuthor(authorId);
            if (booksData.length === 0) {
                alert("No books found with the given author");
            } else {
                setBooks(booksData);
                await fetchAuthors(booksData); // Fetch authors after receiving book data
                setError(null);
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
            <h1 className="createBookTitle">Search Book by Author</h1>
            <form className="searchBookByTitle" onSubmit={handleSubmit}>
                <label htmlFor="authorId">Insert author ID:</label>
                <input type="number" id="authorId" name="AuthorId"
                    onChange={(e) => setAuthorId(Number(e.target.value))} />
                <button className="createBookButton" type="submit">Search</button>
                <button className="goBackToBooks" onClick={back}>Back</button>
            </form>

            {error && <p>{error}</p>}

            <div> {/* Add a container for books */}
                {books.map(book => (
                    <div key={book.id}> {/* Add a class for book item */}
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

export default SearchByAuthor;
