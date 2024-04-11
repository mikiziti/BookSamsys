import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteBook: React.FC = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate('/books');
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const isbn = data.get("ISBN");
        try {
            const response = await axios.delete(`https://localhost:7132/deleteBook/${isbn}`);
            if (response.status === 200) {
                alert("Book deleted successfully");
                navigate("/books");
            } else {
                throw new Error("Book not found");
            }
        } catch (error: any) {
            alert("Error deleting book: Book not found");
        }
    }
    return (
        <div>
            <h1 className="createBookTitle">Delete Book</h1>
            <form className="createBookForm" onSubmit={handleSubmit}>
                <label htmlFor="title">ISBN</label>
                <input type="number" id="isbn" name="ISBN" />
                <button className="createBookButton" type="submit">Delete</button>
            </form>
            <button className="goBackToBooks" onClick={back}>Back</button>
        </div>
    );
}
export default DeleteBook;
