import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Author {
    id: string;
    name: string;
}

const CreateBook: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [authorId, setAuthorId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [isbn, setIsbn] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [numPages, setNumPages] = useState<string | undefined>();
    const navigate = useNavigate();

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
        try {
            const response = await axios.post(`https://localhost:7132/addBook`, {
                isbn: isbn,
                authorId: authorId,
                title: title,
                price: price,
                numberOfPages: numPages
            });
            if (response.status === 200) {
                alert('Book added successfully');
                navigate('/books');
            } else {
                alert(`Failed to add book: ${response.data.message}`);
            }
        } catch (error: any) {
            console.error('Error adding book:', error.message);
        }
    };

    const back = () => {
        navigate('/books');
    };



    return (
        <div>
            <h1 className="createBookTitle">Create Book</h1>
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

                <button className="createBookButton" type="submit">Create</button>
                <button className="goBackToBooks" onClick={back}>Back</button>
            </form>
        </div>
    );
}

export default CreateBook;
