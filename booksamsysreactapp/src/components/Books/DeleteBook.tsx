import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookService from "./Service/BookService";

const DeleteBook: React.FC = () => {
    const navigate = useNavigate();
    const [isbn, setIsbn] = useState<string>("");

    const back = () => {
        navigate('/books');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isbn) {
            alert("Please enter an ISBN.");
            return;
        }
        try {
            await BookService.deleteBook(isbn);
            alert("Book deleted successfully");
            navigate("/books");
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                alert("Book not found. Please enter a valid ISBN.");
            } else {
                alert("Error deleting book. Please try again later.");
            }
        }
    }

    return (
        <div>
            <h1 className="createBookTitle">Delete Book</h1>
            <form className="createBookForm" onSubmit={handleSubmit}>
                <label htmlFor="isbn">ISBN</label>
                <input
                    type="text"
                    id="isbn"
                    name="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
                <button className="createBookButton" type="submit">Delete</button>
            </form>
            <button className="goBackToBooks" onClick={back}>Back</button>
        </div>
    );
}

export default DeleteBook;
