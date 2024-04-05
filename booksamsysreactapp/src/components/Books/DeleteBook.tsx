import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteBook: React.FC = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate('/books');
    }
    return (

        <div>
            <h1 className="createBookTitle">Delete Book</h1>
            <form className="createBookForm">
                <label htmlFor="title">ISBN</label>
                <input type="number" id="isbn" name="ISBN" />

            </form>
            <button className="goBackToBooks" onClick={back}>Back</button>
            <button className="createBookButton" type="submit" onClick={back}>Delete</button>
        </div>
    );
}
export default DeleteBook;