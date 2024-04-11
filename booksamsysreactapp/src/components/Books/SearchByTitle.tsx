import axios from "axios";
import React, { useState } from "react";
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


const SearchByTitle: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [authors, setAuthors] = useState<Record<number, Author>>({});
    const [title, setTitle] = useState<string>("");
    const navigate = useNavigate();
    const back = () => {
        navigate('/books/search-book');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) {
            alert("Please enter a title.");
            return;
        }
        try {
            const booksData = await BookService.getBooksByTitle(title);


            if (booksData.length === 0) {
                alert("No books found with the given title");
                navigate('/books');
            }
            else {
                setBooks(booksData);
                await fetchAuthors(booksData); // Fetch authors after receiving book data
                setError(null);
                console.log(booksData);
            }


        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                alert("Book not found. Please enter a valid title.");
            }
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
            <h1 className="createBookTitle">Search Book by Title</h1>
            <form className="searchBookByTitle" onSubmit={handleSubmit}>
                <label htmlFor="title">Search by title:</label>
                <input type="text" id="title" name="title"
                    onChange={(e) => setTitle(e.target.value)} />
                <button type="submit" className="createBookButton">Search</button>
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
export default SearchByTitle;