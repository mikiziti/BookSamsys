import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookService from "./Service/BookService";


interface Author {
    id: string;
    name: string;
}





const UpdateBook: React.FC = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate('/books');
    }
    const [authors, setAuthors] = useState<Author[]>([]);
    const [authorId, setAuthorId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [isbn, setIsbn] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [numPages, setNumPages] = useState<string | undefined>();

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthorId(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsbn(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice((e.target.value));
    };

    const handleNumPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumPages((e.target.value));
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch("https://localhost:7132/api/Author");
                if (!response.ok) {
                    throw new Error("Failed to fetch authors");
                }
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };
        fetchAuthors();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const priceValue = parseFloat(price);
        const numPagesValue = parseInt(numPages || "0", 10);

        if (isNaN(priceValue) || priceValue < 0) {
            alert("Price must be a non-negative number");
            return;
        }

        if (isNaN(numPagesValue) || numPagesValue < 0) {
            alert("Number of pages must be a non-negative integer");
            return;
        }
        try {
            const response = await BookService.updateBook({
                isbn: isbn,
                authorId: authorId,
                title: title,
                price: price,
                numberOfPages: numPages
            });
            alert('Book updated successfully');
            navigate('/books');
        } catch (error: any) {
            console.error('Error updating book:', error);
            if (error.response && error.response.status === 404) {
                alert('Failed to update book: Book not found in the database');
            } else if (error.response && error.response.status === 400 && error.response.data.Isbn) {
                const errorMessage = error.response.data.Isbn[0];
                alert(`Failed to update book: ${errorMessage}`);
            } else {
                alert('Failed to update book. Please try again.');
                console.error('Error updating book:', error.message);
            }
        }
    };



    return (
        <div>
            <h1 className="createBookTitle">Update Book</h1>
            <form className="createBookForm" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required />

                <label htmlFor="author">Author</label>
                <select id="author" name="author" value={authorId} onChange={handleAuthorChange} required>
                    <option value="">Select an author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>

                <label htmlFor="isbn">ISBN</label>
                <input type="number" id="isbn" name="isbn" value={isbn || ""} onChange={handleIsbnChange} required />

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" value={price || ""} onChange={handlePriceChange} required />

                <label htmlFor="numPages">Number of Pages</label>
                <input type="number" id="numPages" name="numPages" value={numPages || ""} onChange={handleNumPagesChange} required />

                <button className="createBookButton" type="submit">Update</button>
                <button className="goBackToBooks" onClick={back}>Back</button>
            </form>
        </div>
    );
}
export default UpdateBook;